import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav";
import { Container } from "../components/container";

const DashboardLayout = () => {
  return (
    <main className="pt-safe pb-safe-offset-16 h-full">
      <Container className="h-full">
        <Outlet />
      </Container>
      <Nav />
    </main>
  );
};

export { DashboardLayout };
