import { useState, useCallback } from 'react';

export function isSameDay(d1: Date | null, d2: Date | null) {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

export function useCalendar(initialDate: Date = new Date()) {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isFlipping, setIsFlipping] = useState(false);

  const navigate = useCallback((dir: "next" | "prev") => {
    if (isFlipping) return;
    setDirection(dir);
    setIsFlipping(true);
    
    // Slight timeout allows the flip animation to begin before changing standard dates state
    setTimeout(() => {
      setCurrentMonth(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + (dir === "next" ? 1 : -1));
        return newDate;
      });
      // End flip after animation completes (approx 550ms + buffer)
      setTimeout(() => setIsFlipping(false), 600);
    }, 50);
  }, [isFlipping]);

  const getDaysInMonth = useCallback((monthDate: Date = currentMonth) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth]);

  const getFirstDayOffset = useCallback((monthDate: Date = currentMonth) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    // Adjust so Monday is 0, Sunday is 6
    return firstDay === 0 ? 6 : firstDay - 1;
  }, [currentMonth]);

  const isToday = useCallback((date: Date) => {
    return isSameDay(date, new Date());
  }, []);

  const isInRange = useCallback((date: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    // ensure start is before end mathematically
    const startNum = start.getTime();
    const endNum = end.getTime();
    const dateNum = date.getTime();
    const actualStart = startNum <= endNum ? startNum : endNum;
    const actualEnd = startNum <= endNum ? endNum : startNum;
    return dateNum >= actualStart && dateNum <= actualEnd;
  }, []);

  return {
    currentMonth,
    direction,
    isFlipping,
    navigate,
    getDaysInMonth,
    getFirstDayOffset,
    isToday,
    isInRange,
    isSameDay
  };
}
