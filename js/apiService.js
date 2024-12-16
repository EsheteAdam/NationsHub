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

// פונקציה לקבלת כל המדינות עם Cache
export const fetchAllCountries = async () => {
    try {
        // בדיקה אם הנתונים קיימים ב-LocalStorage
        const cachedData = localStorage.getItem("countriesData");

        if (cachedData) {
            // שימוש בנתונים מקומיים
            console.log("Using cached data");
            const countries = mappingData(JSON.parse(cachedData));
            renderCountries(countries);
        } else {
            // במידה ואין נתונים שמורים, מבצעים בקשה ל-API
            console.log("Fetching data from API");
            const response = await fetch(urlAllCountries);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // שמירה ב-LocalStorage
            localStorage.setItem("countriesData", JSON.stringify(data));

            const countries = mappingData(data);
            renderCountries(countries);
        }
    } catch (error) {
        console.error("Failed to fetch countries:", error.message);
    }
};

// פונקציה למיפוי הנתונים (המרת נתונים לאובייקטים של CountryClass)
export const mappingData = (data) => {
    const dataArray = data.map((country) => {
        return new CountryClass(
            country.name?.common || "No Name", // בדיקה אם שם קיים
            country.capital?.[0] || "No Capital", // מתקן את הבעיה עם capital, כי היא מערך
            country.flags?.svg || "/assets/images/no-flag.png", // בדיקה אם דגל קיים
            country.coatOfArms?.svg || "/assets/images/no-symbol.png", // סמל או תמונה חלופית
            country.region || "N/A", // בדיקה אם region קיים
            country.subregion || "N/A", // בדיקה אם subregion קיים
            country.population ? country.population.toLocaleString() : "N/A", // בדיקה אם אוכלוסייה קיימת
            country.area ? country.area.toLocaleString() : "N/A", // בדיקה אם שטח קיים
            country.currencies
                ? Object.values(country.currencies)
                      .map(
                          (currency) =>
                              `${currency.name} (${currency.symbol || "N/A"})`
                      )
                      .join(", ")
                : "N/A", // מיפוי המטבעות עם בדיקה שהם קיימים
            country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A", // בדיקה אם שפות קיימות
            country.tld?.[0] || "N/A", // בדיקה אם סיומת (TLD) קיימת
            country.independent !== undefined
                ? country.independent
                    ? "Yes"
                    : "No"
                : "N/A", // בדיקה אם הערך independent קיים
            country.unMember !== undefined
                ? country.unMember
                    ? "Yes"
                    : "No"
                : "N/A" // בדיקה אם הערך unMember קיים
        );
    });

    return dataArray; // מחזיר את המערך המעובד
};
