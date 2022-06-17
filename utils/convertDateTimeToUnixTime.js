import moment from "moment";

const convertDateTimeToUnixTime = (dateTime) => {
  const unixTime = moment(dateTime, "DD MMM YYYY at HH:mm").unix();

  return unixTime;
};

export default convertDateTimeToUnixTime;
