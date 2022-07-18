import React, { useEffect } from "react";
import Chart from "chart.js";
import useFetch from "hooks/useFetch";
import { useParams } from "react-router";

export default function CardBarChart() {
    const {country} = useParams();

    const {data, isLoading} = useFetch(`/dayone/country/${country}/status/confirmed`);

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

    let datasets = [];
    let labels = [];

    if(data.length && !isLoading) {
        const Active = [];
        data.map((item, i) => {
          Active.push(item.Cases);
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
          }
        ];
    }

    useEffect(() => {
       
    }, [data, isLoading]);

  React.useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels,
        datasets,
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, [data]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Active Cases
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}