import { apiResolver } from "../../utils/api";
import axios from "../axios";
import { Note, NoteDTO, Response } from "./types";

const userGetNotes = (page?: string) => {
  return apiResolver<Response<Note[]>>(() =>
    axios.get("/complaints", {
      params: {
        page,
      },
    })
  );
};

const userGetNoteById = (id: string) => {
  return apiResolver<Response<Note>>(() => axios.get(`/complaints/${id}`));
};

const userDeleteNote = async (id: string) => {
  return apiResolver<Response<Note>>(() => axios.patch(`/complaints/${id}`));
};

const userCreateNote = (payload: FormData) => {
  return apiResolver<Response<Note>>(() =>
    axios.post("/complaints", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

const userEditNote = ({
  id,
  payload,
}: {
  id: string;
  payload: NoteDTO | FormData;
}) => {
  return apiResolver<Response<Note>>(() =>
    axios.put(`/complaints/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

export { userGetNotes, userDeleteNote, userCreateNote, userEditNote, userGetNoteById };
