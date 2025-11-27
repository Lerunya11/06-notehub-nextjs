// app/notes/page.tsx

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import type { FetchNotesParams } from '@/lib/api';

import NotesClient from './Notes.client';

const PER_PAGE = 12;

export default async function NotesPage() {
  const initialParams: FetchNotesParams = {
    page: 1,
    perPage: PER_PAGE,
    search: '',
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialParams],
    queryFn: () => fetchNotes(initialParams),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialParams={initialParams} />
    </HydrationBoundary>
  );
}
