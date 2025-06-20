"use client";

import WelcomeSection from "./welcome";
import { DashboardCards } from "./dashboardcards";
import { getuserinfo } from "@/actions/user/getuserinfo";
import { useEffect, useState } from "react";

export function DashboardAdmin() {
  const [name, setname] = useState("");
  async function getusername() {
    try {
      const response: any = await getuserinfo();
      setname(response.data.user.name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getusername();
  }, []);

  return (
    <div className=" w-full flex flex-col  max-h-full min-h-screen ">
      <div>
        <WelcomeSection name={name} />
      </div>
      <div className="mt-8 md:mt-0 ">
        <DashboardCards />
      </div>
    </div>
  );
}
