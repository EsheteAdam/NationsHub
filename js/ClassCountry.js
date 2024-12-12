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
                <div class="flip-card-front card rounded-4">
                    <img src="${this.countryFlag}" class="card-img-top rounded-top-4" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Guess the country!</h5>
                    <p class="card-text">Can you guess the country based on the flag?</p>
            
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                
                <div class="flip-card-back card rounded-4">
                    <div class="card-body">
                    
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}
