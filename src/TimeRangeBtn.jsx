import React from "react";

const TimeRangeBtn = ({ handle30Day, handle7Day, handle24Hour, dayTimeRangeBtn, weekTimeRangeBtn, monthTimeRangeBtn }) => {
    return (
        <>
            <button
                className={dayTimeRangeBtn}
                onClick={handle24Hour}
            >24 Hours
            </button>
            <button
                className={weekTimeRangeBtn}
                onClick={handle7Day}
            >7 Days
            </button>
            <button
                className={monthTimeRangeBtn}
                onClick={handle30Day}
            >30 Days
            </button>
        </>
    )
};
export default TimeRangeBtn;