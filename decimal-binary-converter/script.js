//Your Convert button should be working now. But it could get tiring for users to enter in a number, then click that button each time they want to convert from decimal to binary. It would be much more convenient to perform the conversion when the Enter or Return key is pressed.
//The keydown event fires every time a user presses a key on their keyboard, and is a good way to add more interactivity to input elements.

// In JavaScript, some common falsy values you'll see are null, undefined, the number 0, and empty strings.

//Because the input type="number" element allows special characters like ., +, and e, users can input floats like 2.2, equations like 2e+3, or even just e, which you don't want to allow.
//A good way to check and normalize numbers in JavaScript is to use the built-in parseInt() function, which converts a string into an integer or whole number. parseInt() takes at least one argument, a string to be converted into an integer, and returns either an integer or NaN which stands for Not a Number

//Next, you need to check if the value returned by the parseInt() function is a number or not.
//To do that, you can use the isNaN() function. This function takes in a string or number as an argument, and returns true if it evaluates to NaN

//After alerting the user if the number input is empty or the value is not a number, you can use the return keyword to break out of this function early. This will prevent future code in this function from running.

//Finally, you should clear the number input by setting its value to an empty string. Then later when you convert several numbers in a row, you won't have to delete the previous number before entering the next one.
//Set the value property of numberInput to an empty string.

//binary digits are also called bits

//For the decimal to binary conversion, you need to divide input by 2 until the quotient, or the result of dividing two numbers, is 0. But since you don't know how many times you need to divide input by 2, you can use a while loop to run a block of code as long as input is greater than 0 and can be divided.
//As a reminder, a while loop is used to run a block of code as long as the condition evaluates to true, and the condition is checked before the code block is executed
//The tricky part about while loops is that, if you're not careful, they can run forever. This is called an infinite loop, and can cause your browser to crash.

//After learning a bit about the call stack and recursion, you'll refactor the decimalToBinary function to use recursion instead of a while loop.

//In computer science, a stack is a data structure where items are stored in a LIFO (last-in-first-out) manner. If you imagine a stack of books, the last book you add to the stack is the first book you can take off the stack. Or an array where you can only .push() and .pop() elements.

//The call stack is a collection of function calls stored in a stack structure. When you call a function, it is added to the top or of the stack, and when it returns, it is removed from the top / end of the stack.

//Now you'll create a function that will count down from a given number to zero using recursion.

//A recursive function is a function that calls itself over and over. But you have to be careful because you can easily create an infinite loop. That's where the base case comes in. The base case is when the function stops calling itself, and it is a good idea to write it first.

//Recursive functions also have a recursive case, which is where the function calls itself.

//When writing the recursive case, you need to remember two things:

//What is the base case?
//What is the least amount of work you need to do to get closer to the base case?
//Since the base case is when number is equal to 0, you need to call countdown() again while also lowering the value of number by 1.

//For a reliable way to convert a value into a string, even falsy values like null and undefined, you can use the String() function

//The setTimeout function takes two arguments: a callback function and a number representing the time in milliseconds to wait before executing the callback function.
//This is because the setTimeout() function is asynchronous, meaning that it doesn't stop the execution of the rest of your code. All the code in the showAnimation() function runs line by line, but because setTimeout() is asynchronous, free and Camp are logged to the console immediately, and then Code is logged to the console after a one second delay.

//One way to fix this is to use multiple setTimeout() functions. Use setTimeout() to log free to the console after half a second, or 500 milliseconds.

//While asynchronous, or async, code can be difficult to understand at first, it has many advantages. One of the most important is that it allows you to write non-blocking code.

const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: 'decimalToBinary(1) returns "1" (base case) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

const decimalToBinary = (input) => {
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

const showAnimation = () => {
  result.innerText = "Call Stack Animation";

  animationData.forEach((obj) => {
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  setTimeout(() => {
result.textContent = decimalToBinary(5)
  }, 20000);
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt)) {
    alert("Please provide a decimal number");
    return;
  }

  if (inputInt === 5) {
    showAnimation();
    return;
  }

  result.textContent = decimalToBinary(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});