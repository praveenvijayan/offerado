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

export const fetchUserRole = async () => {
  const response = await fetch("/api/users/get-role", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user role");
  }

  const data = await response.json();
  return data.role;
};
