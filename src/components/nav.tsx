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
        "flex flex-col items-center justify-center gap-1",
        isActive && "active text-primary",
      )}
    >
      <div className="text-xl">{icon}</div>
      <div className="text-sm">{text}</div>
    </Link>
  );
};

const Nav = () => {
  return (
    <nav className="btm-nav border-t pb-safe">
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
      <NavLink to={getDashboardSettingsUrl()} text="Settings" icon={<Gear />} />
    </nav>
  );
};

export { Nav };
