import { useState, useCallback, useEffect } from 'react';

export interface NoteEntry {
  id: string;
  monthKey: string;      // e.g. "2026-04"
  rangeLabel: string;    // e.g. "Apr 7 - Apr 12" or "General"
  text: string;
  createdAt: string;
}

export function useNotes(monthKey: string) {
  const [notes, setNotes] = useState<NoteEntry[]>([]);
  const [isNoteInputOpen, setIsNoteInputOpen] = useState(false);

  // Load from local storage on mount and when monthKey changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`calendar-notes-${monthKey}`);
      if (saved) {
        setNotes(JSON.parse(saved));
      } else {
        setNotes([]);
      }
    } catch (e) {
      console.error("Failed to load notes", e);
    }
  }, [monthKey]);

  const saveNotes = useCallback((newNotes: NoteEntry[]) => {
    setNotes(newNotes);
    localStorage.setItem(`calendar-notes-${monthKey}`, JSON.stringify(newNotes));
  }, [monthKey]);

  const addNote = useCallback((rangeLabel: string, text: string) => {
    const newNote: NoteEntry = {
      id: crypto.randomUUID(),
      monthKey,
      rangeLabel,
      text,
      createdAt: new Date().toISOString()
    };
    saveNotes([...notes, newNote]);
    setIsNoteInputOpen(false);
  }, [monthKey, notes, saveNotes]);

  const deleteNote = useCallback((id: string) => {
    saveNotes(notes.filter(n => n.id !== id));
  }, [notes, saveNotes]);

  const openNoteInput = () => setIsNoteInputOpen(true);
  const closeNoteInput = () => setIsNoteInputOpen(false);

  return {
    notes,
    addNote,
    deleteNote,
    isNoteInputOpen,
    openNoteInput,
    closeNoteInput,
  };
}
