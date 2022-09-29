export function convertHoursStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number); // map(Number) -> convert string in numbers

  const minutesAmount = hours * 60 + minutes;

  return minutesAmount;
}
