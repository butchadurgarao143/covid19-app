import useFetch from "hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const CountryDataContext = React.createContext(null);

const CountryDataProvider = (props) => {
  const [states, setStates] = useState([]);
  const [statesAllData, setStatesAllData] = useState({});

  const {country} = useParams();
  const { data, isLoading, error } = useFetch(`/live/country/${country}`);

  useEffect(() => {
    if(data.length && !isLoading) {
      const statesData = {};
      const states = [];
      data.map(item => {
        const provinceData = statesData[item.Province] || [];
        provinceData.push(item);
        statesData[item.Province] = provinceData;
      });
      Object.values(statesData).map(item => {
        const data = item[item.length - 1];
        states.push(data);
      });
      setStates(states);
      setStatesAllData(statesData);
      console.log("CountryDataProvider data", {statesData, data, states});
    }
  }, [data, isLoading]);

  return (
    <CountryDataContext.Provider
      value={{
        summary: data,
        summaryLoading: isLoading,
        summaryError: error,
        states,
        statesAllData,
        isLoading
      }}
      {...props}
    />
  );
};

const useCountrydData = () => React.useContext(CountryDataContext);

export default CountryDataContext;
export { CountryDataProvider, useCountrydData };
