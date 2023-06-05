import React from "react";

const ChartLayerSelect = ({ checkmarkProv, checkmarkReq, handleProvLayer, handleReqLayer, provLayer, reqLayer, chartLayerSelect, provCheckbox, reqCheckbox }) => {
    return (
        <div className={chartLayerSelect}>
            <label className={provCheckbox} htmlFor="cpuProvisioned">CPU provisioned
                <input
                    type="checkbox"
                    id="cpuProvisioned"
                    checked={provLayer}
                    onChange={handleProvLayer}
                ></input>
                <span className={checkmarkProv}></span>
            </label>
            <label className={reqCheckbox} htmlFor="cpuRequested">CPU requested
                <input
                    type="checkbox"
                    id="cpuRequested"
                    checked={reqLayer}
                    onChange={handleReqLayer}
                ></input>
                <span className={checkmarkReq}></span>
            </label>
        </div>
    )
};
export default ChartLayerSelect;