import moment from "moment-timezone";

const convertDateTimeToUtc = (
  dateTime,
  timeZone,
  format = "DD MMM YYYY at HH:mm"
) => {
  const utcTime = moment.tz(dateTime, format, timeZone).utc().format();

  return utcTime;
};

export default convertDateTimeToUtc;
