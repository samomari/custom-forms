import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { NaviHeader } from "@/components/navigation/navi-header";
import { Toaster } from "@/components/ui/toaster";
import { getUserRole } from "@/features/roles/get-user-role";

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
  const role = await getUserRole();
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "hsl(263.4, 70%, 50.4%)",
        },
      }}
    >
      <html
        lang="en"
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
            <NaviHeader role={role} />
            <main className="grow">{children}</main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
