"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import {QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserContextProvider } from "@/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

/*export const metadata = {
  title: "Taruira Chapoca",
  description: "A nova rede social criada no Brasil",
};
*/

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
        <UserContextProvider>{children}</UserContextProvider>
        </QueryClientProvider> 
       </body>
    </html>
  );
}
