import { useQuery } from "@tanstack/react-query";
import { getNoteById, getNotes } from "../api";
import { useSearchParams } from "react-router-dom";

export function useNote(id?: string) {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") || "";

  if (id) {
    return useQuery({
    queryFn: () => getNoteById(id),
    queryKey: ["notes", id],
  });
  }

  return useQuery({
    queryFn: () => getNotes(page),
    queryKey: ["notes", page],
  });
}
