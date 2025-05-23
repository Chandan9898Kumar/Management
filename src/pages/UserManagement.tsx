import { useState } from "react";
import useUsers from "../hooks/useUsers";
import { UserTable } from "../pages/UserTable";
import { FilterState, SortState, User } from "../types/User";
import LoadingState from '../components/LoadingState'

const  UserManagement=()=> {
  const {users,isLoading, error, updateUser,isUpdating, sortUsers,filterUsers,refetch } = useUsers();

 


  if(isLoading){
    return <LoadingState />
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
}

export default UserManagement