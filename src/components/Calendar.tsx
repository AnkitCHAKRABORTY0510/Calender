import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useCalendar } from '../hooks/useCalendar';
import { useTheme } from '../hooks/useTheme';
import { Header } from './Header';
import { Body } from './Body';

const flipVariants: Variants = {
  enter: (dir: 'next' | 'prev') => ({
    rotateX: dir === 'prev' ? 95 : 0,
    opacity: dir === 'next' ? 0 : 1,
    zIndex: dir === 'prev' ? 30 : 10,
  }),
  center: {
    rotateX: 0,
    opacity: 1,
    zIndex: 20,
    transition: {
      rotateX: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.3 }
    }
  },
  tease: {
    rotateX: 3.5,
    opacity: 1,
    zIndex: 20,
    transition: { rotateX: { duration: 0.3, type: "spring" } }
  },
  exit: (dir: 'next' | 'prev') => ({
    rotateX: dir === 'next' ? 95 : 0, 
    opacity: dir === 'prev' ? 0 : 1,
    zIndex: dir === 'next' ? 30 : 10,
    transition: {
      rotateX: { duration: 0.6, ease: "easeIn" },
      opacity: { duration: 0.3 }
    }
  })
};

/**
 * Calendar Component
 * 
 * Orchestrates the intricate mechanical flip dynamics, physics layers, and UI state
 * bounding mapping the thematic months and physical paper turn mechanisms natively.
 */
export function Calendar() {
  const [hoverTease, setHoverTease] = useState<'next' | 'prev' | null>(null);

  // Use current date
  const { currentMonth, getDaysInMonth, getFirstDayOffset, navigate, direction, isToday, isFlipping } = useCalendar(new Date());

  // Create the exact physical next month to act as the under-stack page
  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(currentMonth.getMonth() + 1);

  const { selectedTheme } = useTheme(currentMonth);
  const { selectedTheme: nextTheme } = useTheme(nextMonth);

  return (
    <div 
      className="relative mx-auto flex flex-col font-sans w-full"
      style={{
        maxWidth: 'min(1024px, calc(95dvh * 0.94))',
        height: 'min(720px, 100dvh)',
        // aspectRatio: '1 / 1.5',
        perspective: 1600,
        
      }}
    >
      {/* Underlying Stack Layer (always renders the physically next page!) */}
      <div className="absolute inset-0 w-full h-full bg-white rounded-[4px] filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.05)] flex flex-col z-0 pointer-events-none">
        <Header currentMonth={nextMonth} theme={nextTheme} />
        <Body 
          currentMonth={nextMonth} 
          days={getDaysInMonth(nextMonth)} 
          firstDayOffset={getFirstDayOffset(nextMonth)} 
          theme={nextTheme}
          isToday={isToday}
        />
        {/* Subtle shadow overlay blocking the bottom level simulating natural paper darkness stacked underneath */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={currentMonth.toISOString()}
          custom={direction}
          variants={flipVariants}
          initial="enter"
          animate={isFlipping ? "center" : (hoverTease ? 'tease' : 'center')}
          exit="exit"
          className="absolute inset-0 w-full h-full bg-white rounded-[4px] filter drop-shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex flex-col"
          style={{ transformOrigin: 'top center', backfaceVisibility: 'hidden' }}
        >
          <Header currentMonth={currentMonth} theme={selectedTheme} />
          <Body 
            currentMonth={currentMonth} 
            days={getDaysInMonth(currentMonth)} 
            firstDayOffset={getFirstDayOffset(currentMonth)} 
            theme={selectedTheme}
            isToday={isToday}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls Overlay (Side Buttons) */}
      <div className="absolute inset-y-0 -left-4 -right-4 lg:-left-12 lg:-right-12 pointer-events-none flex items-center justify-between z-40">
        <button 
          onClick={() => navigate('prev')}
          className="pointer-events-auto bg-black/10 hover:bg-black/20 text-black/60 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-colors shadow-sm backdrop-blur-sm"
          aria-label="Previous Month"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={() => navigate('next')}
          className="pointer-events-auto bg-black/10 hover:bg-black/20 text-black/60 rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-colors shadow-sm backdrop-blur-sm"
          aria-label="Next Month"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Kindle Style Peel Touch Zones */}
      <motion.div 
        className="absolute bottom-0 right-0 w-24 h-24 z-50 cursor-pointer overflow-hidden rounded-br-[4px] touch-none"
        onMouseEnter={() => setHoverTease('next')}
        onMouseLeave={() => setHoverTease(null)}
        onTouchStart={() => setHoverTease('next')}
        onTouchEnd={() => setHoverTease(null)}
        onTouchCancel={() => setHoverTease(null)}
        onClick={() => { setHoverTease(null); navigate('next'); }}
        onPanEnd={(_, info) => {
          if (info.offset.y < -20) {
            setHoverTease(null); 
            navigate('next'); // Swiping bottom-right up structurally turns to the next page
          }
        }}
      >
        <motion.div 
          initial={{ opacity: 0, x: 20, y: 20 }}
          animate={{ 
            opacity: hoverTease === 'next' && !isFlipping ? 1 : 0, 
            x: hoverTease === 'next' && !isFlipping ? 0 : 20, 
            y: hoverTease === 'next' && !isFlipping ? 0 : 20 
          }}
          className="absolute bottom-0 right-0 w-16 h-16 shadow-[-4px_-4px_12px_rgba(0,0,0,0.15)]"
          style={{ 
            background: 'linear-gradient(315deg, #ffffff 50%, #9ca3af 50.5%, #e5e7eb 52%, #f3f4f6 100%)',
            borderTopLeftRadius: '4px' 
          }}
        />
      </motion.div>

      <motion.div 
        className="absolute bottom-0 left-0 w-24 h-24 z-50 cursor-pointer overflow-hidden rounded-bl-[4px] touch-none"
        onMouseEnter={() => setHoverTease('prev')}
        onMouseLeave={() => setHoverTease(null)}
        onTouchStart={() => setHoverTease('prev')}
        onTouchEnd={() => setHoverTease(null)}
        onTouchCancel={() => setHoverTease(null)}
        onClick={() => { setHoverTease(null); navigate('prev'); }}
        onPanEnd={(_, info) => {
          if (info.offset.y < -20) {
            setHoverTease(null); 
            navigate('prev'); // Swiping bottom-left up reverses the page structurally
          }
        }}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ 
            opacity: hoverTease === 'prev' && !isFlipping ? 1 : 0, 
            x: hoverTease === 'prev' && !isFlipping ? 0 : -20, 
            y: hoverTease === 'prev' && !isFlipping ? 0 : 20 
          }}
          className="absolute bottom-0 left-0 w-16 h-16 shadow-[4px_-4px_12px_rgba(0,0,0,0.15)]"
          style={{ 
            background: 'linear-gradient(45deg, #ffffff 50%, #9ca3af 50.5%, #e5e7eb 52%, #f3f4f6 100%)',
            borderTopRightRadius: '4px' 
          }}
        />
      </motion.div>
    </div>
  );
}
