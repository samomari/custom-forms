import { initialUser } from "@/features/users/initial-user";
import { NaviHeaderTail } from "./navi-header-tail";

export async function NaviHeader() {
  const user = await initialUser();
  return (
    <NaviHeaderTail user={user}/>
  );
}