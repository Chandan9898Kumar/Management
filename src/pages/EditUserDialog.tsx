import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRoles } from "@/types/User";
import { userSchema, UserFormValues } from "@/schemas/UserSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

interface EditUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (user: User) => void;
  isUpdating: boolean;
}

const EditUserDialog = ({
  user,
  open,
  onOpenChange,
  onUpdate,
  isUpdating,
}: EditUserDialogProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user?.id || 0,
      name: user?.name || "",
      email: user?.email || "",
      role: (user?.role as any) || undefined,
    },
  });

  // Update form when user changes
  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role as any,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserFormValues) => {
    if (!user) return;

    onUpdate({
      ...user,
      name: data.name,
      email: data.email,
      role: data.role,
    });

    onOpenChange(false);
  };

  // Handle role change since it's not directly managed by react-hook-form
  const handleRoleChange = (value: string) => {
    setValue("role", value as any, { shouldValidate: true });
  };

  const selectedRole = watch("role");

  return (
    <Dialog 
      open={open} 
      onClose={() => onOpenChange(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter email"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <label htmlFor="role">Role</label>
            <Select value={selectedRole} onValueChange={handleRoleChange}>
              <SelectTrigger
                className={errors.role ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {UserRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          <DialogActions>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;