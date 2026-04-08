import { useState, useMemo } from 'react';
import { type Theme } from '../data/themes';
import { useDayNotes, formatDateString, getActiveNotesIndices, type SelectionState } from '../hooks/useDayNotes';
import { InteractiveDayCell } from './InteractiveDayCell';

/**
 * Defines the properties accepted by the Body component.
 */
interface BodyProps {
  currentMonth: Date;
  days: Date[];
  firstDayOffset: number;
  theme: Theme;
  isToday?: (date: Date) => boolean;
}

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

/**
 * Body Component
 * 
 * Renders the primary workspace of the calendar, splitting the view into:
 * 1. A functional left-hand Memos/Notes section mapped to the current selection.
 * 2. A right-hand Grid visualizing the days of the month with interactive 3D nodes.
 */
export function Body({ currentMonth, days, firstDayOffset, theme, isToday }: BodyProps) {
  const [selection, setSelection] = useState<SelectionState>({ start: null, end: null });
  const { noteContent, updateNote } = useDayNotes(selection, currentMonth);

  const activeIndices = useMemo(() => getActiveNotesIndices(), [noteContent, selection]);

  // 1. Calculate strictly out-of-bounds prefix padding (previous month)
  const leadingDays = Array.from({ length: firstDayOffset }).map((_, i) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0 - i);
    return { dateObj: d, outOfBounds: true };
  }).reverse();

  // 2. Map standard active internal days
  const currentMonthDays = days.map(d => ({ dateObj: d, outOfBounds: false }));

  // 3. Compute total layout grid cells needed (5 rows = 35, 6 rows = 42)
  const totalCells = leadingDays.length + currentMonthDays.length;
  const targetCells = totalCells > 35 ? 42 : 35;
  
  // 4. Calculate out-of-bounds suffix padding (next month) to seal the grid
  const trailingDays = Array.from({ length: targetCells - totalCells }).map((_, i) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i + 1);
    return { dateObj: d, outOfBounds: true };
  });

  // Flat structural array mapped natively to CSS Grid
  const allCells = [...leadingDays, ...currentMonthDays, ...trailingDays];

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
      <div className="w-full grow flex flex-row bg-white relative z-10" style={{ zIndex: 10 }} onClick={() => setSelection({ start: null, end: null })}>
        {/* Left: Notes Section */}
        <div className="w-[45%] lg:w-[40%] 
          flex flex-col h-full
          pl-6  pt-[3%] pb-28
          sm:pl-4 sm:pr-4 sm:pb-28

          lg:pl-6  lg:pt-[3%] lg:pb-28">
          <h3 className="text-[10px] font-bold text-[#374151] tracking-wide mb-[14px] uppercase drop-shadow-sm">
            {selection.start && !selection.end ? `Notes (${selection.start.getDate()} ${currentMonth.toLocaleString('default', { month: 'short' })})`
              : selection.start && selection.end ? `Notes (${selection.start.getDate()} - ${selection.end.getDate()} ${currentMonth.toLocaleString('default', { month: 'short' })})`
                : `${currentMonth.toLocaleString('default', { month: 'long' })} Memos`}
          </h3>

          <div className="flex flex-col relative w-[90%] grow" onClick={(e) => e.stopPropagation()}>
            <textarea
              className="w-full h-full resize-none outline-none text-[#1F2937] text-[15px] font-medium hide-scrollbar bg-transparent placeholder-gray-400/80"
              style={{
                lineHeight: '36px',
                background: 'repeating-linear-gradient(to bottom, transparent, transparent 35px, #d1d5db 35px, #d1d5db 36px)',
                backgroundAttachment: 'local'
              }}
              disabled={false} // Native typing is always permitted now!
              placeholder={selection.start ? "Start typing notes for this date..." : "Goals/memos for the month..."}
              value={noteContent}
              onChange={(e) => updateNote(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Calendar Grid */}
        <div className="
  w-[55%] lg:w-[60%]
  pt-[1%] lg:pt-[1%]
  px-3 sm:px-4 lg:pr-5 lg:px-0
">
          <div className="
    grid grid-cols-7
    gap-y-1 sm:gap-y-2 lg:gap-y-0.5
    w-full text-center
  ">
            {WEEKDAYS.map((day, i) => (
              <div
                key={day}
                className="
          text-[9px] sm:text-[8px] lg:text-[10px]
          font-bold tracking-wider uppercase mb-1
        "
                style={{ color: i >= 5 ? theme.accentColor : '#4B5563' }}
              >
                {day}
              </div>
            ))}

            {allCells.map((cell, idx) => {
              const dayOfWeek = cell.dateObj.getDay();
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

              const isSelectedStart = selection.start?.getTime() === cell.dateObj.getTime();
              const isSelectedEnd = selection.end?.getTime() === cell.dateObj.getTime();
              const isSelected = isSelectedStart || isSelectedEnd;
              const isWithinSelection = !!(selection.start && selection.end && cell.dateObj >= selection.start && cell.dateObj <= selection.end);
              const isRangeSelectionStart = isSelectedStart && !!selection.end;
              const isRangeSelectionEnd = isSelectedEnd && !!selection.start;

              const savedRangesList: { isStart: boolean; isEnd: boolean; hueShift: number }[] = [];

              for (let i = 0; i < activeIndices.rangeNotes.length; i++) {
                const r = activeIndices.rangeNotes[i];
                if (cell.dateObj >= r.startObj && cell.dateObj <= r.endObj) {
                  savedRangesList.push({
                    isStart: cell.dateObj.getTime() === r.startObj.getTime(),
                    isEnd: cell.dateObj.getTime() === r.endObj.getTime(),
                    hueShift: (i * 65) % 360 // Dramatically offset the color per range natively
                  });
                }
              }

              const dateStr = formatDateString(cell.dateObj);
              const hasNote = activeIndices.singleNotes.has(dateStr);

              const handleCellClick = (e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                setSelection(prev => {
                  if (prev.start?.getTime() === cell.dateObj.getTime() && !prev.end) return { start: null, end: null };
                  if (prev.start && !prev.end) {
                    if (cell.dateObj.getTime() < prev.start.getTime()) return { start: cell.dateObj, end: prev.start };
                    return { start: prev.start, end: cell.dateObj };
                  }
                  return { start: cell.dateObj, end: null };
                });
              };

              return (
                <InteractiveDayCell
                  key={idx}
                  dateObj={cell.dateObj}
                  outOfBounds={cell.outOfBounds}
                  isSelected={isSelected}
                  isRangeSelectionStart={isRangeSelectionStart}
                  isRangeSelectionEnd={isRangeSelectionEnd}
                  isWithinSelection={isWithinSelection}
                  isWeekend={isWeekend}
                  isToday={isToday ? isToday(cell.dateObj) : false}
                  hasNote={hasNote}
                  savedRanges={savedRangesList}
                  themeColor={theme.accentColor}
                  onClick={handleCellClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
