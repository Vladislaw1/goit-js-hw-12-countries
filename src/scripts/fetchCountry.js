
export default function onFetchCountry(nameCountry) {
    return fetch(`https://restcountries.eu/rest/v2/name/${nameCountry}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error")
            }
           return response.json();
        })
}
