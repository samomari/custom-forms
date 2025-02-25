import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { NaviHeader } from "@/components/navigation/navi-header";
import { Toaster } from "@/components/ui/toaster";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ruRU, enUS } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Forms",
  description: "Custom Forms",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const clerkLocaleMap: Record<string, any> = {
    en: enUS,
    ru: ruRU,
  };
  const clerkLocale = clerkLocaleMap[locale] || enUS;
  return (
    <ClerkProvider
      localization={clerkLocale}
      appearance={{
        variables: {
          colorPrimary: "hsl(263.4, 70%, 50.4%)",
        },
      }}
    >
      <html
        lang={locale}
        suppressHydrationWarning
        className="scroll-smooth antialiased"
      >
        <body className={`bg-white dark:bg-[#313338] ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NaviHeader />
            <NextIntlClientProvider messages={messages}>
              <main className="grow px-2 md:px-4">{children}</main>
            </NextIntlClientProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
