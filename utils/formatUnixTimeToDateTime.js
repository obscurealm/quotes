export default function formatUnixTimeToDateTime(timestamp) {
  const date = new Date(timestamp * 1000);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = date.toLocaleTimeString("en", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
  });

  return { date: formattedDate, time };
}
