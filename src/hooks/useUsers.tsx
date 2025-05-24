import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUser } from "../services/UserService";
import { FilterState, SortState, User } from "../types/User";

const useUsers = () => {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onMutate: async (updatedUser) => {
      console.log("Optimistically updating user:", updatedUser);
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // Snapshot the previous value
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);

      // Optimistically update to the new value
      queryClient.setQueryData<User[]>(["users"], (old = []) => {
        return old.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
      });

      // Return a context object with the snapshot value
      return { previousUsers };
    },
    onError: (err, newUser, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(["users"], context.previousUsers);
      }
      // toast({
      //   title: "Error",
      //   description: `Failed to update user: ${err instanceof Error ? err.message : "Unknown error"}`,
      //   variant: "destructive",
      // });
    },
    onSuccess: (data) => {
      // toast({
      //   title: "Success",
      //   description: `User ${data.name} was updated successfully!`,
      // });
    },
    onSettled: () => {
      // Invalidate and refetch to ensure our local data is in sync with the server
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const sortUsers = (users: User[], sortState: SortState): User[] => {
    if (!sortState.column) return users;

    return [...users].sort((a, b) => {
      const valueA = a[sortState.column as keyof User] as string;
      const valueB = b[sortState.column as keyof User] as string;

      if (valueA < valueB) {
        return sortState.direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortState.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const filterUsers = (users: User[], filterState: FilterState): User[] => {
    return users.filter((user) => {
      const nameMatch = user.name
        .toLowerCase()
        .includes(filterState.name.toLowerCase());
      const emailMatch = user.email
        .toLowerCase()
        .includes(filterState.email.toLowerCase());
      const roleMatch =
        filterState.role === "" ||
        filterState.role === "all" ||
        user.role === filterState.role;

      return nameMatch && emailMatch && roleMatch;
    });
  };

  return {
    users,
    isLoading,
    error,
    refetch,
    sortUsers,
    filterUsers,
    updateUser: (user: User) => updateUserMutation.mutate(user),
    isUpdating: updateUserMutation.isPending,
  };
};

export default useUsers;
