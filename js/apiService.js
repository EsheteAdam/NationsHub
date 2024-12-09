import { urlAllCountries } from "./apiEndpoints.js";
import { CountryClass } from "./ClassCountry.js";

const createClassObjects = (data) => {
    return data.map((item) => {
        const country = new CountryClass(
            item.name.common,
            item.flags?.svg || "N/A", // בדיקה של דגל המדינה
            item.coatOfArms?.svg || "https://via.placeholder.com/50", // שימוש בתמונה חלופית אם סמל לא קיים
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

export const fetchAllCountries = async () => {
    try {
        // בדיקה אם יש נתונים ב-Local Storage
        const cachedData = localStorage.getItem("countries");
        if (cachedData) {
            console.log("Using cached countries data.");
            // המרת המידע מ-JSON לאובייקטי CountryClass
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

        // שמירת הנתונים ב-Local Storage
        localStorage.setItem("countries", JSON.stringify(countriesArray));

        return countriesArray; // החזרת המערך
    } catch (error) {
        console.error("Error fetching countries:", error);
        alert(`Unable to display all countries, please try again later`);
        throw error;
    }
};
