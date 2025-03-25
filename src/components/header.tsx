import { ReactNode } from "react";
import { TrophyFill, ClockFill, PersonFill } from "react-bootstrap-icons";

const IconWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex size-8 items-center justify-center rounded-full bg-blue-800 text-neutral-100">
      {children}
    </div>
  );
};

export const Header = ({
  tournamentName,
  roundName,
  playerName,
}: {
  tournamentName: string;
  roundName?: string;
  playerName?: string;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 border-b border-b-neutral-600 px-4 py-4 text-lg">
      <IconWrapper>
        <TrophyFill />
      </IconWrapper>
      <div>{tournamentName}</div>
      {roundName && (
        <>
          <IconWrapper>
            <ClockFill />
          </IconWrapper>
          <div>{roundName}</div>
        </>
      )}
      {playerName && (
        <>
          <IconWrapper>
            <PersonFill />
          </IconWrapper>
          <div>{playerName}</div>
        </>
      )}
    </div>
  );
};
