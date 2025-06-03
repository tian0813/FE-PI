import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNote } from "../api";

export function useEditNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"]
            })
        }
    })
}
