export function convertDateToString(date) {
  const nanoSeconds = date.nanoseconds;
  const seconds = date.seconds;
  const totalMilliseconds = seconds * 1000 + nanoSeconds / 1000000;

  const dateObject = new Date(totalMilliseconds).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  
  return dateObject;
}
