import UserManagementTable from "./UserManagementTable";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
        style={{
          background: "linear-gradient(to right, #7c3aed, #3b82f6)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent"
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Advanced User Management System
      </motion.h1>
      
      {/* Navigation Links */}
      <div className="flex justify-center gap-4 mb-8">
        <Link 
          to="/transfer" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          replace
        >
          🏦 Banking Transfer
        </Link>
        <Link 
          to="/" 
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          📈 Dashboard
        </Link>
        <Link 
          to="/users" 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          👥 Users
        </Link>
      </div>
      
      <UserManagementTable />
    </div>
  );
};

export default DashBoard;
