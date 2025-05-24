import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserFormValues, userSchema } from "@/schemas/UserSchema";
import { User, UserRoles } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
interface EditUserModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (user: User) => Promise<boolean>;
  isUpdating: boolean;
}

const EditUserModal = ({
  user,
  open,
  onOpenChange,
  onUpdate,
  isUpdating,
}: EditUserModalProps) => {
  const {
    register, // Connects form inputs to React Hook Form
    handleSubmit, // Creates a submission handler that validates data before calling your submit function
    setValue, // Programmatically sets values for form fields
    reset, // Resets form fields to specified values
    formState: { errors }, // Contains validation errors
    watch, // Monitors form field values in real-time
  } = useForm<UserFormValues>({
    // Connects your Zod schema to React Hook Form for validation
    resolver: zodResolver(userSchema),

    // Sets initial values for form fields based on the user prop or fallback values
    defaultValues: {
      id: user?.id || 0,
      name: user?.name || "",
      email: user?.email || "",
      role: (user?.role as UserFormValues["role"]) || undefined,
    },
  });

  // Update form when user changes
  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as UserFormValues["role"],
      });
    }
  }, [user, reset]);

  /**
   * The onSubmit function updates user information with the data provided and closes the form.
   * @param {UserFormValues} data - The `data` parameter in the `onSubmit` function is of type
   * `UserFormValues`. It likely contains information such as the user's name, email, and role that are
   * being updated in the `onUpdate` function.
   * @returns The `onSubmit` function is not explicitly returning anything. It is updating the user
   * information with the new data provided in the `UserFormValues` object and then changing the state of
   * `onOpen` to `false`.
   */
  const onSubmit = async (data: UserFormValues): Promise<void> => {
    if (!user) return;

    const success = await onUpdate({
      ...user,
      name: data.name,
      email: data.email,
      role: data.role,
    });

    if (success) {
      onOpenChange(false);
    }
  };

  // Handle role change since it's not directly managed by react-hook-form. The shouldValidate: true option will trigger validation after setting the value.
  const handleRoleChange = (value: string) => {
    setValue("role", value as UserFormValues["role"], { shouldValidate: true });
  };

  // access the role field value in your React Hook Form setup:This will give you the current value of the name field and will update whenever the field changes. It's useful when you need to react to changes in the field value.
  const selectedRole = watch("role");

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  };

  return (
    <Modal
      open={open}
      onClose={() => onOpenChange(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "450px" },
            bgcolor: "#f8f9fa",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            p: 4,
            borderRadius: 2,
            maxHeight: "90vh",
            overflow: "auto",
            border: "1px solid #e0e0e0",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #1976d2, #64b5f6)",
              marginBottom: "16px",
            }}
          />

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              mb: 3,
              color: "#1976d2",
              fontWeight: 600,
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Edit User
            </motion.span>
          </Typography>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="grid gap-2" variants={itemVariants}>
              <label
                htmlFor="name"
                style={{ color: "#424242", fontWeight: 500 }}
              >
                Name
              </label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Enter name"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p
                  style={{ color: "red" }}
                  className="text-sm text-destructive"
                >
                  {errors.name.message}
                </p>
              )}
            </motion.div>

            <motion.div className="grid gap-2" variants={itemVariants}>
              <label
                htmlFor="email"
                style={{ color: "#424242", fontWeight: 500 }}
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter email"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p
                  style={{ color: "red" }}
                  className="text-sm text-destructive"
                >
                  {errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div className="grid gap-2" variants={itemVariants}>
              <label
                htmlFor="role"
                style={{ color: "#424242", fontWeight: 500 }}
              >
                Role
              </label>
              <Select value={selectedRole} onValueChange={handleRoleChange}>
                <SelectTrigger
                  className={errors.role ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {UserRoles?.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p
                  style={{ color: "red" }}
                  className="text-sm text-destructive"
                >
                  {errors.role.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  mt: 3,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={isUpdating}
                    style={{
                      borderColor: "#9e9e9e",
                      color: "#616161",
                    }}
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    style={{
                      backgroundColor: isUpdating ? "#90caf9" : "#1976d2",
                      color: "white",
                    }}
                  >
                    {isUpdating ? "Updating..." : "Save Changes"}
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </motion.form>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default EditUserModal;
