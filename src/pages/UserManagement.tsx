import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/errorState";
import useUsers from "@/hooks/useUsers";
import { UserTable } from "@/pages/UserTable";
import { FilterState, SortState, User } from "@/types/User";
import { useCallback, useState } from "react";
import Pagination from '../components/pagination'
const TABLE_HEADERS: string[] = ["ID", "Name", "Email", "Role", "Actions"];
const TABLE_SKELETONS: number = 5;

const UserManagement = () => {
  const {
    users,
    isLoading,
    error,
    updateUser,
    isUpdating,
    sortUsers,
    filterUsers,
    refetch,
  } = useUsers();

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortState, setSortState] = useState<SortState>({column: null,direction: "asc"});

  const handleEdit = useCallback((user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  }, []);

  const handleSort = useCallback((column: keyof User) => {
    setSortState((prevState) => ({
      column,
      direction:
        prevState.column === column && prevState.direction === "asc"
          ? "desc"
          : "asc",
    }));
  }, []);

  const sortedUsers = sortUsers(users, sortState);


  if (isLoading) {
    return (
      <LoadingState
        tableHeaders={TABLE_HEADERS}
        skeletonNumber={TABLE_SKELETONS}
      />
    );
  }

  if (error) {
    return <ErrorState error={error} refetch={refetch} />;
  }

  
  return (
    <div className="space-y-4">
      {/* User Table */}
      <UserTable
        users={users}
        handleSort={handleSort}
        sortState={sortState}
        handleEdit={handleEdit}
      />

      <Pagination />
    </div>
  );
};

export default UserManagement;
