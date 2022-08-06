// const fet = fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function (result) {
//   return result.json()
// })
// console.log('fet: ', fet)

const rates = {};
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementRUB = document.querySelector('[data-value="RUB"]');

const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();
async function getCurrencies() {
  const response = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  );
  const data = await response.json();
  const result = await data;

  rates.USD = result[25];
  rates.EUR = result[32];
  rates.RUB = result[18];

  console.log('result: ', result);
  console.log('rates: ', rates);

  elementUSD.textContent = rates.USD.rate.toFixed(2);
  elementEUR.textContent = rates.EUR.rate.toFixed(2);
  elementRUB.textContent = rates.RUB.rate.toFixed(2);

  if (elementUSD.textContent > 40) {
    elementUSD.classList.add('top');
  } else {
    elementUSD.classList.add('bottom');
  }
  if (elementEUR.textContent > 40) {
    elementEUR.classList.add('top');
  } else {
    elementEUR.classList.add('bottom');
  }
  if (elementRUB.textContent > 1) {
    elementRUB.classList.add('top');
  } else {
    elementRUB.classList.add('bottom');
  }
}

input.oninput = convertValue;

select.oninput = convertValue;

function convertValue() {
  result.value = (parseFloat(input.value) * rates[select.value].rate).toFixed(
    2
  );
}
