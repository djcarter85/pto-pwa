const getTournamentHomeUrl = (tournamentCode: string) => {
  return `/tournament/${tournamentCode}/home`;
};
const getTournamentPredictionsUrl = (tournamentCode: string) => {
  return `/tournament/${tournamentCode}/predictions`;
};
const getTournamentLeaderboardUrl = (tournamentCode: string) => {
  return `/tournament/${tournamentCode}/leaderboard`;
};
const getLoginUrl = () => {
  return "/login";
};

export {
  getLoginUrl,
  getTournamentHomeUrl,
  getTournamentPredictionsUrl,
  getTournamentLeaderboardUrl,
};
