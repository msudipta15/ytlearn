import { IoPersonCircleOutline } from "react-icons/io5";

import WelcomeSection from "./welcome";

export function DashboardAdmin() {
  return (
    <div className="p-6 w-full flex flex-col  min-h-screen h-full ">
      <div className="mt-10">
        <WelcomeSection name="Sudipta" />
      </div>
    </div>
  );
}
