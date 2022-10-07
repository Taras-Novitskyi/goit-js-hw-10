import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
	inputSearch: document.querySelector('#search-box'),
	countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),
}

refs.inputSearch.addEventListener('input', debounce(onSearch, 300));

function onSearch(e) {
	fetchCountries(e.target.value);

}