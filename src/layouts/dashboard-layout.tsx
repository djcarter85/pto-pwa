import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav";

const DashboardLayout = () => {
  return (
    <div className="mb-16">
      <Outlet />
      <Nav />
    </div>
  );
};

export { DashboardLayout };
