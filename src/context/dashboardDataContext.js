import useFetch from "hooks/useFetch";
import React from "react";

const DataContext = React.createContext(null);

const DashboardDataProvider = (props) => {
  const { data, isLoading, error } = useFetch("/summary");

  return (
    <DataContext.Provider
      value={{
        summary: data,
        summaryLoading: isLoading,
        summaryError: error,
      }}
      {...props}
    />
  );
};

const useDashboardData = () => React.useContext(DataContext);

export default DataContext;
export { DashboardDataProvider, useDashboardData };
