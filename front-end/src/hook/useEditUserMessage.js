// useEditUserMessage.js
import { editMessageApi } from "@/pages/api/EditMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function useEditUserMessage() {
  const queryClient = useQueryClient();

  const editUserMessage = async (formData, userId) => {
    try {
      const response = await editMessageApi(formData, userId);
      return response;
    } catch (error) {
      throw new Error("Edit message failed");
    }
  };

  const mutation = useMutation(editUserMessage, {
    onSettled: () => {
      queryClient.invalidateQueries(["user", userId]);
    },
  });

  return mutation;
}
