export class CountryClass {
    constructor(
        countryName,
        countryFlag,
        countrySymbol,
        countryCapital,
        countryPop,
        countryArea,
        countryRegion,
        countrySubregion,
        countryLanguages,
        countryCurrencies
    ) {
        this.countryName = countryName;
        this.countryFlag = countryFlag;
        this.countrySymbol = countrySymbol;
        this.countryCapital = countryCapital;
        this.countryPop = countryPop;
        this.countryArea = countryArea;
        this.countryRegion = countryRegion;
        this.countrySubregion = countrySubregion;
        this.countryLanguages = countryLanguages;
        this.countryCurrencies = countryCurrencies;
    }

    renderCountry() {
        const div = document.createElement("div");
        div.classList.add("country-card");
        div.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${this.countryFlag}" class="card-img-top rounded-top-4" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Guess The country?</h5>
                        <p class="card-text-logo">NationsHub</p>
                        <a href="#" class="btn  btn-front">Go somewhere</a>
                    </div>
                </div>
                <div class="flip-card-back">
                    <div class="card-body">
                        <ul class="list-group list-group-flush scrollable-list">
                            <li class="list-group-item">
                                <span class="label">Name:</span> ${this.countryName}
                            </li>
                            <li class="list-group-item">
                                <span class="label">Flag:</span> <img src="${this.countryFlag}" style="width:40px" alt="Flag">
                            </li>
                            <li class="list-group-item">
                                <span class="label">Capital City:</span> ${this.countryCapital}
                            </li>
                            <li class="list-group-item">
                                <span class="label">Population:</span> ${this.countryPop}
                            </li>
                            <li class="list-group-item">
                                <span class="label">Area:</span> ${this.countryArea} KM
                            </li>
                            <li class="list-group-item">
                                <span class="label">Region:</span> ${this.countryRegion}
                            </li>
                            <li class="list-group-item">
                                <span class="label">Sub-Region:</span> ${this.countrySubregion}
                            </li>
                            <li class="list-group-item">
                                <span class="label">Languages:</span> ${this.countryLanguages}
                            </li>
                            <li class="list-group-item">
                                <span class="label">Currencies:</span> ${this.countryCurrencies}
                            </li>
                            <li class="list-group-item">
                                <span class="label">Country Symbol:</span> <img src="${this.countrySymbol}" style="width:40px" alt="Symbol">
                            </li>
                        </ul>
                         <a href="#" class="btn btn-back">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.getElementById("res").append(div);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("res").addEventListener("click", (e) => {
        e.preventDefault();

        const flipInner = e.target
            .closest(".flip-card")
            ?.querySelector(".flip-card-inner");
        if (!flipInner) return;

        const isFront = e.target.classList.contains("btn-front");
        const isBack = e.target.classList.contains("btn-back");

        if (isFront || isBack) {
            document
                .querySelectorAll(".flip-card-inner")
                .forEach((card) => (card.style.transform = ""));
            if (isFront) flipInner.style.transform = "rotateY(180deg)";
        }
    });
});
