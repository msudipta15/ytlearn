"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { logout } from "@/actions/user/logout";

export function SidebarAdmin() {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  async function calllogout() {
    setloading(true);
    const response = await logout();
    setloading(false);
    router.push("/login");
  }

  return (
    <aside className="w-1/5 bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 ">YT Learn Admin</h1>
      <nav className="flex flex-col gap-6 text-lg font-medium">
        <a
          href="/dashboard"
          className="flex items-center gap-2 hover:text-blue-700"
        >
          {" "}
          🏠 Dashboard
        </a>
        <a
          href="/addtopic"
          className="flex items-center gap-2 hover:text-blue-700"
        >
          ➕ Add Topic
        </a>

        <a
          href="/topics"
          className="flex items-center gap-2 hover:text-blue-700"
        >
          🗂️ All Topics
        </a>
        <Button
          variant={"destructive"}
          size={"lg"}
          className="mt-5 w-1/3 flex "
          onClick={() => calllogout()}
        >
          {loading && <Loader2Icon className="animate-spin" />}
          Log out
        </Button>
      </nav>
    </aside>
  );
}
