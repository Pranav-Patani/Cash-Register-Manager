const billInput = document.querySelector(`.bill-input`);
const cashInput = document.querySelector(`.cash-input`);
const button = document.querySelector(`.button`);
const errorMessage = document.querySelector(`.error-message`);
const message = document.querySelector(`.message`);
const notesRequired = document.querySelectorAll(`.notes-required`);
const notesAvailable = [2000, 500, 100, 50, 20, 10, 5, 1];
const buttonNext = document.querySelector(`.next-button`);
const billValidation = document.querySelector(`.bill-validation`);
const cashLabel = document.querySelector(`.cash-label`);
const currencyTable = document.querySelector(`.currency-table`);

billValidation.style.display = "none";
cashLabel.style.display = "none";
cashInput.style.display = "none";
button.style.display = "none";
currencyTable.style.display = "none";

function billValidator() {
  const bill = Number(billInput.value);

  if (bill < 0 || bill === 0) {
    billValidation.style.display = "block";
    billValidation.style.color = "red";
    billValidation.innerText = `Invalid Bill Amount! The bill amount must be greater than 0!`;
  } else {
    cashLabel.style.display = "block";
    cashInput.style.display = "initial";
    button.style.display = "initial";
  }
}

buttonNext.addEventListener("click", billValidator);

function clickValidator() {
  hideMessage();
  const bill = Number(billInput.value);
  const cash = Number(cashInput.value);

  if (cash < 0 || bill < 0) {
    showErrorMessage(`Negative values detected! Please fill positive values.`);
  } else if (billInput.value == ` || cashInput.value == `) {
    showErrorMessage(`Please fill both the values correctly`);
  } else if (bill > 0) {
    if (cash > bill) {
      currencyTable.style.display = "table";
      const returnAmount = cash - bill;
      calculateChange(returnAmount);
      showMessage(`Amount to be returned: ${returnAmount}`);
    } else if (cash === bill) {
      showMessage(`The bill is paid and no return is required.`);
    } else {
      showErrorMessage(
        `The bill amount paid is less than the actual bill amount. Pay more!`
      );
    }
  } else {
    showErrorMessage(`Please fill both the values correctly`);
  }
}

button.addEventListener(`click`, clickValidator);

function hideMessage() {
  errorMessage.style.display = `none`;
  message.style.display = `none`;
}

function calculateChange(returnAmount) {
  for (let i = 0; i < notesAvailable.length; i++) {
    const requiredNotes = Math.trunc(returnAmount / notesAvailable[i]);
    returnAmount %= notesAvailable[i];
    notesRequired[i].innerText = requiredNotes;
  }
}

function showErrorMessage(msg) {
  errorMessage.style.display = `block`;
  errorMessage.innerText = msg;
}

function showMessage(msg) {
  message.style.display = `block`;
  message.innerText = msg;
}
