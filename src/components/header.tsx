import { Trophy, Clock, Person } from "react-bootstrap-icons";

export const Header = ({
  tournamentName,
  roundName,
  playerName,
}: {
  tournamentName: string;
  roundName: string;
  playerName?: string;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_1fr] items-center gap-x-3 gap-y-2 border-b border-b-neutral-600 px-4 py-4 text-lg">
      <Trophy />
      <div>{tournamentName}</div>
      <Clock />
      <div>{roundName}</div>
      {playerName && (
        <>
          <Person />
          <div className="col-span-3">{playerName}</div>
        </>
      )}
    </div>
  );
};
