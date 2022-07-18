import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { useDashboardData } from "context/dashboardDataContext";
import axios from "axios";
import { BASE_URL } from "../../constants";

const durations = [
  {
    label: "ALL",
    key: "all",
  },
  {
    label: "Last 7 Days",
    key: "last_7",
  },
  {
    label: "Last 30 Days",
    key: "last_30",
  },
  {
    label: "Last 60 Days",
    key: "last_60",
  }, 
  {
    label: "Last 90 Days",
    key: "last_90",
  } 
];

export default function CardLineChartCountry() {
  const [country, setCountry] = useState();
  const [data, setData] = useState([]);
  const [duration, setDuration] = useState(durations[0].key);
  const [loading, setLoading] = useState(false);

  const { summary = {} } = useDashboardData();
  const { Countries = [] } = summary;

  useEffect(() => {
    if (Countries.length) {
      setCountry(Countries[0].Slug);
    }
  }, [Countries]);

  const formatDate = (data) => {
    const dateObj = new Date(data);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    let year = `${dateObj.getUTCFullYear()}`;
    year = year.substr(-2, 2);
    return `${day < 10 ? `0${day}` : day}-${
      month < 10 ? `0${month}` : month
    }-${year}`;
  };

  const getQueryDate = (data) => {
    const dateObj = new Date(data);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    let year = `${dateObj.getUTCFullYear()}`;
    return `${year}-${month < 10 ? `0${month}` : month}-${
      day < 10 ? `0${day}` : day
    }T00:00:00Z`;
  };

  const getQuery = () => {
    let fromDate = "";
    const currentDate = new Date();
    if (duration === "last_7") {
      fromDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
    } else if (duration === "last_30") {
      fromDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
    } else if (duration === "last_60") {
      fromDate = new Date(currentDate.setDate(currentDate.getDate() - 60));
    } else if (duration === "last_90") {
      fromDate = new Date(currentDate.setDate(currentDate.getDate() - 90));
    }

    const fromDateString = getQueryDate(fromDate);
    const currentDateString = getQueryDate(new Date());
    return `?from=${fromDateString}&to=${currentDateString}`;

    // return `${day < 10 ? `0${day}`: day}-${month < 10 ? `0${month}` : month}-${year}`;
  };

  useEffect(() => {
    if (country) {
      setLoading(true);
      let query = "";

      query = getQuery();
      axios
        .get(`${BASE_URL}/country/${country}${query}`)
        .then((res) => {
          setData(res.data || []);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [country, duration]);

  let datasets = [];
  let labels = [];

  if (data.length) {
    const Active = [];
    const Confirmed = [];
    const Deaths = [];
    data.map((item, i) => {
      Active.push(item.Active);
      Confirmed.push(item.Confirmed);
      Deaths.push(item.Deaths);
      labels.push(formatDate(item.Date));
    });

    datasets = [
      {
        label: "Active Cases",
        backgroundColor: "green",
        borderColor: "green",
        data: Active,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Total Cases",
        backgroundColor: "#4c51bf",
        borderColor: "#4c51bf",
        data: Confirmed,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Total Deaths",
        backgroundColor: "#F08080",
        borderColor: "#F08080",
        data: Deaths,
        fill: false,
        pointRadius: 0,
      },
    ];
  }

  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Covid-19 Cases",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "black",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgb(100 116 139)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgb(100 116 139)",
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Cases",
                fontColor: "gray",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: true,
                color: "rgb(203 213 225)",
                zeroLineColor: "rgba(33, 37, 41, 1)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    const element = document.getElementById("line-chart");
    if (!element) return;

    var ctx = element.getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [data, loading]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent flex flex-col md:flex-row">
          <div className="flex flex-wrap items-center mr-4">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-700 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Covid-19 Cases
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap items-center mr-4 mt-4 md:mt-0">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-700 mb-1 text-xs font-semibold">
                Select Country
              </h6>
              <select
                className="rounded-full bg-transparent py-1 w-28"
                name="country"
                id="country"
                style={{ backgroundColor: "transparent", width: '10rem' }}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {Countries.map((item) => (
                  <option key={item.Slug} value={item.Slug}>{item.Country}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-4 md:mt-0">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-700 mb-1 text-xs font-semibold">
                Select Duration
              </h6>
              <div className="flex flex-wrap">
                {durations.map((item) => (
                  <div
                    key={item.key}
                    onClick={() => setDuration(item.key)}
                    style={{
                      backgroundColor:
                        duration === item.key ? "rgb(34 197 94)" : "white",
                    }}
                    className={`shadow rounded p-2 mr-2 cursor-pointer text-sm w-1/3 md:w-fit mb-2 ${
                      duration === item.key ? "text-white" : ""
                    }`}
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            {loading ? null : <canvas id="line-chart"></canvas>}
          </div>
        </div>
      </div>
    </>
  );
}
