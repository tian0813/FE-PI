import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userDeleteNote } from "../api";

export function useDeleteNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userDeleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"]
            })
        }
    })
}
