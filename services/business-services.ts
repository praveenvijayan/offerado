export async function createBusiness(businessData: any) {
  const response = await fetch("/api/business/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(businessData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create business");
  }

  const business = await response.json();
  return business;
}

export const setBusinessAsDefault = async (
  businessId: string,
  organizationId: string
) => {
  const response = await fetch(`/api/business/${businessId}/default`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ organizationId }),
  });

  if (!response.ok) {
    throw new Error("Failed to set business as default");
  }

  return response.json();
};
