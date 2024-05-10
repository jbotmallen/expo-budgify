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

export function convertTimeToDate(dateTime) {
  const nanosecondsInSeconds = dateTime.nanoseconds / 1_000_000_000;
  const totalSeconds = dateTime.seconds + nanosecondsInSeconds;
  const date = new Date(totalSeconds * 1000);

  return date;
}

export const currentMonth = new Date().toLocaleString("default", {
  month: "long",
});

export const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}