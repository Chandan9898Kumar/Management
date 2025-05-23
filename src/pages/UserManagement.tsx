import { useState } from "react";
import useUsers from "@/hooks/useUsers";
import { UserTable } from "@/pages/UserTable";
import { FilterState, SortState, User } from "@/types/User";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/errorState";

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
        // handleSort={handleSort}
        // sortState={sortState}
        // handleEdit={handleEdit}
      />
    </div>
  );
};

export default UserManagement;
