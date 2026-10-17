import moment from "moment/moment";
import dayjs from "dayjs";

// for Date Label start.
export const formatMomentDateLabel = (date) => {
  if (!date) return "";

  const dateMoment = moment(date);
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");
  const tomorrow = moment().add(1, "days").startOf("day");

  // Check if the date is today, yesterday, or tomorrow, and return the appropriate label
  if (dateMoment.isSame(today, "day")) {
    return "Today";
  } else if (dateMoment.isSame(yesterday, "day")) {
    return "Yesterday";
  } else if (dateMoment.isSame(tomorrow, "day")) {
    return "Tomorrow";
  } else {
    return dateMoment.format("DD MMM"); // Default format for other dates
  }
};
// for Date Label end.

// for Date Label start.
export const formatDateLabel = (date) => {
  if (!date) return "";

  const dateMoment = dayjs(date);
  const today = dayjs().startOf("day");
  const yesterday = dayjs().subtract(1, "days").startOf("day");
  const tomorrow = dayjs().add(1, "days").startOf("day");

  // Check if the date is today, yesterday, or tomorrow, and return the appropriate label
  if (dateMoment.isSame(today, "day")) {
    return "Today";
  } else if (dateMoment.isSame(yesterday, "day")) {
    return "Yesterday";
  } else if (dateMoment.isSame(tomorrow, "day")) {
    return "Tomorrow";
  } else {
    return dateMoment.format("DD MMM"); // Default format for other dates
  }
};
// for Date Label end.
