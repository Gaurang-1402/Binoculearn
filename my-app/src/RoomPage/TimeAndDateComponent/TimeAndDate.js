// import "./styles.css";
import React, { useState } from "react";

const TimeAndDate = () => {
  setInterval(up, 1000);
  let time1 = new Date().toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit"
  });

  const [Time, setTime] = useState(time1);

  var today = new Date();
  var day = today.getDay();
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var dayname = days[day];

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const d = new Date();
  var z = monthNames[d.getMonth()];

  var todaz = new Date();
  var dd = String(todaz.getDate()).padStart(2, "0");

  function up() {
    let time = new Date().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
    setTime(time);
  }

  return (
    <div className="TimeAndDate">
      <h1 style={{fontSize:'12px',color:'white'}}>
        {Time} • {dayname}, {z} {dd}
      </h1>
    </div>
  );
}


export default TimeAndDate;