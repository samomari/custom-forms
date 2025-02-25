import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { LangToggle } from "../lang-toggle";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";
import { getUserRole } from "@/features/roles/get-user-role";
import { getTranslations } from "next-intl/server";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

export const NaviSidebar = async () => {
  const t = await getTranslations("Header");
  const role = await getUserRole();
  return (
    <div className="md:hidden flex justify-between items-center ps-3 py-2">
      <Link href="/" className="text-xl">
        Custom forms
      </Link>
      <Sheet>
        <SheetTrigger>
          <Menu size={26} className="m-3" />
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="hidden" />
          <div className="flex mb-1 px-3 gap-x-3">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <LangToggle />
            <ModeToggle />
            <SignedOut>
              <SignInButton>
                <Button variant="ghost">
                  <LogIn />
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
          <nav>
            <ul className="flex flex-col  text-zinc-600 dark:text-zinc-300 px-3 gap-y-3 py-4">
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
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};
