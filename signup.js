document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let username = document.getElementById("newUsername").value.trim();
  let password = document.getElementById("newPassword").value;

  // Username: no spaces
  if (/\s/.test(username)) {
    alert("⚠️ Username cannot contain spaces.");
    return;
  }

  // Password rules
  let passwordRule = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
  if (!passwordRule.test(password)) {
    alert("⚠️ Password must be at least 6 characters, with 1 uppercase & 1 number.");
    return;
  }

  // Check duplicate username
  if (localStorage.getItem(username)) {
    alert("⚠️ Username already exists! Please choose another.");
    return;
  }

  // Save account
  localStorage.setItem(username, password);

  // Success popup
  let popup = document.getElementById("successPopup");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
    window.location.href = "login.html";
  }, 1200);
});

// Live password validation
let newPassword = document.getElementById("newPassword");
newPassword.addEventListener("input", function () {
  let value = newPassword.value;

  document.getElementById("ruleLength").classList.toggle("valid", value.length >= 6);
  document.getElementById("ruleUpper").classList.toggle("valid", /[A-Z]/.test(value));
  document.getElementById("ruleNumber").classList.toggle("valid", /\d/.test(value));
});
