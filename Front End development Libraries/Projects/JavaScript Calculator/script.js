document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let expression = '';
    let lastClicked = '';
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.value;
  
        if (value === 'clear') {
          expression = '';
          display.innerText = '0';
          lastClicked = '';
        } else if (value === 'equals') {
          try {
            const result = eval(expression.replace(/--/g, '+'));
            display.innerText = result;
            expression = result.toString();
            lastClicked = 'equals';
          } catch (error) {
            display.innerText = 'Error';
            expression = '';
          }
        } else if (['+', '-', '*', '/'].includes(value)) {
          if (['+', '*', '/'].includes(lastClicked)) {
            if (value === '-') {
              expression += value;
            } else {
              expression = expression.slice(0, -1) + value;
            }
          } else if (lastClicked === '-') {
            if (['+', '*', '/'].includes(expression.slice(-2, -1))) {
              expression = expression.slice(0, -2) + value;
            } else {
              expression += value;
            }
          } else {
            expression += value;
          }
          lastClicked = value;
        } else if (value === '.') {
          const lastNumber = expression.split(/[\+\-\*\/]/).pop();
          if (!lastNumber.includes('.')) {
            expression += value;
          }
          lastClicked = value;
        } else {
          if (lastClicked === 'equals') {
            expression = value;
          } else {
            if (expression === '0') {
              expression = value;
            } else {
              const lastNumber = expression.split(/[\+\-\*\/]/).pop();
              if (lastNumber === '0' && value === '0') {
              } else if (lastNumber === '0' && !['+', '-', '*', '/'].includes(lastClicked)) {
                expression = expression.slice(0, -1) + value;
              } else {
                expression += value;
              }
            }
          }
          lastClicked = value;
        }
  
        display.innerText = expression || '0';
      });
    });
  });
  