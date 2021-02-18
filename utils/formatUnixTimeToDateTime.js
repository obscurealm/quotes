export default function formatUnixTimeToDateTime(timestamp) {
  const date = new Date(timestamp * 1000);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
