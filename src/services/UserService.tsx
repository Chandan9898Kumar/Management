import { User } from "../types/User";

const API_URL: string = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    return users?.map((user: User) => ({
      ...user,
      role: ["Admin", "User", "Editor", "Viewer"][
        Math.floor(Math.random() * 4)
      ],
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return await response.json();
};
