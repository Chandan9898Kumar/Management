
import  UserManagement  from "../pages/UserManagement";
import { motion } from "framer-motion";

const  UserManagementTable=()=> {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl shadow-lg border border-border/40 p-6"
    >
      <UserManagement />
    </motion.div>
  );
}

export default UserManagementTable