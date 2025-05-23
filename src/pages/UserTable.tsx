import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { User, SortState } from "../types/User";
import { ChevronDown, ChevronUp, Edit } from "lucide-react";
import { motion } from "framer-motion";
import  Badge  from "../components/badge";
interface UserTableProps {
  users: User[];
  handleSort: (column: keyof User) => void;
  sortState: SortState;
  handleEdit: (user: User) => void;
}

export function UserTable({
  users,
  handleSort,
  sortState,
  handleEdit,
}: UserTableProps) {
  const renderSortIcon = (column: keyof User) => {
    if (sortState?.column !== column) return null;

    return sortState?.direction === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "editor":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "viewer":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "contributor":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Name
                {renderSortIcon("name")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSort("email")}
            >
              <div className="flex items-center">
                Email
                {renderSortIcon("email")}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSort("role")}
            >
              <div className="flex items-center">
                Role
                {renderSortIcon("role")}
              </div>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!users?.length ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No users found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            users?.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-b hover:bg-accent/20 transition-colors"
              >
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-blue-600 dark:text-blue-400">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${getRoleBadgeColor(user.role)} font-medium`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(user)}
                    className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button> */}
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
