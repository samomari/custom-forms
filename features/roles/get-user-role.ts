import { currentUser } from "../users/current-user";

export async function getUserRole() {
  const user = await currentUser();
  return user?.role;
}
