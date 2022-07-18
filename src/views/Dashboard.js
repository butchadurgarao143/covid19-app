import React from "react";
import CardLineChartCountry from "components/Cards/CardLineChartCountry.js";
import CardCountriesCases from "components/Cards/CardCountriesCases";
import Navbar from "components/Navbar";
import HeaderStatsDashboard from "components/HeaderStatsDashboard";
import { DashboardDataProvider } from "context/dashboardDataContext";
import Footer from "components/Footer";

export default function Dashboard() {
  return (
    <DashboardDataProvider>
      <div className="relative bg-blueGray-100">
        <Navbar />
        <HeaderStatsDashboard />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
              <CardLineChartCountry />
            </div>
            {/* <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div> */}
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
              <CardCountriesCases />
            </div>
            {/* <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
          </div>
        </div>
      </div>
      <Footer/>
    </DashboardDataProvider>
  );
}
