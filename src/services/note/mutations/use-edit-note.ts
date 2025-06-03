import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userEditNote } from "../api";

export function useEditNote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userEditNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notes"]
            })
        }
    })
}
