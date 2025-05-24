import Loader from '@/components/CircularLoader/Loader';
import ErrorState from "@/components/ui/errorState";
import LoadingState from "@/components/ui/loadingState";
import useUsers from "@/hooks/useUsers";
import TableFilters from "@/pages/TableFilters";
import { UserTable } from "@/pages/UserTable";
import { FilterState, SortState, User } from "@/types/User";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import Pagination from "../components/ui/pagination";
const EditUserModal = lazy(() => import("@/pages/EditUserModal"));

const TABLE_HEADERS: string[] = ["ID", "Name", "Email", "Role", "Actions"];
const TABLE_SKELETONS: number = 5;
const ITEM_PER_PAGE = 5;
interface PageClickEvent {
  selected: number;
}
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
  const [filterState, setFilterState] = useState<FilterState>({
    name: "",
    email: "",
    role: "all",
  });
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: "asc",
  });
  const [active, setActive] = useState(1);

  const filteredUsers = useMemo(() => {
    return filterUsers(users, filterState);
  }, [users, filterState, filterUsers]);

  const sortedUsers = useMemo(() => {
    return sortUsers(filteredUsers, sortState);
  }, [filteredUsers, sortState, sortUsers]);

  const pageCount = useMemo(() => {
    return Math.ceil(sortedUsers.length / ITEM_PER_PAGE);
  }, [sortedUsers.length]);

  const paginatedUsers = useMemo(() => {
    return sortedUsers.slice(
      active * ITEM_PER_PAGE - ITEM_PER_PAGE,
      active * ITEM_PER_PAGE
    );
  }, [sortedUsers, active]);

  const handlePageClick = useCallback((event: PageClickEvent) => {
    setActive(event.selected + 1);
  }, []);

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

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilterState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    },
    []
  );

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
console.log(users,'users data')
  return (
    <div className="space-y-4">
      {/* Filters */}
      <TableFilters
        filterState={filterState}
        handleFilterChange={handleFilterChange}
      />

      {/* User Table */}
      <UserTable
        users={paginatedUsers}
        handleSort={handleSort}
        sortState={sortState}
        handleEdit={handleEdit}
      />

      {/* Pagination */}
      <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <Suspense fallback={<Loader />}>
          <EditUserModal
            user={editingUser}
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            onUpdate={updateUser}
            isUpdating={isUpdating}
          />
        </Suspense>
      )}
    </div>
  );
};

export default UserManagement;
