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

  return {
    users,
    isLoading,
    error,
    refetch,
  };
};

export default useUsers