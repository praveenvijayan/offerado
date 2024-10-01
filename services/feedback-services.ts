export interface FeedbackFormData {
  title: string;
  description?: string;
  businessId: string;
  organizationId: string;
}

export async function createFeedbackForm(data: FeedbackFormData) {
  const response = await fetch("/api/feedback/forms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create feedback form");
  }

  return response.json();
}

export async function fetchFeedbackForms() {
  const response = await fetch("/api/feedback/forms");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch feedback forms");
  }

  const data = await response.json();
  return data.feedbackForms;
}

export interface FeedbackResponseData {
  content: string;
  feedbackFormId: string;
  userId: string;
}

export async function submitFeedbackResponse(data: FeedbackResponseData) {
  const response = await fetch("/api/feedback/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to submit feedback response");
  }

  return response.json();
}
