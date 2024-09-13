export async function updateUserRole(role: string, userId: string) {
  const response = await fetch("/api/update-role", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role,
      userId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update role");
  }

  return response.json();
}
