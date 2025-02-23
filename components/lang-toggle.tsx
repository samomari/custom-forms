"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const LangToggle = () => {
  const router = useRouter();
  const [lang, setLang] = useState(Cookies.get("NEXT_LOCALE") || "en");
  const setLanguage = (newLang: string) => {
    if (newLang !== lang) {
      Cookies.set("NEXT_LOCALE", newLang);
      setLang(newLang);
      router.refresh();
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Languages />
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setLanguage("en")}
            className={lang === "en" ? "font-bold" : ""}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLanguage("ru")}
            className={lang === "ru" ? "font-bold" : ""}
          >
            Русский
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
