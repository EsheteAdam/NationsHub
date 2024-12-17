import { CountryClass } from "./ClassCountry.js";
import { urlAllCountries } from "./apiEndpoints.js";

// פונקציה להצגת מדינות בכרטיסים לפי עמוד
// פונקציה להצגת מדינות בכרטיסים לפי עמוד
export const renderPaginatedCountries = (
    countries,
    currentPage = 1,
    itemsPerPage = 12
) => {
    const resDiv = document.getElementById("res");
    const paginationDiv = document.getElementById("pagination");

    const { paginatedCountries, totalPages } = paginateData(
        countries,
        currentPage,
        itemsPerPage
    );

    renderCountriesCards(resDiv, paginatedCountries);
    renderPaginationControls(
        paginationDiv,
        countries,
        currentPage,
        totalPages,
        itemsPerPage
    );
};

// פונקציה למיפוי המדינות בעמוד הנוכחי
const paginateData = (countries, currentPage, itemsPerPage) => {
    const totalItems = countries.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // חישוב טווח המדינות
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCountries = countries.slice(startIndex, endIndex);

    return { paginatedCountries, totalPages };
};

// פונקציה להצגת כרטיסי המדינות
const renderCountriesCards = (container, countries) => {
    container.innerHTML = "";
    countries.forEach((country) => {
        const countryCard = country.renderCountryCard();
        container.innerHTML += countryCard;
    });
};

// פונקציה ליצירת פאגינציה מעוצבת
const renderPaginationControls = (
    container,
    countries,
    currentPage,
    totalPages,
    itemsPerPage
) => {
    container.innerHTML = "";
    const ul = document.createElement("ul");
    ul.classList.add("pagination", "justify-content-center", "mt-4");

    // יצירת כפתורי הפאגינציה
    appendPaginationButton(ul, "&laquo;", 1, currentPage > 1, () =>
        renderPaginatedCountries(countries, 1, itemsPerPage)
    );

    appendPaginationButton(
        ul,
        "&lsaquo;",
        currentPage - 1,
        currentPage > 1,
        () => renderPaginatedCountries(countries, currentPage - 1, itemsPerPage)
    );

    createPageButtons(ul, countries, currentPage, totalPages, itemsPerPage);

    appendPaginationButton(
        ul,
        "&rsaquo;",
        currentPage + 1,
        currentPage < totalPages,
        () => renderPaginatedCountries(countries, currentPage + 1, itemsPerPage)
    );

    appendPaginationButton(
        ul,
        "&raquo;",
        totalPages,
        currentPage < totalPages,
        () => renderPaginatedCountries(countries, totalPages, itemsPerPage)
    );

    container.appendChild(ul);
};

// פונקציה להוספת כפתור בודד לפאגינציה
const appendPaginationButton = (ul, label, page, isEnabled, onClick) => {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (!isEnabled) li.classList.add("disabled");

    li.innerHTML = `
        <a class="page-link" href="#">${label}</a>
    `;

    if (isEnabled) li.addEventListener("click", onClick);
    ul.appendChild(li);
};

// פונקציה ליצירת כפתורי עמודים דינמיים
const createPageButtons = (
    ul,
    countries,
    currentPage,
    totalPages,
    itemsPerPage
) => {
    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement("li");
        li.classList.add("page-item");
        if (i === currentPage) li.classList.add("active");

        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        li.addEventListener("click", () =>
            renderPaginatedCountries(countries, i, itemsPerPage)
        );
        ul.appendChild(li);
    }
};

// פונקציה למיפוי הנתונים
export const mappingData = (data) => {
    return data.map((country) => {
        return new CountryClass(
            country.name?.common || "No Name",
            country.capital?.[0] || "No Capital",
            country.flags?.svg || "/assets/images/no-flag.png",
            country.coatOfArms?.svg || "/assets/images/no-symbol.png",
            country.region || "N/A",
            country.subregion || "N/A",
            country.population ? country.population.toLocaleString() : "N/A",
            country.area || "N/A",
            country.currencies
                ? Object.values(country.currencies)
                      .map((currency) => currency.name)
                      .join(", ")
                : "N/A",
            country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A",
            country.tld?.[0] || "N/A",
            country.independent ? "Yes" : "No",
            country.unMember ? "Yes" : "No"
        );
    });
};
