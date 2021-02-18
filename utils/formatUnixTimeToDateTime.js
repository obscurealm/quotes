import moment from "moment";

export default function formatUnixTimeToDateTime(timestamp) {
  const date = moment.unix(timestamp).format("D MMMM YYYY");
  const time = moment.unix(timestamp).utc(true).format("h:mma");

  return { date, time };
}
