
console.log('ygyyuguh');
const BASE_URL = 'https://restcountries.eu/rest/v2/name';
console.log(BASE_URL);

function fetchCountries(searchQuery) {
    const params = `${searchQuery}`
    return fetch(BASE_URL + params).then(response => response.json());
}
  
console.log(fetchCountries());