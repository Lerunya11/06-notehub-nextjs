'use client';

import css from './NoteList.module.css';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
  isLoading: boolean;
  isError: boolean;
}

const NoteList = ({ notes, isLoading, isError }: NoteListProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.card}>
          <h3 className={css.title}>{note.title}</h3>

          <p className={css.content}>{note.content}</p>

          <span className={css.tag}>{note.tag}</span>

          <div className={css.btns}>
            <Link href={`/notes/${note.id}`} className={css.detailsBtn}>
              View details
            </Link>

            <button
              className={css.deleteBtn}
              onClick={() => mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
