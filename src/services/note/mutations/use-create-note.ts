import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userCreateNote } from "../api";

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userCreateNote,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
