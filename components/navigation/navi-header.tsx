import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { getUserRole } from "@/features/roles/get-user-role";
import { LangToggle } from "@/components/lang-toggle";
import { getTranslations } from "next-intl/server";

export async function NaviHeader() {
  const t = await getTranslations("Header");
  const role = await getUserRole();
  return (
    <div className="w-full dark:bg-[#0C0A09] bg-[#E3E5E8]">
      <nav className="flex justify-between items-center">
        <ul className="pl-2 flex gap-6 items-center text-zinc-600 dark:text-zinc-300">
          <li>
            <Link href="/" className="text-3xl">
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
        <div className="flex pr-2">
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
    </div>
  );
}
