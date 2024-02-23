//this is the simpler version of building a binary decimal converter;

const decimalToBinary = (input) => { 
  const inputs = [];
  const quotients = [];
  const remainders = [];

  if (input === 0) {
    result.innerText = "0";
    return;
  }

  while (input > 0) {
    const quotient = Math.floor(input / 2);
    const remainder = input % 2;

    inputs.push(input);
    quotients.push(quotient);
    remainders.push(remainder);
    input = quotient;
  }

  console.log("Inputs: ", inputs);
  console.log("Quotients: ", quotients);
  console.log("Remainders: ", remainders);

  result.innerText = remainders.reverse().join("");
};


//another method
const decimalToBinary = (input) => {
    let binary = "";
  
    if (input === 0) {
      binary = "0";
    }
  
    while (input > 0) {
      binary = (input % 2) + binary;
      input = Math.floor(input / 2);
    }
  
    result.innerText = binary;
  };



const countDownAndUp = (number) => {
    console.log(number);
  
    if (number === 0) {
      console.log("Reached base case");
      return;
    } else {
      countDownAndUp(number - 1);
      console.log(number);
    }
  };
  
  countDownAndUp(3);