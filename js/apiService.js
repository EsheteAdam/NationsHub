import { urlAllCountries } from "./apiEndpoints.js";

export const fetchCountriesData = async () => {
    const cachedData = localStorage.getItem("countriesData");

    if (cachedData) {
        console.log("Using cached data");
        return JSON.parse(cachedData);
    } else {
        console.log("Fetching data from API");
        const response = await fetch(urlAllCountries);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        localStorage.setItem("countriesData", JSON.stringify(data));
        return data;
    }
};
