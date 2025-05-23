// import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorStateProps {
  error: Error | unknown;
  refetch: () => void;
}

const  ErrorState =({ error, refetch }: ErrorStateProps)=> {
  return (
    <motion.div 
      className="rounded-md bg-destructive/10 p-8 text-center border border-destructive/30 shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-center mb-4">
        <AlertTriangle className="h-12 w-12 text-destructive animate-pulse" />
      </div>
      <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Users</h2>
      <p className="mb-6 text-destructive/80">
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </p>
      {/* <Button 
        onClick={() => refetch()} 
        variant="outline"
        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors duration-300"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button> */}
    </motion.div>
  );
}

export default ErrorState