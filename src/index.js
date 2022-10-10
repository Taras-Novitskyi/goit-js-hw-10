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
}

function renderCountryList(countries) {
	let markupCountryList = '';
	let markupCountryInfo = '';

    if (countries.length > 10) {
    	Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
		);
		createMarkup('', '');
    	return;
	}
	
	if (countries.length === 1) {
		markupCountryInfo = countryInfoTpl(countries[0]);
		markupCountryList = countryCardTpl(countries[0]);

		createMarkup(markupCountryList, markupCountryInfo);
		refs.countryList.classList.add('large');
    } else {
        refs.countryList.classList.remove('large');
    }
	
	if (countries.length >= 2 && countries.length <= 10) {
		countries.map(country => markupCountryList += countryCardTpl(country));
		createMarkup(markupCountryList, '');
	}

	const spanLanguagesEl = document.querySelector('.languages-list');
	if (spanLanguagesEl) {
    	spanLanguagesEl.textContent = spanLanguagesEl.textContent.slice(0, -2);
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