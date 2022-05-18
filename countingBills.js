"use strict"
/*
#################################
### Hitung Berapa Lembar Uang ###
Task: Anda sedang berbelanja sebuah barang, tapi penjual hanya mmeperbolehkan Anda untuk membayar dengan jumlah lembar uang yang sesuai dengan permintaannya. Buatlah sebuah function untuk menentukan pecahan mata uang yang dibutuhkan untuk membayar barang tersebut. (Menggunakan pecahan uang kertas Rupiah).
Input: harga_barang, jumlah_lembar
##################################
*/

console.log(checkMoney(17000, 1));
// Should return [20000].;

console.log(checkMoney(23000, 4));
// Should return [20000, 1000, 1000, 1000].;

function checkMoney (itemPrice, qty) {
  // Input validations
  if (!itemPrice || !qty) return "Harga barang atau Jumlah lembar tidak boleh kosong!";
  if (itemPrice < 0 || itemPrice > 100000) return "Harga barang terlalu mahal!";
  if (typeof itemPrice !== "number" || typeof qty !== "number") return "Harga barang/Jumlah lembar harus berupa angka!";
  if (qty < 0) return "Jumlah lembarannya minimum 1 lembar!"
  if (qty > 10) return "Jumlah lembarannya terlalu banyak, maksimum 10 lembar!";
  
  const moneyDenomination = [100000, 50000, 20000, 10000, 5000, 2000, 1000];
  // if (moneyDenomination.every((el) => el >= itemPrice * qty)) return
  let moneyOutput = [];

  if (qty === 1 && moneyDenomination.includes(itemPrice)) {
    moneyOutput.push(itemPrice);
  } else if (qty === 1 && !moneyDenomination.includes(itemPrice)) {
    for (let i = 0; i < moneyDenomination.length; i++) {  
      if (itemPrice > moneyDenomination[i]) {
        moneyOutput.push(moneyDenomination[i - 1]);
      };
      if (i === moneyDenomination.length - 1 && moneyOutput.length < qty) {
        moneyOutput.push(moneyDenomination[i]);
      };
      if (moneyOutput.length === qty) {
        break;
      };
    };
  } else {
    const newMoneyDenomination = moneyDenomination.filter((el) => itemPrice >= el);

    // Recursive function for permutations (Finding best combinations)
    function recursiveMoney (checkPermutation) {
      if (checkPermutation.length > qty - 1) {
        moneyOutput.push(checkPermutation);
        return;
      };

      for (let i = 0; i < newMoneyDenomination.length; i++) {
        recursiveMoney(checkPermutation.concat([newMoneyDenomination[i]]));
      };
    };

    recursiveMoney([]);
    
    // Get first result with the same number as itemPrice
    let checkResult = moneyOutput.find((el) => el.reduce((a, b) => a + b) === itemPrice);

    if (checkResult) {
      return moneyOutput.find((el) => el.reduce((a, b) => a + b) === itemPrice);
    } else {
      // Check if there is a result with less number than itemPrice
      let checkResultB = moneyOutput.find((el) => el.reduce((a, b) => a + b) <= itemPrice);
      
      // If result is unavailable (No denomination available for the qty and itemPrice)
      if (!checkResultB) return "Tidak ada pecahannya yang pas nih untuk barang seharga ini."
      
      // If result is available
      let sumNumber = checkResultB.reduce((a, b) => a + b);
      if (sumNumber !== itemPrice) {
        let missingMoney = itemPrice - sumNumber;
        let lastIndexOfCheckResult = checkResultB.pop();
        let combinedNumber = lastIndexOfCheckResult + missingMoney;
        let moneyIndex = newMoneyDenomination.findIndex((el) => el < combinedNumber);
        checkResultB.push(newMoneyDenomination[moneyIndex - 1]);
        
        return checkResultB.sort((a, b) => b - a);
      };
    };
  };

  return moneyOutput;
};

// Test Cases
// testCases();
// function testCases () {
//   console.log(checkMoney(230000, 4));
//   // // Should return "Harga barang terlalu mahal!";
//   console.log(checkMoney(23000, 11));
//   // // Should return "Jumlah lembarannya terlalu banyak, maksimum 10 lembar!";
//   console.log(checkMoney(230000, 4));
//   // Should return "Harga barang terlalu mahal!";
//   console.log(checkMoney(300, 3));
//   // Should return Tidak ada pecahannya yang pas nih untuk barang seharga ini.;
//   console.log(checkMoney(2, 10));
//   // Should return Tidak ada pecahannya yang pas nih untuk barang seharga ini.;
//   console.log(checkMoney(1, 1));
//   // Should return [ 1000 ];
//   console.log(checkMoney(100, 1));
//   // Should return [ 1000 ];
//   console.log(checkMoney());
//   // Should return "Harga barang atau Jumlah lembar tidak boleh kosong!";
//   console.log(checkMoney("100", 1));
//   // Should return "Harga barang/Jumlah lembar harus berupa angka!";
// };