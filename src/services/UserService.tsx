import { User } from "../types/User";

const API_URL: string = "https://jsonplaceholder.typicode.com";

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    return users?.map((user: User) => ({
      ...user,
      role: ["Admin", "User", "Editor", "Viewer"][Math.floor(Math.random() * 4)],
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const SERVICES = {
  fetchUsers,
};

export default SERVICES;
