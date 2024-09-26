import { Link } from "react-router-dom";
import {
  getDashboardHomeUrl,
  getDashboardLeaderboardUrl,
  getDashboardPredictionsUrl,
  getDashboardSettingsUrl,
} from "../utils/urls";
import {
  Gear,
  House,
  ListOl,
  QuestionOctagon,
  QuestionSquare,
} from "react-bootstrap-icons";
import { ReactNode } from "react";

const NavLink = ({
  to,
  text,
  icon,
}: {
  to: string;
  text: string;
  icon: ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="flex h-full basis-full flex-col items-center justify-center gap-1"
    >
      <div className="text-xl">{icon}</div>
      <div className="text-sm">{text}</div>
    </Link>
  );
};

const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-200">
      <div className="mx-auto flex h-16 max-w-xl flex-row items-center justify-around">
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
      </div>
    </nav>
  );
};

export { Nav };
