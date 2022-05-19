"use strict"
/*
#################################
### Convert Currency ###
Task: Read the doc of Frankfurter API (https://www.frankfurter.app/docs/); Convert all the inputs into amount in USD.
Input: Array of Objects. Each object has 2 keys, amount and currency.

Example:
Input: [ {"amount": 15000, "currency":IDR}, {"amount": 3.1, "currency": EUR}];
Output: [1, 2.3];
##################################
*/

let checkMoney = [
  { "amount": 15000.0, "currency": "IDR" },
  { "amount": 3.1, "currency": "EUR" }
];
// Should at least return [1.02, 3.26] with similar value to [1, 2.3]. // Dynamic Rates

convertCurrency(checkMoney)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error)
  })

async function convertCurrency (array) {
  // Input validations
  const checkArray = await Promise.all(array.map(async (el) => {
    let amount = el.amount;
    let currency = el.currency;

    if (!amount || !currency) return ("Amount or Currency Code cannot be empty!");
    if (amount <= 0) return ("Amount minimum is 1!")
    if (isNaN(amount) || typeof amount !== "number") return ("Amount should be in integer!");
    if (!isNaN(currency) || currency.length !== 3) return ("Currency format should be in 3-letter currency code!");

    const checkForCurrency = await currencies(currency);
    if (!checkForCurrency) return ("Currency is not registered");

    const conversionResult = await conversion(amount, currency)
    return conversionResult;
  }));

  return checkArray;
};

// Async function conversion
async function conversion(amount, currency) {
  return new Promise((resolve, reject) => {
    const host = 'api.frankfurter.app'
    const https = require('https')

    const req = https.get(`https://${host}/latest?amount=${amount}&from=${currency}&to=USD`, (res) => {
      let body = '';

      res.on('data', (chunk) => (body += chunk));
      res.on('error', reject);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          const response = Number(JSON.parse(body).rates.USD.toFixed(2));
          resolve(response);
        } else {
          let output = "There is a problem with the server, please try again later.";
          reject(output);
        };
      });
    });

  req.on('error', reject);
  req.end();
  });
};

// Async function check currency
async function currencies(currency) {
  return new Promise((resolve, reject) => {
    const host = 'api.frankfurter.app';
    const https = require('https');

    const req = https.get(`https://${host}/currencies`, (res) => {
      let body = '';

      res.on('data', (chunk) => (body += chunk));
      res.on('error', reject);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          const currencies = JSON.parse(body);
          if (currency in currencies) {
            resolve(true);
          } else {
            resolve(false);
          };
        } else {
          let output = "There is a problem with the server, please try again later.";
          reject(output);
        };
      });
    });

  req.on('error', reject);
  req.end();
  });
};

// ## -- Test cases --
// testCases()
// function testCases () {
//   let checkMoney2 = [
//     { "amount": -15000.0, "currency": "IDR" },
//     // 'Amount minimum is 1!'
//     { "amount": 3.1, "currency": "EUR" },
//     // 3.26
//     { "amount": 20000000.000, "currency": "IDR"},
//     // 1362.55
//     { },
//     // 'Amount or Currency Code cannot be empty!'
//     { "amount": "ABC", "currency": "IDRR" },
//     // 'Amount should be in integer!',
//     { "amount": 100000, "currency": "IDRR" },
//     // 'Currency format should be in 3-letter currency code!',
//     { "amount": "10000", "currency": "IDR" },
//     // 'Amount should be in integer!',
//     { "amounts": 10000, "currencys": "IDR"},
//     // 'Amount or Currency Code cannot be empty!'
//     { "amount": "", "currency": "IDR"},
//     // 'Amount or Currency Code cannot be empty!'
//     { "amount": 20, "currency": "SDD"}
//     // 'Currency is not registered'
//   ];
  
//   convertCurrency(checkMoney2)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// };