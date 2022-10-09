const BASE_URL =  'https://restcountries.com/v3.1';

function fetchCountries(nameCountry) {
  return fetch(`${BASE_URL}/name/${nameCountry}?fields=name,capital,flags,population,languages`).then(response => {
	if (response.ok) {
    	return response.json();
 	 }
 	 throw new Error(response.status);
  });
};

export default { fetchCountries };