import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStatsCountry({data}) {
  const Data = data ? data : {};

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
                  statTitle={Data.Confirmed?.toLocaleString("en-US")}
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Deaths"
                  statTitle={Data.Deaths?.toLocaleString("en-US")}
                  statPercentColor="text-red-500"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Total Recovered"
                  statTitle={Data.Recovered?.toLocaleString("en-US")}
                  statPercentColor="text-orange-500"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Active Cases"
                  statTitle={Data.Active?.toLocaleString("en-US")}
                  statPercentColor="text-emerald-500"
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
