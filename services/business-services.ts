export async function createBusiness({
  name,
  email,
  phone,
  address,
  country,
  currency,
  location,
  isActive,
  organizationId,
}: {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  country?: string;
  currency?: string;
  location?: { lat: number; lng: number };
  isActive?: boolean;
  organizationId: string;
}) {
  const response = await fetch("/api/business-create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      address,
      country,
      currency,
      location,
      isActive,
      organizationId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create business");
  }

  return response.json();
}
