import { CountryClass } from "./ClassCountry.js";
import { urlAllCountries } from "./apiEndpoints.js";

// פונקציה להצגת מדינות בכרטיסים
export const renderCountries = (countries) => {
    const resDiv = document.getElementById("res");
    resDiv.innerHTML = ""; // לנקות את התוכן הקודם

    countries.forEach((country) => {
        const countryCard = country.renderCountryCard(); // משתמש במתודה renderCountryCard של כל אובייקט CountryClass
        resDiv.innerHTML += countryCard; // מוסיף את התוכן לכל כרטיס
    });
};

// פונקציה לקבלת כל המדינות
export const fetchAllCountries = async () => {
    try {
        const response = await fetch(urlAllCountries);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const countries = mappingData(data); // שימוש במערך שנוצר
        renderCountries(countries); // הוספת הכרטיסים לדף
    } catch (error) {
        console.error("Failed to fetch countries:", error.message);
    }
};

// פונקציה למיפוי הנתונים (המרת נתונים לאובייקטים של CountryClass)
export const mappingData = (data) => {
    const dataArray = data.map((country) => {
        return new CountryClass(
            country.name.common,
            country.capital ? country.capital : "No Capital",
            country.flags.svg,
            country.coatOfArms ? country.coatOfArms.svg : "no",
            country.region,
            country.subregion,
            country.population.toLocaleString(),
            country.area.toLocaleString(),
            country.currencies
                ? Object.values(country.currencies)
                      .map(
                          (currency) =>
                              `${currency.name} (${currency.symbol || "N/A"})`
                      )
                      .join(", ")
                : "N/A",
            country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A",
            country.tld,
            country.independent ? "👍" : "👎",
            country.unMember ? "👍" : "👎"
        );
    });

    return dataArray;
};
