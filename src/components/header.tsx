export const Header = ({
  tournamentName,
  roundName,
}: {
  tournamentName: string;
  roundName?: string;
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-800 to-blue-700 px-3 py-3 text-center text-blue-50">
      <div className="text-2xl font-bold">{tournamentName}</div>
      <div className="text-lg">{roundName ?? "Overall"}</div>
    </div>
  );
};
