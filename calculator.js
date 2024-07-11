let screen = document.querySelector('#cal-screen')
let screenValue = screen.textContent
let firstValue = 0
let previousOperator = null
let watingForSecondValue = false

function inputDigit(digit) {
  if (watingForSecondValue) {
    watingForSecondValue = false
    screenValue = digit
  } else {
    screenValue = screenValue === '0' ? digit : screenValue + digit
  }
  updateScreenDislay()
  calculate()
}

function inputDecial() {
  if (watingForSecondValue) {
    inputDigit ('.')
  }
  if (!screenValue.includes('.')) {
    screenValue = screenValue + '.'
  }
  updateScreenDislay()
  handleOperator()
}-

function toogleSign() {
  screenValue = screenValue * -1
  if(watingForSecondValue) {
    firstValue = screenValue
  }
  updateScreenDislay()
}

function getSquareRoot() {
  screenValue = Math.sqrt(screenValue)
  firstValue = screenValue
  updateScreenDislay()
}

function clearEntry() {
  screenValue = screenValue.slice(0, -1)

  /* 
    The slice() method returns selected elements in an array, as a new array.
    The slice() method selects from a given start, up to a (not inclusive) given end.
    The slice() method does not change the original array.
  */

  if (screenValue.length === 0) {
    screenValue = '0'
  }
  updateScreenDislay()
}

function allClear() {
  firstValue = 0
  screenValue = '0'
  updateScreenDislay()
}

function handleOperator(currentOperator) {
  if (watingForSecondValue) {
    previousOperator = currentOperator;
    return;
  }
  firstValue = calculate(firstValue, previousOperator, parseFloat(screenValue))

  // The parseFloat() method parses a value as a string and returns the first number.
  // If the first character cannot be converted, NaN is returned.
  // Leading and trailing spaces are ignored.
  // Only the first number found is returned.

  screenValue = firstValue
  previousOperator = currentOperator
  watingForSecondValue = true
  updateScreenDislay()
}

function calculate(first, operator, second) {
  if (operator === '+') return first + second
  if (operator === '-') return first - second
  if (operator === '*') return first * second
  if (operator === '/') return first / second

  return second
}

function updateScreenDislay() {
  screen.textContent = screenValue
}