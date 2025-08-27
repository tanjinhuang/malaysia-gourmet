// Logout button function
document.getElementById("logoutBtn").addEventListener("click", function () {
  // Clear session data
  sessionStorage.clear();
  localStorage.clear();

  // Clear cookies
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect to login page
  window.location.href = "login.html";
});
