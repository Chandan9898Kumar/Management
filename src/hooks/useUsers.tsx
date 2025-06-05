import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUser } from "../services/UserService";
import { FilterState, SortState, User } from "../types/User";
import { toast } from "react-toastify";

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
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["users"] });

      // The purpose of this line is to take a "snapshot" of the current user data before making any optimistic updates. This snapshot is stored in the previousUsers variable, which is later returned as part of the context object and can be used to restore the original state if the server update fails.
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
      // The context parameter in onError receives the object that was returned from onMutate

      // If the mutation fails / if the server update fails, the onError function can access the previous state through context.previousUsers and restore it.
      if (context?.previousUsers) {
        queryClient.setQueryData<User[]>(["users"], context.previousUsers);
      }

      toast.error(
        `Failed to update user: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
        {
          position: "bottom-right",
        }
      );
    },
    onSuccess: (data) => {
      toast.success(`User ${data.name} was updated successfully!`, {
        position: "bottom-right",
      });
    },
    onSettled: () => {
      // Invalidate and refetch to ensure our local data is in sync with the server
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const sortUsers = useCallback((users: User[], sortState: SortState): User[] => {
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
  }, []);

const filterUsers = useCallback((users: User[], filterState: FilterState): User[] => {
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
}, []);

  return {
    users,
    isLoading,
    error,
    refetch,
    sortUsers,
    filterUsers,
    updateUser: (user: User) => {
      return new Promise<boolean>((resolve) => {
        updateUserMutation.mutate(user, {
          onSuccess: () => resolve(true),
          onError: () => resolve(false),
        });
      });
    },
    isUpdating: updateUserMutation.isPending,
  };
};

export default useUsers;
