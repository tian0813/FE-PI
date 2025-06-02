import { apiResolver } from "../../utils/api";
import axios from "../axios";
import { Note, NoteDTO, Response } from "./types";

const getNotes = () => {};

const getNoteById = () => {};

const deleteNote = async () => {};

const createNote = (payload: FormData) => {
  return apiResolver<Response<Note>>(() =>
    axios.post("/complaints", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

const editNote = () => {};

export { getNotes, deleteNote, createNote, editNote, getNoteById };
