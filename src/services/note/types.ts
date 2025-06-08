export type NoteDTO = {
  // title: string;
  // content: string;
  location: string;
  description: string;
  photo?: File;
  status: boolean;
};

export type Note = {
  id: string;
  // title: string;
  // content: string;
  location: string;
  description: string;
  photo: string;
  status: boolean;
  createdAt: string;
};

export type Meta = {
  total: number;
  page: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type Response<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: Meta;
};
