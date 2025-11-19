'use client';

import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteList.module.css';

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.card}>
          <h3 className={css.title}>{note.title}</h3>

          {note.content && (
            <p className={css.content}>{note.content}</p>
          )}

          <div className={css.footer}>
            <span className={css.badge}>Todo</span>

            <Link
              href={`/notes/${note.id}`}
              className={css.detailsButton}
            >
              View details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
