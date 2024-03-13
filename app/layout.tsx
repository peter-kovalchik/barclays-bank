import "@/public/fonts/css/line-awesome.min.css";
import "@/public/styles/style.scss";
import { LayoutProvider } from "@/utils/LayoutContext";
import ThemeProvider from "@/utils/ThemeProvider";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Next13NProgress } from "nextjs13-progress";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { UserContextProvider } from "@/utils/UserContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bankhub - Nextjs tailwindcss FinTech and Banking Dashboard",
  description: "Bankhub - Nextjs tailwindcss FinTech and Banking Dashboard",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Dashboard",
    "Fintech",
    "Banking",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en" className="!scroll-smooth">
        <body className={`${inter.className} text-n500 dark:text-n30`}>
          <ThemeProvider>
            <LayoutProvider>
              <UserContextProvider>
                <div>
                  <Next13NProgress color="#00aeef" height={3} />
                  {/* <NestedLayout> */}
                  {children}
                  {/* </NestedLayout> */}
                </div>
              </UserContextProvider>
            </LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
