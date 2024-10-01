import { useQuery } from "@tanstack/react-query";
import {
  fetchFeedbackForms,
  createFeedbackForm,
  FeedbackFormData,
  submitFeedbackResponse,
  FeedbackResponseData,
} from "@/services/feedback-services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFeedbackForms() {
  return useQuery({
    queryKey: ["feedbackForms"],
    queryFn: fetchFeedbackForms,
  });
}

export function useCreateFeedbackForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FeedbackFormData) => createFeedbackForm(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbackForms"] });
    },
  });
}

export function useSubmitFeedbackResponse() {
  return useMutation({
    mutationFn: (data: FeedbackResponseData) => submitFeedbackResponse(data),
  });
}
