import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FormControl, FormField, FormItem } from "../ui/form";

interface UsersSelectProps {
  // eslint-disable-next-line
  form: any;
  users: { id: string; username: string }[];
  selectedUsers: string[];
  setSelectedUsers: (users: string[]) => void;
}

export const UsersSelect = ({
  form,
  users,
  selectedUsers,
  setSelectedUsers,
}: UsersSelectProps) => (
  <FormField
    control={form.control}
    name="selectedUsers"
    // eslint-disable-next-line
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="border pr-0">
                Select Users
                <ChevronDown className="w-4 h-4 mr-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {users.length === 0 ? (
                <p className="text-sm">No available users to select</p>
              ) : (
                users.map((user: { id: string; username: string }) => (
                  <DropdownMenuCheckboxItem
                    key={user.id}
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => {
                      const updatedUsers = checked
                        ? [...selectedUsers, user.id]
                        : selectedUsers.filter((id) => id !== user.id);
                      setSelectedUsers(updatedUsers);
                      form.setValue("selectedUsers", updatedUsers);
                    }}
                  >
                    {user.username}
                  </DropdownMenuCheckboxItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </FormControl>
      </FormItem>
    )}
  />
);
