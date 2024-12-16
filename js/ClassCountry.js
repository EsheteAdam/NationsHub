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

    // מתודה להציג את נתוני המדינה בכרטיס
    renderCountryCard() {
        return `
        <div class="flip-card">
        <div class="flip-card-inner">
            <!-- כרטיס חזית -->
            <div class="flip-card-front card rounded-4 border-5 ">
                <img src="${this.countryFlag}" class="card-img-top rounded-top-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Guess the country!</h5>
                    <p class="card-text">NationsHub</p>
                    <div class="btn-div-card">
                    <button class="btn btn-back flip-btn">More Info</button>
                    </div>
                </div>
            </div>
            
            <!-- כרטיס גב -->
            <div class="flip-card-back card rounded-4 border-5 ">
                <div class="card-body body-back">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <span>Country-Name:</span><span>${this.countryName}</span>
                        </li>
                        <li class="list-group-item">
                            <span>Capital-City:</span><span>${this.countryCapital}</span>
                        </li>
                        <li class="list-group-item">
                            <span>Country-Flag:</span><span><img src="${this.countryFlag}" style="width:40px" alt="..."></span>
                        </li>
                        <li class="list-group-item">
                            <span>Country-Symbol:</span>
                            <span><img src="${this.countrySymbol}" style="width:40px" alt="..."></span>
                        </li>
                        <li class="list-group-item">
                            <span>Region:</span><span>${this.countryRegion}</span>
                        </li>
                        <li class="list-group-item">
                            <span>Sub-Region:</span><span>${this.countrySubRegion}</span>
                        </li>
                        <li class="list-group-item">
                            <span>Population:</span><span>${this.countryPopulation}</span>
                        </li>
                        <li class="list-group-item">
                            <span>Area:</span><span>${this.countryArea} Km</span>
                            
                        </li>
                        <li class="list-group-item">
                            <span>Currencies:</span><span>${this.countryCurrencies}</span>
                        </li>
                        <li class="list-group-item">
                            <span>Languages:</span><span>${this.countryLanguages}</span>
                        </li>
                        <li class="list-group-item">
                            <span>Country-Domain:</span><span>${this.countryDomain}</span>
                        </li>
                        <li class="list-group-item">
                            <span>Independent:</span><span>${this.countryIndependent}</span>
                        </li>
                        <li class="list-group-item">
                            <span>UnMember:</span><span>${this.countryUnMember}</span>
                        </li>
                    </ul>
            
                    <div class="btn-div-back">
                        <button class="btn btn-back flip-btn">Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        `;
    }
}
