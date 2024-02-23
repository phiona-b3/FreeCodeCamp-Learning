//In JavaScript, there are many built-in constructors that create objects. A constructor is like a regular function, but starts with a capital letter, and is initialized with the new operator.

// .getDate() method, which returns a number between 1 and 31 that represents the day of the month for that date.

//The .getMonth() method returns a number between 0 and 11.

//The .getFullYear() method returns a number which represents the year for the provided date.

//The .getHours() method returns a number between 0 and 23. This represents the hour for the provided date, where 0 is midnight and 23 is 11 p.m.

//The .getMinutes() method returns a number between 0 and 59 which represents the minutes for the provided date.

//In JavaScript, the textContent property is used to both get and set the text of a node.

//In JavaScript, the change event is used to detect when the value of an HTML element has changed:

//A switch statement is used to compare an expression against multiple possible values and execute different code blocks based on the match. It's commonly used for branching logic.

//Split formattedDate into an array of substrings with the .split() method and use a "-" as the separator.

//The .reverse() method is used to reverse an array in place. For example:

//The break statement will tell the JavaScript interpreter to stop executing statements. Without adding a break statement at the end of each case block, the program will execute the code for all matching cases

//In a switch statement, the default case is executed when none of the previous case conditions match the value being evaluated. It serves as a catch-all for any other possible cases.

const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

const formattedDate = `${day}-${month}-${year}`;
currentDateParagraph.textContent = formattedDate;

dateOptionsSelectElement.addEventListener("change", () => {

  switch (dateOptionsSelectElement.value) {
    case "yyyy-mm-dd":
      currentDateParagraph.textContent = formattedDate
        .split("-")
        .reverse()
        .join("-");
      break;
    case "mm-dd-yyyy-h-mm":
      currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
      break;
    default:
      currentDateParagraph.textContent = formattedDate;
  }
});

