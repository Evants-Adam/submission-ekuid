"use strict"
/*
#################################
### Calculate Mean and Median ###
Task: Calculate mean (AVERAGE) and median (MIDDLE VALUE) for each part.
Input: Array of integers which will contain many parts. Each part is sorted by ascending order.

Example:
Input: [3, 4, 6, 17, 25, 21, 23];
Output: [
  { mean: 11, median: 6 }, // [3, 4, 6, 17, 25];
  { mean: 22, median: 22 } // [21, 23]
];
##################################
*/

let arrTest1 = [3, 4, 6, 17, 25, 21, 23];
console.log(countMeanAndMedian(arrTest1));
/* Should return..
[ 
  { mean: 11, median: 6 }, 
  { mean: 22, median: 22 } 
]
*/

let arrTest2 = [1, 2, 3, 5, 10, 20, -1, 0, 1, 0, 2, 3];
console.log(countMeanAndMedian(arrTest2));
/* Should return..
[
  { mean: 6.83, median: 4 },
  { mean: 0, median: 0 },
  { mean: 1.67, median: 2 }
]
*/

function countMeanAndMedian (arr) {
  // Input validations
  if (!Array.isArray(arr)) return "Input has to be an array of integers!";
  if (arr.some(isNaN) || arr.some((el) => typeof el !== "number")) return "Array can only contain integers!"
  if (arr.length === 0) return "Array must contain at least 1 value!";

  const splitArray = splitPart(arr);
  let outputArr = [];
  
  splitArray.forEach((arr) => {
    const resultMean = countMean(arr);
    const resultMedian = countMedian(arr);

    outputArr.push({ mean: Number(resultMean.toFixed(2)), median: Number(resultMedian.toFixed(2)) });
  });

  return outputArr;
}

// Function to split array to parts
function splitPart (arr) {
  let outputArr = [];
  let outputB = [];

  arr.forEach((el, index) => {
    if (el <= arr[index + 1]) {
      outputB.push(el);
    } else {
      outputB.push(el);
      outputArr.push(outputB);
      outputB = [];
    }
  });
  
  return outputArr;
};

// Function to count mean (AVERAGE)
function countMean (arr) {
  const sum = arr.reduce((a, b) => a + b);
  const x = arr.length;
  return sum / x;
};

// Function to count median (MIDDLE VALUE)
function countMedian (arr) {
  if (arr.length % 2 !== 0) {
    return arr[Math.floor(arr.length / 2)];
  } else {
    return ((arr[arr.length / 2] + arr[(arr.length / 2) - 1]) / 2);
  };
};

// ## -- Test cases --
// testCases()
// function testCases () {
//   let arrTest3 = {};
//   console.log(countMeanAndMedian(arrTest3));
//   // Should return "Input has to be an array!"
  
//   let arrTest4 = [1, 3, -1, -100, "a", "asd", "001"];
//   console.log(countMeanAndMedian(arrTest4));
//   // Should return "Array can only contain integers!"
  
//   let arrTest5 = [];
//   console.log(countMeanAndMedian(arrTest5));
//   // Should return "Array must contain at least 1 number!"
  
//   let arrTest6 = [1,2,23, {asd: 1}];
//   console.log(countMeanAndMedian(arrTest6));
//   // Should return "Array can only contain integers!"
  
//   let arrTest7 = [{}, {}];
//   console.log(countMeanAndMedian(arrTest7));
//   // Should return "Array can only contain integers!"
  
//   let arrTest8 = [[1, 2], {}];
//   console.log(countMeanAndMedian(arrTest8));
//   // Should return "Array can only contain integers!"
  
//   let arrTest9 = ["123", 1, "001"]
//   console.log(countMeanAndMedian(arrTest9));
//   // Should return "Array can only contain integers!"

//   let arrTest10 = [0, 2, 3, 4]
//   console.log(countMeanAndMedian(arrTest10));
//   // Should return [ { mean: 2.25, median: 2.5 } ]
// }