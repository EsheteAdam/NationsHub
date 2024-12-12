import { fetchAllCountries } from "./apiService.js";

const init = () => {
    getAllCountries();
};

const getAllCountries = async () => {
    try {
        await fetchAllCountries();
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
};

init(); // מתחיל את הפעולה מיד לאחר טעינת הדף
