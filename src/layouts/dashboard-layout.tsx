import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav";

const DashboardLayout = () => {
  return (
    <main className="pt-safe pb-safe-offset-16">
      <Outlet />
      <Nav />
    </main>
  );
};

export { DashboardLayout };
