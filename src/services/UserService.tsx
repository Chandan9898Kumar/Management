import { User } from "../types/User";
const API_URL: string = "https://jsonplaceholder.typicode.com";

/**
 * The function fetches users from an API and assigns a random role to each user before returning them.
 * @returns The `fetchUsers` function returns an array of users with an added `role` property. The
 * `role` property is randomly assigned from the array `["Admin", "User", "Editor", "Viewer"]` for each
 * user fetched from the API.
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await response.json();

  return users?.map((user: User) => ({
    ...user,
    role: ["Admin", "User", "Editor", "Viewer"][Math.floor(Math.random() * 4)],
  }));
};

/**
 * The function `updateUser` sends a PATCH request to update a user's data and returns the updated user
 * object.
 * @param {User} user - The `updateUser` function is an asynchronous function that takes a `User`
 * object as a parameter. This function updates the user data by sending a PATCH request to the
 * specified API endpoint with the updated user information in the request body. If the request is
 * successful (status code 200), it returns
 * @returns The `updateUser` function returns a Promise that resolves to the updated user data after
 * making a PATCH request to the API endpoint for updating a user's information.
 */
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
