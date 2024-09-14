// services/organization-service.ts
export async function createOrganization({
  name,
  email,
  ownerId,
}: {
  name: string;
  email: string;
  ownerId: string;
}) {
  const response = await fetch("/api/organization-create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      ownerId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create organization");
  }

  return response.json();
}
