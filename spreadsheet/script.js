//learn functional programming by building a spreadsheet
//Functional Programming is a popular approach to software development.
// In Functional Programming, developers organize code into smaller functions, then combine those functions to build complex programs.

//The global window object represents the browser window (or tab). It has an onload property which allows you to define behavior when the window has loaded the entire page, including stylesheets and scripts.
//Functions are ideal for reusable logic. When a function itself needs to reuse logic, you can declare a nested function to handle that logic. Here is an example of a nested function:
//const outer = () => {
//    const inner = () => {
//   };
//  };
//Remember that the document object has a .createElement() method which allows you to dynamically create new HTML elements.

//Your array will need to be the size of the range. You can calculate this by finding the difference between end and start, and adding 1 to the result.

//The Array() constructor has a .fill() method which can be used to fill an array with a value. You can use this to fill your array with the start value.

//Remember that range() returns an array, so you can chain array methods directly to the function call.

//The concept of returning a function within a function is called currying. This approach allows you to create a variable that holds a function to be called later, but with a reference to the parameters of the outer function call.

//You can pass a function reference as a callback parameter. A function reference is a function name without the parentheses.

//You'll notice that you are not using your match parameter. In JavaScript, it is common convention to prefix an unused parameter with an underscore _. You could also leave the parameter empty like so: (, char1) but it is often clearer to name the parameter for future readability.
//Prefix your match parameter with an underscore.

//In mathematics, an infix is a mathematical operator that appears between its two operands. For example, 1 + 2 is an infix expression.
//To parse these expressions, you will need to map the symbols to relevant functions. Declare an infixToFunction variable, and assign it an empty object.

const infixToFunction = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
  }
  
  const infixEval = (str, regex) => str.replace(regex, (_match, arg1, operator, arg2) => infixToFunction[operator](parseFloat(arg1), parseFloat(arg2)));
  
  const highPrecedence = str => {
    const regex = /([\d.]+)([*\/])([\d.]+)/;
    const str2 = infixEval(str, regex);
    return str === str2 ? str : highPrecedence(str2);
  }
  
  const isEven = num => num % 2 === 0;
  const sum = nums => nums.reduce((acc, el) => acc + el, 0);
  const average = nums => sum(nums) / nums.length;
  
  const median = nums => {
    const sorted = nums.slice().sort((a, b) => a - b);
    const length = sorted.length;
    const middle = length / 2 - 1;
    return isEven(length)
      ? average([sorted[middle], sorted[middle + 1]])
      : sorted[Math.ceil(middle)];
  }
  
  const spreadsheetFunctions = {
    "": arg => arg,
    sum,
    average,
    median,
    even: nums => nums.filter(isEven),
    someeven: nums => nums.some(isEven),
    everyeven: nums => nums.every(isEven),
    firsttwo: nums => nums.slice(0, 2),
    lasttwo: nums => nums.slice(-2),
    has2: nums => nums.includes(2),
    increment: nums => nums.map(num => num + 1),
    random: ([x, y]) => Math.floor(Math.random() * y + x),
    range: nums => range(...nums),
    nodupes: nums => [...new Set(nums).values()]
  }
  
  const applyFunction = str => {
    const noHigh = highPrecedence(str);
    const infix = /([\d.]+)([+-])([\d.]+)/;
    const str2 = infixEval(noHigh, infix);
    const functionCall = /([a-z]*)\(([0-9., ]*)\)(?!.*\()/i;
    const toNumberList = args => args.split(",").map(parseFloat);
    const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
    return str2.replace(functionCall, (match, fn, args) => spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) ? apply(fn, args) : match);
  }
  
  const range = (start, end) => Array(end - start + 1).fill(start).map((element, index) => element + index);
  const charRange = (start, end) => range(start.charCodeAt(0), end.charCodeAt(0)).map(code => String.fromCharCode(code));
  
  const evalFormula = (x, cells) => {
    const idToText = id => cells.find(cell => cell.id === id).value;
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
    const elemValue = num => character => idToText(character + num);
    const addCharacters = character1 => character2 => num => charRange(character1, character2).map(elemValue(num));
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) => rangeFromString(num1, num2).map(addCharacters(char1)(char2)));
    const cellRegex = /[A-J][1-9][0-9]?/gi;
    const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase()));
    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
  }
  
  window.onload = () => {
    const container = document.getElementById("container");
    const createLabel = (name) => {
      const label = document.createElement("div");
      label.className = "label";
      label.textContent = name;
      container.appendChild(label);
    }
    const letters = charRange("A", "J");
    letters.forEach(createLabel);
    range(1, 99).forEach(number => {
      createLabel(number);
      letters.forEach(letter => {
        const input = document.createElement("input");
        input.type = "text";
        input.id = letter + number;
        input.ariaLabel = letter + number;
        input.onchange = update;
        container.appendChild(input);
      })
    })
  }
  
  const update = event => {
    const element = event.target;
    const value = element.value.replace(/\s/g, "");
    if (!value.includes(element.id) && value.startsWith('=')) {
      element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
    }
  }