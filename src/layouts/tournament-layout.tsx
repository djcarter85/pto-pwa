import { ReactNode } from "react";
import {
  House,
  ListOl,
  PatchQuestion,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { Link, Outlet, useParams } from "react-router-dom";

const TournamentHeader = ({ tournamentCode }: { tournamentCode: string }) => {
  return (
    <div className="fixed left-0 right-0 top-0 bg-[#38003c] text-[#ffffff] px-safe pt-safe">
      <div className="flex h-16 flex-row items-center justify-between px-4">
        <div className="text-2xl font-bold">
          Premier League 2023/24
        </div>
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
    <nav className="fixed bottom-0 left-0 right-0 bg-[#38003c] text-[#ffffff] px-safe pb-safe">
      <div className="flex h-16 flex-row items-center justify-evenly">
      <NavLink
          to={`/tournament/${tournamentCode}/home`}
          title="Home"
          icon={<House />}
        />
        <NavLink
          to={`/tournament/${tournamentCode}/predictions`}
          title="Predictions"
          icon={<PatchQuestion />}
        />
        <NavLink
          to={`/tournament/${tournamentCode}/leaderboard`}
          title="Leaderboard"
          icon={<ListOl />}
        />
      </div>
    </nav>
  );
};

const TournamentLayout = () => {
  const { tournamentCode } = useParams();

  return (
    <>
      <TournamentHeader tournamentCode={tournamentCode!} />
      <div className="pt-safe-offset-16">
        <Outlet />
      </div>
      <Nav tournamentCode={tournamentCode!} />
    </>
  );
};

export { TournamentLayout };
