// Get the logout button element
const logoutButton = document.getElementById('logout-button-chefspace');

// Add click event listener to the logout button
logoutButton.addEventListener('click', function() {
  // Remove credentials from local storage
  localStorage.removeItem('credentials');

  // Redirect to the login page
  window.location.href = 'login.html';
});