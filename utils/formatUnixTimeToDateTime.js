import moment from 'moment';

export default function formatUnixTimeToDateTime(timestamp) {
  const date = new Date(timestamp * 1000);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  moment.locale("en-GB")

  const time = moment.unix(timestamp).utc(true).format("h:mma")

  return { date: formattedDate, time };
}
