import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

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
  holiday?: { name: string; color: string };
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
  holiday,
  savedRanges = [],
  themeColor,
  onClick
}: InteractiveDayCellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    setIsHovered(false);
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

  const hoverConfig = outOfBounds ? {} : {
    scale: 1.15,
    y: -2,
    boxShadow: "0px 8px 16px rgba(0,0,0,0.12)",
    zIndex: 999
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
        onMouseEnter={() => setIsHovered(true)}
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

        {/* Render distinctive Holiday dot pinning against the top right structural corner */}
        {holiday && !outOfBounds && (
          <>
            <span 
              className="absolute top-[2px] right-[2px] w-[3px] h-[3px] lg:top-1 lg:right-1 lg:w-1 lg:h-1 rounded-full shadow-sm"
              style={{ backgroundColor: holiday.color }}
            />
            {/* Custom Interactive Tooltip Card Layer */}
            <AnimatePresence>
              {isHovered && (() => {
                // Determine if we exist on the right-bounding edge of the DOM mapped grid
                const day = dateObj.getDay();
                
                // Track dynamic anchors adjusting explicitly to avoid Desktop webkit 3D engine bounds
                const anchorStyle = { left: '50%', transformOrigin: 'bottom center' };
                
                // Shift tooltip mathematically toward the left to guarantee it never crosses the physical calendar boundary
                let targetX = "-50%"; 
                if (day === 0 || day === 6) targetX = "-95%"; // Sat/Sun
                else if (day === 5) targetX = "-80%"; // Fri
                else if (day === 4) targetX = "-65%"; // Thu

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 5, x: targetX, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, x: targetX, scale: 1 }}
                    exit={{ opacity: 0, y: 2, x: targetX, scale: 0.95, transition: { duration: 0.15 } }}
                    className="absolute bottom-full mb-3 lg:mb-4 bg-white backdrop-blur-md px-3 lg:px-4 py-1.5 lg:py-2 rounded-xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.3)] border border-gray-100 flex items-start gap-2 lg:gap-2.5 pointer-events-none w-max max-w-[200px]"
                    style={{ ...anchorStyle, zIndex: 9999 }}
                  >
                    <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full shadow-inner mt-0.5 shrink-0" style={{ backgroundColor: holiday.color }} />
                    <span className="text-[11px] lg:text-[13px] font-bold text-gray-800 tracking-wide leading-normal">{holiday.name}</span>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </>
        )}
      </motion.div>
    </div>
  );
}
