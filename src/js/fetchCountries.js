import countryCardTpl from '../templates/country-card.hbs';
import countryInfoTpl from '../templates/country-info.hbs';

const refs = {
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`
  )
    .then(response => {
      return response.json();
    })
    .then(country => {
      let markup = '';

      for (let index = 0; index < 4; index++) {
        if (country.length === 0) {
          alert('nema');
          return;
        }

        if (country[index]) {
          const markupCountry = countryCardTpl(country[index]);
          markup += markupCountry;
          
          if (country.length === 1) {
            markup += countryInfoTpl(country[index]);
			}

		refs.countryList.innerHTML = markup;
        }
      }
    })
    .catch(err => console.log(err));
}
