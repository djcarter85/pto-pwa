import { DateTime } from "luxon";

export const formatDate = (date: DateTime) => {
  return date.toFormat("EEEE d MMMM yyyy");
};
