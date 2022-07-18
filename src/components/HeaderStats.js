import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { useDashboardData } from "context/dashboardDataContext";

export default function HeaderStats({data}) {
  const {summary = {}} = useDashboardData();
  const {Global={}} = summary;

  const Data = data ? data : Global;

  return (
    <>
      {/* Header */}
      <div className="relative bg-white md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Cases"
                  statTitle={Data.TotalConfirmed?.toLocaleString("en-US")}
                  statArrow="up"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Deaths"
                  statTitle={Data.TotalDeaths?.toLocaleString("en-US")}
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Recovered"
                  statTitle={Data.TotalRecovered?.toLocaleString("en-US")}
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="New Cases"
                  statTitle={Data.NewConfirmed?.toLocaleString("en-US")}
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-users"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
