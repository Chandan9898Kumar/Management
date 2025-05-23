import { memo } from "react";
import { DebouncedInput } from "@/components/DebouncedInput";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRoles, FilterState } from "@/types/User";
import { motion } from "framer-motion";
import { Search, Users, Tags } from "lucide-react";

interface TableFiltersProps {
  filterState: FilterState;
  handleFilterChange: (key: keyof FilterState, value: string) => void;
}

const TableFilters = ({filterState,handleFilterChange}: TableFiltersProps) => {
console.log("TableFilters rendered");
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-muted/30 p-4 rounded-lg border border-border/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <label className="text-sm font-medium block mb-1.5 flex items-center gap-1.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          Filter by Name
        </label>
        <DebouncedInput
          value={filterState.name}
          onChange={(value) => handleFilterChange("name", value)}
          placeholder="Search by name..."
          className="w-full border-primary/20 focus-visible:ring-primary/30"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5 flex items-center gap-1.5">
          <Users className="h-4 w-4 text-muted-foreground" />
          Filter by Email
        </label>
        <DebouncedInput
          value={filterState.email}
          onChange={(value) => handleFilterChange("email", value)}
          placeholder="Search by email..."
          className="w-full border-primary/20 focus-visible:ring-primary/30"
        />
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5 flex items-center gap-1.5">
          <Tags className="h-4 w-4 text-muted-foreground" />
          Filter by Role
        </label>
        {/* <Select
          value={filterState.role}
          onValueChange={(value) => handleFilterChange("role", value)}
        >
          <SelectTrigger className="border-primary/20 focus:ring-primary/30">
            <SelectValue placeholder="All roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            {UserRoles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
    </motion.div>
  );
};

export default memo(TableFilters);
