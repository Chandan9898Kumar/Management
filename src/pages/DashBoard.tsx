import UserManagementTable from "./UserManagementTable";
import { motion } from "framer-motion";
const DashBoard = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-500 text-plum bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Advanced User Management System
      </motion.h1>
      <UserManagementTable />
    </div>
  );
};

export default DashBoard;
