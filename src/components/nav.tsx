import { Link, useLocation } from "react-router-dom";
import {
  getDashboardHomeUrl,
  getDashboardLeaderboardUrl,
  getDashboardPredictionsUrl,
  getDashboardSettingsUrl,
} from "../utils/urls";
import {
  BarChartLine,
  BarChartLineFill,
  Gear,
  GearFill,
  House,
  HouseFill,
  QuestionSquare,
  QuestionSquareFill,
} from "react-bootstrap-icons";
import { ReactNode } from "react";
import cx from "classix";
import { Container } from "./container";

const NavLink = ({
  to,
  text,
  inactiveIcon,
  activeIcon,
}: {
  to: string;
  text: string;
  inactiveIcon: ReactNode;
  activeIcon: ReactNode;
}) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  return (
    <Link to={to} className={cx(isActive && "dock-active")}>
      {isActive ? activeIcon : inactiveIcon}
      <span className="dock-label">{text}</span>
    </Link>
  );
};

const Nav = () => {
  return (
    <footer className="dock pb-safe bg-white">
      <Container>
        <nav className="flex h-16 flex-row items-center justify-around">
          <NavLink
            to={getDashboardHomeUrl()}
            text="Home"
            inactiveIcon={<House />}
            activeIcon={<HouseFill />}
          />
          <NavLink
            to={getDashboardPredictionsUrl()}
            text="Predictions"
            inactiveIcon={<QuestionSquare />}
            activeIcon={<QuestionSquareFill />}
          />
          <NavLink
            to={getDashboardLeaderboardUrl()}
            text="Leaderboard"
            inactiveIcon={<BarChartLine />}
            activeIcon={<BarChartLineFill />}
          />
          <NavLink
            to={getDashboardSettingsUrl()}
            text="Settings"
            inactiveIcon={<Gear />}
            activeIcon={<GearFill />}
          />
        </nav>
      </Container>
    </footer>
  );
};

export { Nav };
