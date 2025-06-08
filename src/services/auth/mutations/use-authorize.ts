import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authorize } from "../api";

export function useAuthorize() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authorize,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
}
