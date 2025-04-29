let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";
let shouldReset = false;  // Flag to indicate if the next input should start fresh

let arr = Array.from(buttons);

// Function to handle the input logic
function handleInput(value) {
  // Reset the input if the previous operation was '=' and the input is a number or a dot
  if (shouldReset && (!isNaN(value) || value === '.')) {
    string = "";
    shouldReset = false;
  }

  // Evaluate the expression on pressing '='
  if (value === '=') {
    // Check if the string ends with an operator
    if (/[+\-*/%]$/.test(string)) {
      input.value = "Error";
      string = "";
      return;
    }

    try {
      string = eval(string).toString();
      input.value = string;
      shouldReset = true;  // Set flag to reset on next input
    } catch {
      input.value = "Error";
      string = "";
    }
  } else if (value === 'AC') {
    string = "";
    input.value = string;
  } else if (value === 'DEL') {
    string = string.substring(0, string.length - 1);
    input.value = string;
  } else if ("+-*/".includes(value)) {
    // Clear the reset flag on operator entry
    shouldReset = false;

    if ("+-*/".includes(string.slice(-1))) {
      if (string.slice(-1) !== value) {
        string = string.slice(0, -1) + value;
      }
    } else {
      string += value;
    }
  } else if (value === '%') {
    const lastNumber = string.split(/[\+\-\*\/]/).pop();
    if (lastNumber && !lastNumber.includes('%')) {
      string = string.slice(0, -lastNumber.length) + (parseFloat(lastNumber) / 100).toString();
    }
  } else if (value === '.') {
    const lastNumber = string.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes('.')) {
      string += value;
    }
  } else if (!isNaN(value)) {
    string += value;
  }
  
  input.value = string;
}

// Button click event listener
arr.forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.innerHTML;
    handleInput(value);
  });
});

// Keyboard event listener
document.addEventListener('keydown', (e) => {
  let key = e.key;

  if (key === 'Enter') key = '=';
  if (key === 'Backspace') key = 'DEL';
  if (key === 'Escape') key = 'AC';

  if ("0123456789+-*/.%=DELAC".includes(key)) {
    e.preventDefault();
    handleInput(key);
  } else if (/[a-zA-Z]/.test(key)) {
    e.preventDefault();
  }
});