import moment from "moment";

const formatUnixTimeToDateTime = (timestamp) => {
  const date = moment.unix(timestamp).format("D MMMM YYYY");
  const time = moment.unix(timestamp).format("h:mma");

  return { date, time };
};

export default formatUnixTimeToDateTime;
