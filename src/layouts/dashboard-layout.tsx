import { Outlet } from "react-router-dom";
import { Nav } from "../components/nav";
import { Container } from "../components/container";
import { TitleBar } from "../components/title-bar";

const DashboardLayout = () => {
  return (
    <main className="pt-safe-offset-12 pb-safe-offset-16">
      <TitleBar />
      <Container>
        <Outlet />
      </Container>
      <Nav />
    </main>
  );
};

export { DashboardLayout };
