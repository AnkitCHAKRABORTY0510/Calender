import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface InteractiveDayCellProps {
  dateObj: Date;
  outOfBounds: boolean;
  isSelected: boolean;
  isRangeSelectionStart?: boolean;
  isRangeSelectionEnd?: boolean;
  isWithinSelection?: boolean;
  isWeekend: boolean;
  isToday: boolean;
  hasNote?: boolean;
  savedRanges?: { isStart: boolean; isEnd: boolean; hueShift: number }[];
  themeColor: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * InteractiveDayCell Component
 * 
 * Represents a single atomic day node inside the standard grid mechanism.
 * Orchestrates 3D hover physics, dynamic background note-bands stacking, 
 * and structural boundary padding visual states.
 */
export function InteractiveDayCell({
  dateObj,
  outOfBounds,
  isSelected,
  isRangeSelectionStart,
  isRangeSelectionEnd,
  isWithinSelection,
  isWeekend,
  isToday,
  hasNote,
  savedRanges = [],
  themeColor,
  onClick
}: InteractiveDayCellProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Raw mouse coordinates relative to center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics to mouse movements for smooth tilts
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Map limits to rotation angles (15 degrees map logic)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);
  const actualRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || outOfBounds) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate relative distance mathematically bounded to -0.5 to 0.5
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  let color = '#1F2937';
  let fontWeight = '700';

  if (isSelected) {
    color = '#FFFFFF';
  } else if (outOfBounds) {
    color = '#9CA3AF';
    fontWeight = '600';
  } else if (isWeekend) {
    color = themeColor;
  }

  // Generate a very subtle shadow only for active cards pulling off the grid structurally
  const hoverConfig = outOfBounds ? {} : {
    scale: 1.15,
    y: -2,
    boxShadow: "0px 8px 16px rgba(0,0,0,0.12)",
    zIndex: 10
  };

  // Combine active forming selection and native saved mapping layers
  const hasSavedRanges = savedRanges.length > 0;

  return (
    <div className={`relative w-full h-[32px] lg:h-[32px] flex items-center justify-center ${outOfBounds ? 'pointer-events-none' : ''}`}>
      {/* Active Forming Selection Band */}
      {isWithinSelection && !outOfBounds && (
        <div 
          className={`absolute top-[4px] bottom-[4px] lg:top-[6px] lg:bottom-[6px] 
            ${isRangeSelectionStart ? 'left-[10%] rounded-l-full' : 'left-0'} 
            ${isRangeSelectionEnd ? 'right-[10%] rounded-r-full' : 'right-0'}
          `}
          style={{ backgroundColor: themeColor, opacity: 0.15 }}
        />
      )}

      {/* Visually Isolated Saved Range Bands */}
      {!outOfBounds && savedRanges.map((rng, i) => (
        <div 
          key={i}
          className={`absolute top-[4px] bottom-[4px] lg:top-[6px] lg:bottom-[6px] 
            ${rng.isStart ? 'left-[10%] rounded-l-full' : 'left-0'} 
            ${rng.isEnd ? 'right-[10%] rounded-r-full' : 'right-0'}
          `}
          style={{ 
             backgroundColor: themeColor, 
             opacity: 0.3,
             filter: rng.hueShift ? `hue-rotate(${rng.hueShift}deg)` : 'none',
             zIndex: 1 + i // Natively stack intersecting arrays cleanly
          }}
        />
      ))}

      {/* Floating Interactive Numeric Chip */}
      <motion.div
        ref={ref}
        onClick={outOfBounds ? undefined : onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={hoverConfig}
        className={`relative select-none text-[12px] lg:text-[14px] mx-auto w-6 h-6 lg:w-8 lg:h-8 flex flex-col items-center justify-center rounded-full transition-colors ${!outOfBounds ? 'cursor-pointer' : ''}`}
        style={{
          color,
          fontWeight,
          backgroundColor: isSelected ? themeColor : undefined,
          border: isToday && !isSelected && !hasSavedRanges && !isWithinSelection ? `2px solid ${themeColor}` : undefined,
          rotateX: outOfBounds ? 0 : rotateX,
          rotateY: outOfBounds ? 0 : actualRotateY,
          transformStyle: 'preserve-3d',
          zIndex: 20
        }}
      >
        <span className="relative z-10" style={{ transform: hasNote && !hasSavedRanges ? 'translateY(-2px)' : 'none' }}>
          {dateObj.getDate()}
        </span>
        
        {/* Render classical dot strictly for single day notes */}
        {hasNote && !outOfBounds && (
          <span 
            className="absolute bottom-[2px] lg:bottom-1 w-[3px] h-[3px] lg:w-1 lg:h-1 rounded-full pointer-events-none"
            style={{ backgroundColor: isSelected ? 'white' : themeColor }}
          />
        )}
      </motion.div>
    </div>
  );
}
