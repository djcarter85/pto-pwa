import cx from "classix";
import { ReactNode } from "react";
import {
  House,
  ListOl,
  PatchQuestion,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { Link, Outlet, useParams } from "react-router-dom";
import { useTournaments } from "../hooks/use-tournaments";
import { Tournaments } from "../types/tournaments";
import { getTournamentHomeUrl, getTournamentLeaderboardUrl, getTournamentPredictionsUrl } from "../utils/urls";

const getBackgroundClassName = (tournamentCode: string) => {
  switch (tournamentCode) {
    case "euro2024":
      return "bg-[#2047dd]";
    case "pl2324":
      return "bg-[#38003c]";
  }

  return "bg-blue-900";
};

const TournamentHeader = ({
  tournamentCode,
  tournaments,
}: {
  tournamentCode: string;
  tournaments: Tournaments;
}) => {
  const tournament = tournaments.tournaments.find(
    (t) => t.code === tournamentCode,
  );

  return (
    <div
      className={cx(
        "fixed left-0 right-0 top-0 text-[#ffffff] px-safe pt-safe",
        getBackgroundClassName(tournamentCode),
      )}
    >
      <div className="flex h-16 flex-row items-center justify-between px-4">
        <div className="text-2xl font-bold">{tournament?.name}</div>
        <button className="rounded-lg p-2 text-2xl hover:bg-white/50 hover:text-[#38003c]">
          <ThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};

const NavLink = ({
  to,
  title,
  icon,
}: {
  to: string;
  title: string;
  icon: ReactNode;
}) => {
  return (
    <Link
      className="flex h-full basis-full flex-col items-center justify-center gap-1"
      to={to}
    >
      <div className="text-2xl">{icon}</div>
      <div className="text-sm">{title}</div>
    </Link>
  );
};

const Nav = ({ tournamentCode }: { tournamentCode: string }) => {
  return (
    <nav
      className={cx(
        "fixed bottom-0 left-0 right-0 text-[#ffffff] px-safe pb-safe",
        getBackgroundClassName(tournamentCode),
      )}
    >
      <div className="flex h-16 flex-row items-center justify-evenly">
        <NavLink
          to={getTournamentHomeUrl(tournamentCode)}
          title="Home"
          icon={<House />}
        />
        <NavLink
          to={getTournamentPredictionsUrl(tournamentCode)}
          title="Predictions"
          icon={<PatchQuestion />}
        />
        <NavLink
          to={getTournamentLeaderboardUrl(tournamentCode)}
          title="Leaderboard"
          icon={<ListOl />}
        />
      </div>
    </nav>
  );
};

const TournamentLayout = () => {
  const { tournaments } = useTournaments();
  const { tournamentCode } = useParams();

  if (!tournaments) {
    return <div>TODO: nice big loading layout</div>;
  }

  return (
    <>
      <TournamentHeader
        tournamentCode={tournamentCode!}
        tournaments={tournaments}
      />
      <div className="py-safe-offset-16">
        <Outlet />
      </div>
      <Nav tournamentCode={tournamentCode!} />
    </>
  );
};

export { TournamentLayout };
