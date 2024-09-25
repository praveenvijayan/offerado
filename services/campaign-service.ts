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
