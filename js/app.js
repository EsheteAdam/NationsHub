import { fetchAllCountries } from "./apiService.js";

// אתחול האפליקציה
const init = async () => {
    const countriesArray = await getAllCountries();
    if (countriesArray) {
        renderAllCountries(countriesArray);
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

init();
