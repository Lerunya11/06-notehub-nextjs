// components/NoteList/NoteList.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api';

import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (!notes.length) {
    return <p>You have no notes yet.</p>;
  }

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>

          {/* content всегда рендерим */}
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <div>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>

              <button
                type="button"
                className={css.button}
                onClick={() => mutate(note.id)}
                disabled={isPending}
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
