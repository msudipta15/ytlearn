import WelcomeSection from "./welcome";
import { DashboardCards } from "./dashboardcards";

export function DashboardAdmin() {
  return (
    <div className="p-6 w-full flex flex-col  max-h-full min-h-screen ">
      <div>
        <WelcomeSection name="Sudipta" />
      </div>
      <div className="mt-4">
        <DashboardCards />
      </div>
    </div>
  );
}
