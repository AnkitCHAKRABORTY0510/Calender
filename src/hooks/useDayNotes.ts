import { useState, useEffect } from 'react';

export interface SelectionState {
  start: Date | null;
  end: Date | null;
}

export function formatDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getStorageKey(selection: SelectionState, currentMonth?: Date): string | null {
  if (selection.start && selection.end) {
    const s1 = formatDateString(selection.start);
    const s2 = formatDateString(selection.end);
    return `range-${s1}-to-${s2}`;
  }
  
  if (selection.start) {
    return `note-${formatDateString(selection.start)}`;
  }
  
  if (currentMonth) {
    const y = currentMonth.getFullYear();
    const m = String(currentMonth.getMonth() + 1).padStart(2, '0');
    return `note-${y}-${m}-general`;
  }
  
  return null;
}

export function getActiveNotesIndices() {
  const rangeNotes: { startObj: Date, endObj: Date }[] = [];
  const singleNotes: Set<string> = new Set();
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    const value = localStorage.getItem(key);
    if (!value || value.trim().length === 0) continue;
    
    if (key.startsWith('range-')) {
       // Format: range-YYYY-MM-DD-to-YYYY-MM-DD
       const parts = key.replace('range-', '').split('-to-');
       if (parts.length === 2) {
         const [y1, m1, d1] = parts[0].split('-').map(Number);
         const [y2, m2, d2] = parts[1].split('-').map(Number);
         rangeNotes.push({ 
           startObj: new Date(y1, m1 - 1, d1, 0, 0, 0), 
           endObj: new Date(y2, m2 - 1, d2, 0, 0, 0) 
         });
       }
    } else if (key.startsWith('note-') && !key.endsWith('-general')) {
       // Format: note-YYYY-MM-DD
       singleNotes.add(key.replace('note-', ''));
    }
  }

  return { rangeNotes, singleNotes };
}

export function useDayNotes(selection: SelectionState, currentMonth?: Date) {
  const [noteContent, setNoteContent] = useState<string>('');
  const key = getStorageKey(selection, currentMonth);

  // Load from local storage when selected Date changes
  useEffect(() => {
    if (!key) {
      setNoteContent('');
      return;
    }
    const saved = localStorage.getItem(key);
    if (saved) {
      setNoteContent(saved);
    } else {
      setNoteContent('');
    }
  }, [key]);

  const updateNote = (text: string) => {
    setNoteContent(text);
    if (!key) return;
    if (text.trim().length === 0) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, text);
    }
  };

  return {
    noteContent,
    updateNote
  };
}
