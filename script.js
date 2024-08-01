// // PASSWORD GENERATOR
let includeLowercase = false;
let includeUppercase = false;
let includeSymbol = false;
let includeNumber = false;

let lowerCase = "abcdefghijklmnopqrstuvwxyz";
let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let numbers = "0123456789";
let symbols = "!@#$%^&*()_+=-[]{}}|:>?<;/.";

let allowedKeys;
let password;
const generateBtn = document.getElementById("generateBtn");

const checkboxes = document.querySelectorAll('input[name="scope"]');

const passwordLbl = document.getElementById("passwordLbl");

const passwordLengthLbl = document.getElementById("passwordLength");

generateBtn.addEventListener("click", () => {
  if (isLengthValid()) {
    const passwordLength = passwordLengthLbl.value;
    password = [];
    allowedKeys = "";
    if (hasScope()) {
      checkScope();
      checkAllowedKeys();
      for (let i = 1; i <= passwordLength; i++) {
        const random = Math.floor(Math.random() * allowedKeys.length);
        password.push(allowedKeys[random]);
      }
      passwordLbl.value = `${password.join("")}`;
      copyPassword();
    }
  }
});

function checkScope() {
  if (checkboxes[0].checked) {
    includeLowercase = true;
  } else {
    includeLowercase = false;
  }

  if (checkboxes[1].checked) {
    includeUppercase = true;
  } else {
    includeUppercase = false;
  }

  if (checkboxes[2].checked) {
    includeNumber = true;
  } else {
    includeNumber = false;
  }
  if (checkboxes[3].checked) {
    includeSymbol = true;
  } else {
    includeSymbol = false;
  }
}
function checkAllowedKeys() {
  allowedKeys += includeLowercase ? lowerCase : "";
  allowedKeys += includeUppercase ? upperCase : "";
  allowedKeys += includeSymbol ? symbols : "";
  allowedKeys += includeNumber ? numbers : "";
}
function hasScope() {
  let checkCount = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });

  if (checkCount == 0) {
    passwordLbl.value = "*Select at least one composition above*";
    passwordLbl.style.color = "red";
    return false;
  } else {
    passwordLbl.style.color = "black";
    return true;
  }
}

function isLengthValid() {
  if (passwordLengthLbl.value > 24 || passwordLengthLbl.value < 6) {
    passwordLengthLbl.value = 12;
    passwordLbl.value = "*6 to 24 characters allowed*";
    passwordLbl.style.color = "red";
    return false;
  } else {
    return true;
  }
}

function copyPassword() {
  passwordLbl.select();
  document.execCommand("copy");
}
