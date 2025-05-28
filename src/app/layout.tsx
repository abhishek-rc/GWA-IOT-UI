import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ReactQueryProvider from '@/providers/reactQueryProvider';
// import { auth0 } from '@/lib/auth0';
// import { redirect } from "next/navigation";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth0.getSession();
  // if (!session?.user) {
  //   redirect(`/auth/login`);
  // }fallback to 1 hour

  // Set the cookie to expire with the session
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider><ReactQueryProvider>{children}</ReactQueryProvider></SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
