'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { fetchNoteById } from '@/lib/api';
import type { FetchNoteResponse } from '@/types/note';
import css from './NoteDetails.module.css';

const NoteDetailsClient = () => {
 
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useQuery<FetchNoteResponse>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),       
    staleTime: 60_000,
  });

  // isLoading
  if (isLoading) {
    return <p>Loading, please wait…</p>;
  }

  // error, !note
  if (isError || !data?.note) {
    return <p>Something went wrong.</p>;
  }

  const { title, content, updatedAt } = data.note;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{title}</h2>
        </div>

        <p className={css.content}>{content}</p>

        <p className={css.date}>{new Date(updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
