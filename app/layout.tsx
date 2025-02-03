import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, experimental__simple} from "@clerk/themes";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Custom Forms",
  description: "Custom Forms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
        variables: {
            colorPrimary: 'hsl(263.4, 70%, 50.4%)', // change this value (you can get it from you're css variables, make sure to include 'hsl' and commas)
                },
            }}
>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
