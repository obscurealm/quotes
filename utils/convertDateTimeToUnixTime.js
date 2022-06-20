import moment from "moment";

const convertDateTimeToUnixTime = (dateTime) => {
  const unixTime = moment(dateTime).unix();

  return unixTime;
};

export default convertDateTimeToUnixTime;
