import React from "react";

export default function CalenderHeader({ value, setValue }) {
    function currMonthName() {
        return value.format("MMMM");
    }

    function currYear() {
        return value.format("YYYY");
    }

    function currDay() {
        return value.format("DD");
    }

    function prevMonth() {
        return value.clone().subtract(1, "month");
    }

    function nextMonth() {
        return value.clone().add(1, "month");
    }

    function thisMonth() {
        return value.isSame(new Date(), "month");
    }

    return (
        <div className="calender_header">
            <div
                className="prev"
                onClick={() => !thisMonth() && setValue(prevMonth())}
            >
                {!thisMonth() ? String.fromCharCode(171) : null}
            </div>
            <div className="current">
                {/* <span className="d-block">{currDay()}</span> */}
                {currMonthName()} {currYear()}
            </div>
            <div className="next" onClick={() => setValue(nextMonth())}>
                {String.fromCharCode(187)}
            </div>
        </div>
    );
}
