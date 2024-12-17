let currentlyFlippedCard = null; // Track the currently flipped card globally

export class CountryClass {
    constructor(
        countryName,
        countryCapital,
        countryFlag,
        countrySymbol,
        countryRegion,
        countrySubRegion,
        countryPopulation,
        countryArea,
        countryCurrencies,
        countryLanguages,
        countryDomain,
        countryIndependent,
        countryUnMember
    ) {
        this.countryName = countryName;
        this.countryCapital = countryCapital;
        this.countryFlag = countryFlag;
        this.countrySymbol = countrySymbol;
        this.countryRegion = countryRegion;
        this.countrySubRegion = countrySubRegion;
        this.countryPopulation = countryPopulation;
        this.countryArea = countryArea;
        this.countryCurrencies = countryCurrencies;
        this.countryLanguages = countryLanguages;
        this.countryDomain = countryDomain;
        this.countryIndependent = countryIndependent;
        this.countryUnMember = countryUnMember;
    }

    // Method to render the country card with flip effect
    renderCountryCard() {
        const cardHtml = ` 
        <div class="flip-card">
            <div class="flip-card-inner">
                <!-- Front of the card -->
                <div class="flip-card-front card rounded-4 border-5 ">
                    <img src="${this.countryFlag}" class="card-img-top rounded-top-4" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Guess the country!</h5>
                        <p class="card-text">NationsHub</p>
                        <div class="btn-div-card">
                            <button class="btn btn-back flip-btn py-2">More Info</button>
                        </div>
                    </div>
                </div>

                <!-- Back of the card -->
                <div class="flip-card-back card rounded-4 border-5 ">
                    <div class="card-body body-back">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><span>Country-Name:</span><span>${this.countryName}</span></li>
                            <li class="list-group-item"><span>Capital-City:</span><span>${this.countryCapital}</span></li>
                            <li class="list-group-item"><span>Country-Flag:</span><span><img src="${this.countryFlag}" style="width:40px" alt="..."></span></li>
                            <li class="list-group-item"><span>Country-Symbol:</span><span><img src="${this.countrySymbol}" style="width:40px" alt="..."></span></li>
                            <li class="list-group-item"><span>Region:</span><span>${this.countryRegion}</span></li>
                            <li class="list-group-item"><span>Sub-Region:</span><span>${this.countrySubRegion}</span></li>
                            <li class="list-group-item"><span>Population:</span><span>${this.countryPopulation}</span></li>
                            <li class="list-group-item"><span>Area:</span><span>${this.countryArea} Km</span></li>
                            <li class="list-group-item"><span>Currencies:</span><span>${this.countryCurrencies}</span></li>
                            <li class="list-group-item"><span>Languages:</span><span>${this.countryLanguages}</span></li>
                            <li class="list-group-item"><span>Country-Domain:</span><span>${this.countryDomain}</span></li>
                            <li class="list-group-item"><span>Independent:</span><span>${this.countryIndependent}</span></li>
                            <li class="list-group-item"><span>UnMember:</span><span>${this.countryUnMember}</span></li>
                        </ul>
            
                        <div class="btn-div-back">
                            <button class="btn btn-back flip-btn py-2">Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        // Create the card element
        const cardElement = document.createElement("div");
        cardElement.innerHTML = cardHtml;

        const flipCardInner = cardElement.querySelector(".flip-card-inner");
        const btnMoreInfo = cardElement.querySelector(".btn-back"); // Button to flip to back
        const btnGoBack = cardElement.querySelector(".btn-div-back .btn-back"); // Button to flip to front

        // Event listener for "More Info" button (flip to back)
        btnMoreInfo.addEventListener("click", () => {
            // If another card is flipped, flip it back
            if (
                currentlyFlippedCard &&
                currentlyFlippedCard !== flipCardInner
            ) {
                currentlyFlippedCard.style.transform = "rotateY(0deg)";
            }
            // Flip the current card
            flipCardInner.style.transform = "rotateY(180deg)";
            currentlyFlippedCard = flipCardInner; // Set the current card as flipped
        });

        // Event listener for "Go Back" button (flip to front)
        btnGoBack.addEventListener("click", () => {
            flipCardInner.style.transform = "rotateY(0deg)";
            currentlyFlippedCard = null; // Reset flipped card when going back
        });

        return cardElement;
    }
}
