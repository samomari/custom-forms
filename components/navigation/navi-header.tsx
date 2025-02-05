import { initialUser } from "@/features/users/initial-user";
import { NaviHeaderTail } from "./navi-header-tail";
import { HeaderHome } from "./navi-header-home";

export async function NaviHeader() {
  const user = await initialUser();
  return (
    <div className="w-full flex justify-between dark:bg-[#1E1F22] bg-[#E3E5E8]">
      <HeaderHome />
      <NaviHeaderTail user={user} />
    </div>
  );
}
