import { useQuery } from "@tanstack/react-query";
import { userGetNoteById, userGetNotes } from "../api";
import { useSearchParams } from "react-router-dom";

export function useNote(id?: string) {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "";

  if (id) {
    return useQuery({
    queryFn: () => userGetNoteById(id),
    queryKey: ["notes", id],
  });
  }

  return useQuery({
    queryFn: () => userGetNotes(page),
    queryKey: ["notes", page],
  });
}
