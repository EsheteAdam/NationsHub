import { urlAllCountries } from "./apiEndpoints.js";
import { CountryClass } from "./ClassCountry.js";

// יצירת אובייקטים של כל מדינה
const createClassObjects = (data) => {
    return data.map((item) => {
        const country = new CountryClass(
            item.name.common,
            item.flags?.svg || "N/A",
            item.coatOfArms?.svg || "https://via.placeholder.com/50",
            item.capital?.[0] || "N/A",
            item.population ? item.population.toLocaleString() : "N/A",
            item.area ? item.area.toLocaleString() : "N/A",
            item.region,
            item.subregion,
            item.languages ? Object.values(item.languages).join(", ") : "N/A",
            item.currencies
                ? Object.values(item.currencies)
                      .map(
                          (currency) =>
                              `${currency.name} (${currency.symbol || "N/A"})`
                      )
                      .join(", ")
                : "N/A"
        );
        return country;
    });
};

// קריאה לכל המדינות
export const fetchAllCountries = async () => {
    try {
        const cachedData = localStorage.getItem("countries");
        if (cachedData) {
            console.log("Using cached countries data.");
            const cachedCountries = JSON.parse(cachedData);
            return cachedCountries.map(
                (countryData) =>
                    new CountryClass(
                        countryData.countryName,
                        countryData.countryFlag,
                        countryData.countrySymbol,
                        countryData.countryCapital,
                        countryData.countryPop,
                        countryData.countryArea,
                        countryData.countryRegion,
                        countryData.countrySubregion,
                        countryData.countryLanguages,
                        countryData.countryCurrencies
                    )
            );
        }

        const res = await fetch(urlAllCountries);
        if (!res.ok) {
            throw new Error(
                `HTTP error! status: ${res.status} - ${res.statusText}`
            );
        }
        const data = await res.json();

        const countriesArray = createClassObjects(data);

        localStorage.setItem("countries", JSON.stringify(countriesArray));

        return countriesArray;
    } catch (error) {
        console.error("Error fetching countries:", error);
        alert(`Unable to display all countries, please try again later`);
        throw error;
    }
};
