const textInput = document.getElementById('text-input');
const checkBtn = document.getElementById('check-btn');
const resultDiv = document.getElementById('result');

checkBtn.addEventListener('click', function() {
  const text = textInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (text === '') {
    alert('Please input a value');
  } else {
    const reversedText = text.split('').reverse().join('');
    if (text === reversedText) {
      resultDiv.textContent = textInput.value + ' is a palindrome';
    } else {
      resultDiv.textContent = textInput.value + ' is not a palindrome';
    }
  }
});
