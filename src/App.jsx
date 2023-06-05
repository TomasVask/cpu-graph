import React, { useState, useEffect } from "react";
import styles from "./style.module.css"
import axios from "axios";
import Chart from "./Chart";
import AverageBox from "./AverageBox";
import TimeRangeBtn from "./TimeRangeBtn";
import ChartViewSelect from "./ChartViewSelect";

const App = () => {
  const [cpuData, setCpuData] = useState([]);
  const [timeRange, setTimeRange] = useState("thirty-day");
  const [isArea, setIsArea] = useState(true);

  const handleAreaClick = () => {
    setIsArea(true)
  };

  const handleBarClick = () => {
    setIsArea(false)
  };

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const response = await axios.get("./thirty-day-data.json");
        const provisionedRaw = response.data.provisioned[0].values;
        const requestedRaw = response.data.requested[0].values;
        if (!ignore) {
          const handleIntegerConvert = (input) => {
            return (
              input.map((item) => {
                return ({
                  timestamp: parseInt(item.timestamp),
                  value: parseFloat(item.value)
                })
              }));
          }
          const cpuProvisionedData = handleIntegerConvert(provisionedRaw);
          const cpuRequestedData = handleIntegerConvert(requestedRaw);
          const mergedArray1 = [];

          for (let i = 0; i < cpuProvisionedData.length; i++) {
            const newArray = {
              timestamp: cpuProvisionedData[i].timestamp,
              provisioned: cpuProvisionedData[i].value / 1000,
              requested: cpuRequestedData[i].value / 1000
            };
            mergedArray1.push(newArray);
          };
          const hourlyAgregated = mergedArray1.map(item => {
            const date = new Date(item.timestamp);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
            return { ...item, timestamp: dateString }
          })
          setCpuData(hourlyAgregated);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    }
  }, []);

  const monthPeriod = -720; //taking last 30 sets of 24 hours from cpuData array
  const weekPeriod = -168; //takng last 7 sets of 24 hours from cpuData array
  const twentyFourHourPeriod = -24; //taking last 24 hours from cpuData array

  const calculatePeriodAverage = (input) => {
    const timeRange = cpuData.slice(input);
    const initValue = { provSum: 0, reqSum: 0, count: 0 }
    for (let item of timeRange) {
      initValue.provSum += item.provisioned;
      initValue.reqSum += item.requested;
      initValue.count++
    };
    const provisionedAvg = (initValue.provSum / initValue.count).toFixed(2);
    const requestedAvg = (initValue.reqSum / initValue.count).toFixed(2);
    return [provisionedAvg, requestedAvg]
  };

  const handleAverageData = () => {
    if (timeRange === "thirty-day") {
      return calculatePeriodAverage(monthPeriod);
    };
    if (timeRange === "7-day") {
      return calculatePeriodAverage(weekPeriod);
    };
    if (timeRange === "twenty-four-hour") {
      return calculatePeriodAverage(twentyFourHourPeriod);
    };
  };

  const handle30Day = () => {
    setTimeRange("thirty-day")
  };

  const handle7Day = () => {
    setTimeRange("7-day")
  };

  const handle24Hour = () => {
    setTimeRange("twenty-four-hour")
  };

  const getDayOfMonth = () => {
    return cpuData.map((item) => {
      const dateItems = item.timestamp.split(' ');
      const date = dateItems[0];
      const day = new Date(date).getDate();
      const result = parseInt(day);
      return {
        timestamp: result,
        provisioned: item.provisioned.toFixed(2),
        requested: item.requested.toFixed(2)
      }
    })
  };
  const dayOfMonth = getDayOfMonth();

  const getHourOfMonth = () => {
    return cpuData.map((item) => {
      const dateItems = item.timestamp.split(' ');
      const date = dateItems[1];
      return {
        timestamp: date,
        provisioned: item.provisioned.toFixed(2),
        requested: item.requested.toFixed(2)
      }
    })
  };

  const hourOfDay = getHourOfMonth();

  const handleChartData = () => {
    if (timeRange === "thirty-day") {
      return dayOfMonth.slice(-720);
    };
    if (timeRange === "7-day") {
      return dayOfMonth.slice(-168);
    };
    if (timeRange === "twenty-four-hour") {
      return hourOfDay.slice(-24);
    };
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <div className={styles.sidemenu}>some kind of menu</div>
        <section className={styles.cpuUtilization}>
          <p className={styles.header}>CPU Utilization</p>
          <div className={styles.dash_box}>
            <div className={styles.dashboardMenu}>
              <div className={styles.timeRange}>
                <TimeRangeBtn
                  handle24Hour={handle24Hour}
                  handle7Day={handle7Day}
                  handle30Day={handle30Day}
                  dayTimeRangeBtn={`${styles.timeRangeBtn} ${timeRange === "twenty-four-hour" ? styles.timeRangeFocused : ""}`}
                  weekTimeRangeBtn={`${styles.timeRangeBtn} ${timeRange === "7-day" ? styles.timeRangeFocused : ""}`}
                  monthTimeRangeBtn={`${styles.timeRangeBtn} ${timeRange === "thirty-day" ? styles.timeRangeFocused : ""}`}
                />
              </div>
              <div>
                <ChartViewSelect
                  handleAreaClick={handleAreaClick}
                  handleBarClick={handleBarClick}
                  isArea={isArea}
                  areaBtn={`${styles.areaBtn} ${isArea ? styles.areaBtnFocused : ""}`}
                  barBtn={`${styles.barBtn} ${!isArea ? styles.barBtnFocused : ""}`}
                  viewSelect={styles.viewSelect}
                />
              </div>
            </div>
            <div className={styles.dashboard}>
              <AverageBox
                averageProv={handleAverageData()[0]}
                averageReq={handleAverageData()[1]}
              />
              <Chart
                data={handleChartData()}
                isArea={isArea}
                chartLayerSelect={styles.chartLayerSelect}
                provCheckbox={styles.provCheckbox}
                reqCheckbox={styles.reqCheckbox}
                checkmarkProv={styles.checkmarkProv}
                checkmarkReq={styles.checkmarkReq}
                timeRange={timeRange}
              />
            </div>
          </div>
        </section >
      </div >
    </div>
  )
};

export default App;
