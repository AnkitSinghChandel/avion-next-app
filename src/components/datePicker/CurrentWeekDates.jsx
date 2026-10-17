import React, { useEffect, useState } from "react";
import moment from "moment";
import DownArrowOption from "../../assets/icons/DownArrowOption.svg";

const CurrentWeekDates = ({
  showWeekNumber,
  setWantStartWeekDates,
  setWantEndWeekDates,
}) => {
  // ASC startOf('week') start weeks from Sunday.
  // ASC startOf('isoWeek') start weeks from Monday to Sunday.

  // Initialize state for current week start and end Dates 👇
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("isoWeek").format()
  );
  const [currentWeekEnd, setCurrentWeekEnd] = useState(
    moment().endOf("isoWeek").format()
  );
  const [currentWeekNumber, setCurrentWeekNumber] = useState(
    moment().isoWeek()
  ); //current week Number.

  // Function to navigate to the previous week 👇
  const prevWeek = () => {
    const newWeekStart = moment(currentWeekStart).subtract(7, "days").format();
    const newWeekEnd = moment(currentWeekEnd).subtract(7, "days").format();
    const newWeekNumber = moment(newWeekStart).isoWeek();
    setCurrentWeekStart(newWeekStart);
    setCurrentWeekEnd(newWeekEnd);
    setCurrentWeekNumber(newWeekNumber);
  };

  // Function to navigate to the upcoming week 👇
  const upcomingWeek = () => {
    const newWeekStart = moment(currentWeekStart).add(7, "days").format();
    const newWeekEnd = moment(currentWeekEnd).add(7, "days").format();
    const newWeekNumber = moment(newWeekStart).isoWeek();
    setCurrentWeekStart(newWeekStart);
    setCurrentWeekEnd(newWeekEnd);
    setCurrentWeekNumber(newWeekNumber);
  };

  // Forword data to parent component.
  // Update parent component with current week start and end dates.
  useEffect(() => {
    setWantStartWeekDates(currentWeekStart);
    setWantEndWeekDates(currentWeekEnd);
  }, [
    currentWeekStart,
    currentWeekEnd,
    setWantStartWeekDates,
    setWantEndWeekDates,
  ]);

  return (
    <div className="flex gap-2">
      <div className="pointer" onClick={prevWeek}>
        <img
          src={DownArrowOption}
          style={{ width: "12px", transform: "rotate(90deg)" }}
          alt=""
        />
      </div>

      <div className="fs-6">
        {/* Week-No. {currentWeekNumber}: {currentWeekStart} - {currentWeekEnd} */}
        {showWeekNumber && `Week-No. ${currentWeekNumber}: `}
        {moment(currentWeekStart).format("DD.MM.YYYY")} -{" "}
        {moment(currentWeekEnd).format("DD.MM.YYYY")}
      </div>

      <div className="pointer" onClick={upcomingWeek}>
        <img
          src={DownArrowOption}
          style={{ width: "12px", transform: "rotate(-90deg)" }}
          alt=""
        />
      </div>
    </div>
  );
};

export default CurrentWeekDates;
