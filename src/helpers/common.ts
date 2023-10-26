import { differenceInYears } from "date-fns";

export const getYearOldKid = (date: string): number => {
  return differenceInYears(new Date(), new Date(date));
};
