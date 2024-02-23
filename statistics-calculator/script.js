//.map() creates a new array, instead of mutating the original array.
//The .map() method takes a callback function as its first argument. This callback function takes a few arguments, 
//The .filter() method will allow you to filter elements out of an array, creating a new array in the process.
//Much like the .map() method, the .filter() method takes a callback function
//The .reduce() method takes an array and applies a callback function to condense the array into a single value.

//Like the other methods, .reduce() takes a callback. This callback, however, takes at least two parameters. The first is the accumulator, and the second is the current element in the array. 
//The return value for the callback becomes the value of the accumulator on the next iteration.

//The .reduce() method takes a second argument that is used as the initial value of the accumulator. Without a second argument, the .reduce() method uses the first element of the array as the accumulator, which can lead to unexpected results.

// Normally, when a form is submitted, the event triggers a page refresh.
//To resolve this, add return false; after your calculate(); call in the onsubmit attribute.

//By default, the .sort() method converts the elements of an array into strings, then sorts them alphabetically. This works well for strings, but not so well for numbers. For example, 10 comes before 2 when sorted as strings, but 2 comes before 10 when sorted as numbers.
//To sort your numbers from smallest to largest, pass a callback function that takes parameters a and b, and returns the result of subtracting b from a

//The next step is to find the number in the middle of the list. If the list has an odd number of numbers, the middle number is the median. If the list has an even number of numbers, the median is the average of the two middle numbers.

//There are a few edge cases to account for when calculating the mode of a dataset. First, if every value appears the same number of times, there is no mode.
//To calculate this, you will use a Set. A Set is a data structure that only allows unique values. If you pass an array into the Set constructor, it will remove any duplicate values.

//mode is an array, so return it as a string with the .join() method.

// range, which is the difference between the largest and smallest numbers in the list.

//The variance of a series represents how much the data deviates from the mean, and can be used to determine how spread out the data are. The variance is calculated in a few steps.

//standard deviation, which is the square root of the variance.

//There is one last thing to fix. The .sort() method mutates the array it's called on. It is generally bad practice to mutate a function parameter, which array is.
//To fix this, add an empty .slice() call before your .sort() method. The empty .slice() call will make a shallow copy of the array, which you are free to mutate.

const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;

const getMedian = (array) => {
  const sorted = array.slice().sort((a, b) => a - b);
  const median =
    array.length % 2 === 0
      ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
      : sorted[Math.floor(array.length / 2)];
  return median;
}

const getMode = (array) => {
  const counts = {};
  array.forEach((el) => {
    counts[el] = (counts[el] || 0) + 1;
  })
  if (new Set(Object.values(counts)).size === 1) {
    return null;
  }
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0];
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  );
  return mode.join(", ");
}

const getRange = (array) => {
  return Math.max(...array) - Math.min(...array);
}

const getVariance = (array) => {
  const mean = getMean(array);
  const variance = array.reduce((acc, el) => {
    const difference = el - mean;
    const squared = difference ** 2;
    return acc + squared;
  }, 0) / array.length;
  return variance;
}

const getStandardDeviation = (array) => {
  const variance = getVariance(array);
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;
}

const calculate = () => {
  const value = document.querySelector("#numbers").value;
  const array = value.split(/,\s*/g);
  const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
  const mean = getMean(numbers);
  const median = getMedian(numbers);
  const mode = getMode(numbers);
  const range = getRange(numbers);
  const variance = getVariance(numbers);
  const standardDeviation = getStandardDeviation(numbers);

  document.querySelector("#mean").textContent = mean;
  document.querySelector("#median").textContent = median;
  document.querySelector("#mode").textContent = mode;
  document.querySelector("#range").textContent = range;
  document.querySelector("#variance").textContent = variance;
  document.querySelector("#standardDeviation").textContent = standardDeviation;
}