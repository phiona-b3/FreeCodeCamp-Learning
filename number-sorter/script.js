//In computer science, there are fundamental sorting algorithms that all developers should learn. In this number sorter project, you'll learn how to implement and visualize different sorting algorithms 
//like bubble sort, selection sort, and insertion sort – all with JavaScript.
//This project will help you understand the fundamental concepts behind these algorithms, and how you can apply them to sort numerical data in web applications.


const sortButton = document.getElementById("sort");

//You will be using this as an event listener for the sortButton. Because buttons associated with a form element submit by default, you need to prevent that behavior. Call event.preventDefault() in your function to do this.
const sortInputArray = (event) => {
  event.preventDefault();

  //Remember that .getElementsByClassName() returns an array-like object(a node list). You can use the spread operator to convert it into an array.
  //You need to get the values from your select elements. However, these values are strings, and you need them to be numbers.
  //Since you have an array, you can use the map method to convert each value to a number. Do this by passing a callback function to map that takes a dropdown parameter and returns Number(dropdown.value).
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  updateUI(sortedValues);
}

//Because you will be writing algorithms that won't immediately have a return value, set a fallback value for array to be an empty array.
//To perform an action on each element in the array, use the method that is meant for iterating over arrays.
//Use the forEach() method, and pass it an empty callback which takes num and i as the parameters.
const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  })
}

//The first sorting algorithm you will implement is the bubble sort, which starts at the beginning of the array and 'bubbles up' unsorted values towards the end, iterating through the array until it is completely sorted.
//Because you need to compare elements, you'll need to use a nested for loop. This loop should iterate through every element in the array except the last one. Use j as your inner loop's iterator variable.
//To achieve the "bubble up" result, you need to check if the current element is larger than the next element. You can do this by accessing the array at j and j+1.
//Create an if condition that checks if the current element is larger than the next element.
//When your if condition is true, you need to swap the two elements, "bubbling" the larger element up toward the end of the array.
const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  return array;
}

//Time to implement another sorting algorithm. This time, you'll be implementing a selection sort. Selection sort works by finding the smallest value in the array, then swapping it with the first value in the array. 
//Then, it finds the next smallest value in the array, and swaps it with the second value in the array.
//It continues iterating through the array until it is completely sorted.
//A selection sort relies on tracking the index of the smallest value in the array. Declare a variable minIndex and set it to i - this ensures that if your current value is the smallest, it will be swapped with itself and not be moved. You will need to be able to reassign the value of minIndex as you iterate through the array.
const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  return array;
}

//The last sorting algorithm you will implement is the insertion sort. This algorithm works by building up a sorted array at the beginning of the list. It begins the sorted array with the first element. Then it inspects the next element and swaps it backward into the sorted array until it is in a sorted position, and so on.
//An insertion sort algorithm starts the sort at the beginning of the list, meaning the first element is already sorted. With this in mind, create a for loop that starts at the second element in the array - it should still iterate through the rest of the array.
//For this algorithm, you'll want to use a while loop. This loop needs two conditions:
//First, it should not run beyond the beginning of the array (accessed with j).
//Second, the loop should not run after it finds a value smaller than the current value.
//To prevent an infinite loop, decrement j inside your loop
//On each iteration of your while loop, it is finding an element that is larger than your current value. You need to move that element to the right to make room for your current value.
//Do so by assigning the value at the j index to the next index
//After your while loop, you need to insert your current value. Remember that your loop ends when j is either out of the array bounds, or when the value at j is less than your current value.
//Use the assignment operator to insert your current value into the correct index.
const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }
  return array;
}


//Notice how the 10 value is placed at the beginning of the array. This is because the default behavior of .sort() is to convert the values to strings, and sort them alphabetically. And 10 comes before 2 alphabetically.
//To fix this, you can pass a callback function to the .sort() method. The callback function has two parameters - for yours, use a and b. Leave the function empty for now.
//The callback to .sort() should return a number. That number determines how to sort the elements a and b:
//If the number is negative, sort a before b.
//If the number is positive, sort b before a.
//If the number is zero, do not change the order of a and b.
//Keeping in mind that you want the numbers to be sorted in ascending order (smallest to largest), return a single subtraction calculation using a and b that will correctly sort the numbers with the above logic.

sortButton.addEventListener("click", sortInputArray);