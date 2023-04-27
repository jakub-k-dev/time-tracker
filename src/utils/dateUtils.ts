const padLeadingZeros = (number: number, totalNumberLength: number = 2) => {
  const stringNumber = number.toString();
  return stringNumber.padStart(totalNumberLength, "0");
};

export const displayTimeFromMilliseconds = (milliseconds: number) => {
  const diffInSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds - hours * 3600) / 60);
  const seconds = Math.floor(diffInSeconds - hours * 3600 - minutes * 60);

  return `${hours}:${padLeadingZeros(minutes)}:${padLeadingZeros(seconds)}`;
};
