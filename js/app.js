import { fetchCountriesData } from "./apiService.js";
import { paginateData, createPaginationControls } from "./pagination.js";
import { CountryClass } from "./ClassCountry.js";

const resDiv = document.getElementById("res");
const paginationDiv = document.getElementById("pagination");
const searchInput = document.getElementById("inputSearch");
const itemsPerPage = 16;
let currentPage = 1;
let allCountries = [];
let filteredCountries = []; // For storing search results

const init = async () => {
    await loadCountries();
    addSearchEventListener();
};

const renderPage = (page, countries = filteredCountries) => {
    currentPage = page;

    // Paginate data
    const { paginatedItems, totalPages } = paginateData(
        countries,
        currentPage,
        itemsPerPage
    );

    // Render country cards
    resDiv.innerHTML = "";
    paginatedItems.forEach((country) => {
        const countryCard = country.renderCountryCard();
        resDiv.appendChild(countryCard);
    });

    // Scroll to top of the container
    resDiv.scrollTop = 0;

    // Create pagination controls
    createPaginationControls(paginationDiv, currentPage, totalPages, (page) =>
        renderPage(page, countries)
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
        filteredCountries = allCountries; // Initially display all countries
        renderPage(1);
    } catch (error) {
        console.error("Error loading countries:", error);
    }
};

const addSearchEventListener = () => {
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();

        if (query) {
            // Filter countries by name
            filteredCountries = allCountries.filter((country) =>
                country.countryName.toLowerCase().includes(query)
            );
        } else {
            // Reset to show all countries
            filteredCountries = allCountries;
        }

        renderPage(1); // Re-render the first page of filtered results
    });
};

// Initialize the application
init();
