import { fetchAllCountries } from "./apiService.js";

// אתחול האפליקציה
const init = async () => {
    const countriesArray = await getAllCountries();
    if (countriesArray) {
        renderAllCountries(countriesArray);
        searchCountryByName(countriesArray); // אתחול החיפוש
        setupRegionChangeListener(countriesArray); // אתחול מאזין לשינוי ביבשת
    }
};

// קריאת כל המדינות
const getAllCountries = async () => {
    try {
        const countries = await fetchAllCountries();
        return countries;
    } catch (error) {
        console.error("Error fetching countries:", error);
        return null;
    }
};

// רינדור כל המדינות
const renderAllCountries = (countriesArray) => {
    const resultContainer = document.getElementById("res");
    resultContainer.innerHTML = ""; // ניקוי תוצאות קיימות

    countriesArray.forEach((country) => {
        country.renderCountry();
    });
};

// פונקציה לחיפוש מדינות לפי שם
const searchCountryByName = (countriesArray) => {
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (!searchTerm) {
            renderAllCountries(countriesArray);
            return;
        }

        const filteredCountries = countriesArray.filter((country) =>
            country.countryName.toLowerCase().includes(searchTerm)
        );

        renderAllCountries(filteredCountries);
    });
};

// פונקציה לטיפול בשינוי ביבשת
const handleRegionChange = (event, countriesArray) => {
    const selectedRegion = event.target.value;
    filterCountriesByRegion(countriesArray, selectedRegion);
};

// פילטר מדינות לפי יבשת
const filterCountriesByRegion = (countriesArray, selectedRegion) => {
    if (!selectedRegion) {
        renderAllCountries(countriesArray);
        return;
    }

    const filteredCountries = countriesArray.filter(
        (country) => country.countryRegion === selectedRegion
    );

    renderAllCountries(filteredCountries);
};

// מאזין לשינוי ביבשת
const setupRegionChangeListener = (countriesArray) => {
    const regionFilter = document.getElementById("regionFilter");
    regionFilter.addEventListener("change", (event) => {
        handleRegionChange(event, countriesArray);
    });
};

init();
