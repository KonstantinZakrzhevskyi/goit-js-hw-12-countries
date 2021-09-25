import './css/styles.css';
import refs from './js/refs';
import API from './js/fetchCountries';

import allCountriesMarkup from './templates/allCountriesMarkup.hbs';
import countryCardMarkup from './templates/countryCardMarkup.hbs';

import { debounce } from 'lodash';
import { Notify, Loading } from 'notiflix';

const { success, warning, failure, info } = Notify;

refs.searchInput.addEventListener('input', debounce(onCountriesSearch, 1000));


function onCountriesSearch(evt) {
  API.fetchCountries(evt.target.value).then(setInputValidation).catch(fetchError)
}

function setInputValidation(country) {
  if (country.status === 404) {
    refs.countryCard.innerHTML = '';
    serverResponse(failure, 'Такой страны не существует! Введите правильное название страны!');
    return
  } else if (country.length > 10) {
    refs.countryCard.innerHTML = '';
    serverResponse(warning, 'Найдено слишком много совпадений. Введите более конкретный запрос!');
    return
  } else if (country.length > 1) {
    refs.countryCard.innerHTML = allCountriesMarkup(country);
    serverResponse(info, 'Выберите страну из списка или введите полное название');
    return
  } else if (country.length === 1) {
    refs.countryCard.innerHTML = countryCardMarkup(country);
    serverResponse(success, 'Выполнено успешно!');
    refs.searchInput.value = '';
  }
}

function fetchError(err) {
  alert({ text: 'Check the correctness of the data entered!' })
}

function serverResponse(r, message) {
  r(message);
  Loading.remove();
}
