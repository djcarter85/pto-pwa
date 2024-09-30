import { Link, useLocation } from "react-router-dom";
import {
  getDashboardHomeUrl,
  getDashboardLeaderboardUrl,
  getDashboardPredictionsUrl,
  getDashboardSettingsUrl,
} from "../utils/urls";
import { Gear, House, ListOl, QuestionSquare } from "react-bootstrap-icons";
import { ReactNode } from "react";
import cx from "classix";
import { Container } from "./container";

const NavLink = ({
  to,
  text,
  icon,
}: {
  to: string;
  text: string;
  icon: ReactNode;
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link
      to={to}
      className={cx(
        "flex h-full basis-full flex-col items-center justify-center gap-1",
        isActive && "border-t-2 border-blue-700 text-blue-700",
        !isActive && "pt-0.5",
      )}
    >
      <div className="text-xl">{icon}</div>
      <div className="text-sm">{text}</div>
    </Link>
  );
};

const Nav = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-t-neutral-300 bg-white pb-safe">
      <Container>
        <nav className="flex h-16 flex-row items-center justify-around">
          <NavLink to={getDashboardHomeUrl()} text="Home" icon={<House />} />
          <NavLink
            to={getDashboardPredictionsUrl()}
            text="Predictions"
            icon={<QuestionSquare />}
          />
          <NavLink
            to={getDashboardLeaderboardUrl()}
            text="Leaderboard"
            icon={<ListOl />}
          />
          <NavLink
            to={getDashboardSettingsUrl()}
            text="Settings"
            icon={<Gear />}
          />
        </nav>
      </Container>
    </footer>
  );
};

export { Nav };
