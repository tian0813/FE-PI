import { apiResolver } from "../../utils/api";
import axios from "../axios";
import { Note, NoteDTO, Response } from "./types";

const getNotes = (page?: string) => {
  return apiResolver<Response<Note[]>>(() =>
    axios.get("/complaints", {
      params: {
        page,
      },
    })
  );
};

const getNoteById = (id: string) => {
  return apiResolver<Response<Note>>(() => axios.get(`/complaints/${id}`));
};

const deleteNote = async (id: string) => {
  return apiResolver<Response<Note>>(() => axios.patch(`/complaints/${id}`));
};

const createNote = (payload: FormData) => {
  return apiResolver<Response<Note>>(() =>
    axios.post("/complaints", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

const editNote = ({
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

export { getNotes, deleteNote, createNote, editNote, getNoteById };
