"use client"
import Header from "@/components/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Feed from "@/components/Feed";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    let value = localStorage.getItem("rede-social:token");
    if (!value) {
      router.push("/login")

    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  bg-zinc-100">
      <Header />
      <div className="w-full flex justify-start pt-10">
        <Sidebar />
        <Feed />
      </div>
    </main>
  );
}
