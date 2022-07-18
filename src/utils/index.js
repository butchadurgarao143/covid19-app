import axios from "axios"
import { BASE_URL } from "../constants"

export const getCountrySummary = (country) => {
    return axios.get(`${BASE_URL}/dayone/country/${country}`).then(res => {
        const data = res.data;
        return data[data.length - 1];
    })
}