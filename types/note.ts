export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export type Note = {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
};

export type FetchNotesParams = {
  page?: number;
  perPage?: number;
  search?: string;
};

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};


export type FetchNoteResponse = {
  note: Note;
};
