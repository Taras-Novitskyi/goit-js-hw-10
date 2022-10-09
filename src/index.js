import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './js/fetchCountries';
import countryCardTpl from './templates/country-card.hbs';
import countryInfoTpl from './templates/country-info.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
	inputSearch: document.querySelector('#search-box'),
	countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),
}

refs.inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
	e.preventDefault();
	const searchResult = e.target.value.trim();

	if (!searchResult) {
		return createMarkup('', '');
	}

    API.fetchCountries(searchResult)
      .then(renderCountryList)
      .catch(onFetchError)
      .finally(() => {});
}

function renderCountryList(countries) {
	let markupCountryList = '';
	let markupCountryInfo = '';

    if (countries.length > 10) {
    	Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
		);
		createMarkup(markupCountryList, markupCountryInfo);
    	return;
    }
	
	for (let index = 0; index < countries.length; index += 1) {
		const country = countries[index];
		markupCountryList += countryCardTpl(country);

		if (countries.length === 1) {
			refs.countryList.classList.add('large');
			markupCountryInfo = countryInfoTpl(country);
		} else {
			refs.countryList.classList.remove('large');
		}
		
		createMarkup(markupCountryList, markupCountryInfo);
    }
}

function createMarkup(markupList, markupInfo) {
  refs.countryInfo.innerHTML = markupInfo;
  refs.countryList.innerHTML = markupList;
}

function onFetchError(err) {
	console.log(err);
	Notiflix.Notify.failure('Oops, there is no country with that name');
	createMarkup('', '');
}