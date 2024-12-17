import { fetchCountriesData } from "./apiService.js";
import { paginateData, createPaginationControls } from "./pagination.js";
import { CountryClass } from "./ClassCountry.js";

const resDiv = document.getElementById("res");
const paginationDiv = document.getElementById("pagination");
const itemsPerPage = 16;
let currentPage = 1;
let allCountries = [];

const renderPage = (page) => {
    currentPage = page;

    // חישוב עמוד נוכחי
    const { paginatedItems, totalPages } = paginateData(
        allCountries,
        currentPage,
        itemsPerPage
    );

    // רינדור כרטיסים
    resDiv.innerHTML = ""; // לאחסן מחדש את התוכן
    paginatedItems.forEach((country) => {
        const countryCard = country.renderCountryCard();
        resDiv.appendChild(countryCard); // השתמש ב-appendChild במקום innerHTML
    });

    // מחזיר את הגלילה להתחלה
    resDiv.scrollTop = 0;

    // יצירת פאגינציה
    createPaginationControls(
        paginationDiv,
        currentPage,
        totalPages,
        renderPage
    );
};

const loadCountries = async () => {
    try {
        const data = await fetchCountriesData();
        allCountries = data.map(
            (country) =>
                new CountryClass(
                    country.name?.common || "No Name",
                    country.capital?.[0] || "No Capital",
                    country.flags?.svg || "/assets/images/no-flag.png",
                    country.coatOfArms?.svg || "/assets/images/no-symbol.png",
                    country.region || "N/A",
                    country.subregion || "N/A",
                    country.population
                        ? country.population.toLocaleString()
                        : "N/A",
                    country.area || "N/A",
                    country.currencies
                        ? Object.values(country.currencies)
                              .map((c) => `${c.name} (${c.symbol})`)
                              .join(", ")
                        : "N/A",
                    country.languages
                        ? Object.values(country.languages).join(", ")
                        : "N/A",
                    country.tld?.[0] || "N/A",
                    country.independent ? "Yes" : "No",
                    country.unMember ? "Yes" : "No"
                )
        );
        renderPage(1);
    } catch (error) {
        console.error("Error loading countries:", error);
    }
};

// התחלת הטעינה
loadCountries();
