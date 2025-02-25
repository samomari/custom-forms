import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { getUserRole } from "@/features/roles/get-user-role";
import { LangToggle } from "@/components/lang-toggle";
import { getTranslations } from "next-intl/server";
import { NaviSidebar } from "./navi-sidebar";

export async function NaviHeader() {
  const t = await getTranslations("Header");
  const role = await getUserRole();
  return (
    <div className="md:w-full w-auto dark:bg-[#0C0A09] bg-[#E3E5E8] ">
      <nav className="md:flex justify-between items-center py-3 px-6 hidden ">
        <ul className="hidden pl-2 md:flex gap-6 items-center text-zinc-600 dark:text-zinc-300">
          <li className="mr-4">
            <Link href="/" className="text-2xl font-semibold">
              Custom forms
            </Link>
          </li>
          <li>
            <Link href="/templates">{t("templates")}</Link>
          </li>
          <SignedIn>
            <li>
              <Link href="/dashboard">{t("dashboard")}</Link>
            </li>

            {role === "ADMIN" && (
              <li>
                <Link href="/admin">{t("admin")}</Link>{" "}
              </li>
            )}
          </SignedIn>
        </ul>
        <div className="md:flex hidden pr-2">
          <LangToggle />
          <ModeToggle />
          <SignedOut>
            <SignInButton>
              <Button variant="ghost">
                <LogIn />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <div className="md:hidden block">
        <NaviSidebar />
      </div>
    </div>
  );
}
