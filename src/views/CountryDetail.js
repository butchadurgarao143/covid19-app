import React, { useEffect, useState } from "react";
// import CardLineChart from "components/Cards/CardLineChart.js";
import CardStatesCases from "components/Cards/CardStatesCases";
import NavbarCountryDetail from "components/NavbarCountryDetail";
import HeaderStatsCountry from "components/HeaderStatsCountry";
import useFetch from "hooks/useFetch";
import { useParams } from "react-router";
import { getCountrySummary } from "utils";
import { CountryDataProvider } from "context/countryDataContext";
import CardLineChartState from "components/Cards/CardLineChartState";
import Footer from "components/Footer";
import CardBarChart from "components/Cards/CardBarChart";

export default function CountryDetail() {
  const [countryData, setCountryData] = useState({});
  const [countrySummary, setCountrySummary] = useState(null);

  let { country } = useParams();

  const { data: countries, isLoading: countriesLoading } =
    useFetch("/countries");

  useEffect(() => {
    fetchCountrySummary();
  }, []);

  useEffect(() => {
    if (!countriesLoading && countries.length) {
      let cont = {};
      countries.map((c) => {
        if (c.Slug === country) {
          cont = c;
        }
      });
      setCountryData(cont);
    }
  }, [countries, countriesLoading]);

  const fetchCountrySummary = () => {
    getCountrySummary(country).then(res => {
      setCountrySummary(res);
      console.log("CountryDetail fetchCountrySummary", res);
    })
  }

  return (
    <CountryDataProvider>
      <div className="relative bg-blueGray-100">
        <NavbarCountryDetail title={countryData.Country} />
        <HeaderStatsCountry data={countrySummary} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardLineChartState countryData={countryData} />
            </div>
            <div className="w-full xl:w-4/12 px-4">
            <CardBarChart countryData={countryData} />
        </div>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
              <CardStatesCases countryData={countryData} />
            </div>
            {/* <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div> */}
          </div>
        </div>
        <Footer/>
      </div>
    </CountryDataProvider>
  );
}
