export const parseDateRangeToString = (fromDate: string, toDate: string) => {
  const parsedFromDate = new Date(fromDate).toLocaleDateString();
  const parsedToDate = new Date(toDate).toLocaleDateString();

  if (parsedFromDate === parsedToDate) {
    return parsedFromDate;
  }

  return `${parsedFromDate} - ${parsedToDate}`;
};
