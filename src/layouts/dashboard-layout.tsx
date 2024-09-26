import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav";

const DashboardLayout = () => {
  return (
    <div>
      <Outlet />
      <Nav />
    </div>
  );
};

export { DashboardLayout };
