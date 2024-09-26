// services/campaignService.ts
export const createCampaign = async (newCampaign: any) => {
  const response = await fetch("/api/campaigns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCampaign),
  });

  if (!response.ok) {
    throw new Error("Failed to create campaign");
  }

  return response.json();
};

export const fetchAllCampaigns = async () => {
  const response = await fetch("/api/campaigns", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  return response.json();
};

export const fetchOfferById = async (id: string) => {
  const response = await fetch(`/api/campaigns/byid?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const updateOffer = async ({ offerId, templateId, isActive }: any) => {
  const response = await fetch("/api/campaigns/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ offerId, templateId, isActive }),
  });

  if (!response.ok) {
    throw new Error("Failed to update offer");
  }

  return response.json();
};

export const deleteCampaign = async (offerId: string) => {
  const response = await fetch("/api/campaigns/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ offerId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete offer");
  }

  return response.json();
};
