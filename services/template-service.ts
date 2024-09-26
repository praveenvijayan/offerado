export const fetchAllTemplates = async () => {
  const response = await fetch("/api/templates", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch templates");
  }

  return response.json();
};
