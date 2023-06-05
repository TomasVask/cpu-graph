import React from "react";
import { ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from "recharts";

const CustomTick = ({ y, payload }) => {
    return (
        <text x={65} y={y} dy={-4} textAnchor="start" fill="#868585" fontSize="0.55rem">
            {payload.value}
        </text>
    );
};

const ChartView = ({ data, handleProvDataKey, handleReqDataKey, interval, isArea }) => {
    return (
        <ComposedChart
            width={780}
            height={200}
            data={data}
            margin={{
                top: 10,
                right: 25,
                left: 5,
                bottom: 0
            }}>
            <CartesianGrid
                vertical={false}
                stroke="#ece9e9"
                strokeWidth="0.8"
            />
            <XAxis
                dataKey="timestamp"
                axisLine={false}
                tickLine={false}
                padding={{ left: 7, right: 7 }}
                fontSize="0.55rem"
                interval={interval} />
            <YAxis
                axisLine={false}
                tickLine={false}
                verticalAnchor="end"
                tickSize="0"
                tick={<CustomTick />}
                tickCount={6}
            >
                <Label
                    value="CPU"
                    position="right"
                    fontSize="0.55rem"
                    dx={13}
                    dy={-85}
                />
            </YAxis>
            <Tooltip
                contentStyle={{ fontSize: "11px", borderRadius: "5px" }}
            />
            {isArea === true ?
                <>
                    <Area
                        dataKey={handleProvDataKey}
                        stroke="#1a63c2"
                        fill="#ffffff00"
                    />
                    <Area
                        dataKey={handleReqDataKey}
                        stroke="#4980c973"
                        fill="#1569d673"
                    />
                </>
                :
                <>
                    <Bar
                        dataKey={handleProvDataKey}
                        stroke="#1a63c2"
                        fill="#1a63c2"
                    />
                    <Bar
                        dataKey={handleReqDataKey}
                        stroke="#4980c973"
                        fill="#71a7eef1"
                    />
                </>
            }
        </ComposedChart >
    )
};
export default ChartView;