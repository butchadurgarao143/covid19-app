import { BASE_URL } from "../constants";
import axios from "axios";
import { useState, useCallback, useEffect } from 'react';

const useFetch = (endpoint) => {
    const [fetchedData, setFetchedData] = useState({
        data: [],
        isLoading: true,
        error: false
    });

    const cancelTokenSource = axios.CancelToken.source();

    const fetchData = useCallback( async () => {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, {cancelToken: cancelTokenSource.token});
            const data = await response.data;
            if(data) {
                setFetchedData({
                    data: data.results ? data.results : data,
                    isLoading: false,
                    error: false,
                })
            }
        } catch (e) {
            if(axios.isCancel(e)) {
                console.log("fetching data aborted");
            } else {
                console.log("error occured", e);
            }

            setFetchedData({
                data: [],
                isLoading: false,
                error: true
            }, [endpoint])
        }
    });

    useEffect(() => {
        fetchData();
        return () => cancelTokenSource.cancel();
    }, [endpoint]);

    const {data, isLoading, error} = fetchedData;
    return {data, isLoading, error};
}

export default useFetch;