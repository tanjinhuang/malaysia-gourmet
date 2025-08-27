function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;

  let storedPassword = localStorage.getItem(username);
  const successPopup = document.getElementById("successPopup");
  const errorPopup = document.getElementById("errorPopup");

  // Hide both popups before showing new one
  successPopup.classList.add("d-none");
  errorPopup.classList.add("d-none");

  if (storedPassword === null) {
    errorPopup.textContent = "❌ Username does not exist. Please sign up first!";
    errorPopup.classList.remove("d-none");
    setTimeout(() => errorPopup.classList.add("d-none"), 2500);
    return;
  }

  if (storedPassword === password) {
    sessionStorage.setItem("username", username);
    setCookie("username", username, 7);

    successPopup.textContent = "✅ Login successful! Redirecting...";
    successPopup.classList.remove("d-none");

    setTimeout(() => {
      successPopup.classList.add("d-none");
      window.location.href = "homepage.html";
    }, 1000);

  } else {
    errorPopup.textContent = "❌ Incorrect password. Try again!";
    errorPopup.classList.remove("d-none");
    setTimeout(() => errorPopup.classList.add("d-none"), 2500);
  }
});
