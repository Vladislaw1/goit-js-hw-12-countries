import { debounce } from "lodash";

import cardCountry from "../templates/countryCards.hbs";
import listCountries from "../templates/listCountries.hbs";

import refs from "./refsElDOM.js";
import fetchCountry from "./fetchCountry.js";

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

refs.input.addEventListener("input", debounce(onSearch, 500))

function onSearch(e) {
    e.preventDefault();

    const searchCountry = e.target.value;
    
    if (!this.value) {
        refs.card.innerHTML = "";
        return;
    }

    fetchCountry(searchCountry)
        .then(result => {
            if (result.length === 1) {
                refs.card.innerHTML = cardCountry(...result);
            } else if (result.length > 1 && result.length <= 10) {
                refs.card.innerHTML = listCountries(result);
            } else {
                error({
                    text: "Слишком много вариантов стран!!!!",
                    deploy: 700,
                    addClass: "error-box",
                    hide: true
          })
            }
        })
        .catch(error => console.log("Ошыбка"))
}