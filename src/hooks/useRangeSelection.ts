import { useState, useCallback } from 'react';

export function useRangeSelection() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleDayClick = useCallback((date: Date) => {
    // Third click or earlier date click when both are set -> resets
    if (startDate && endDate) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (!startDate) {
      setStartDate(date);
    } else {
      // If clicking a date before the start date, make it the new start date
      if (date < startDate) {
        setStartDate(date);
        setEndDate(null);
      } else {
        setEndDate(date);
      }
    }
  }, [startDate, endDate]);

  const handleDayHover = useCallback((date: Date | null) => {
    setHoverDate(date);
  }, []);

  const clearSelection = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
  }, []);

  return {
    startDate,
    endDate,
    hoverDate,
    handleDayClick,
    handleDayHover,
    clearSelection
  };
}
