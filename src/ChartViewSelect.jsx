import React from "react";

const ChartViewSelect = ({ handleAreaClick, handleBarClick, viewSelect, areaBtn, barBtn }) => {
    return (
        <div className={viewSelect}>
            <button
                className={areaBtn}
                onClick={handleAreaClick}
            ></button>
            <button
                className={barBtn}
                onClick={handleBarClick}
            ></button>
        </div>
    )
};
export default ChartViewSelect;