// Select the hamburger and the menu
const navbar = document.getElementById('navbar');
const navbarHamburger = document.getElementById('navbar__hamburger');
const navbarRight = document.getElementById('navbar__right');
const navbarButtonAddTrip = document.getElementById('navbar__button--add');

// Toggle hamburger meny when clicked
navbarHamburger.addEventListener('click', () => {
    navbarRight.classList.toggle('show');
});

// Remove the hamburger meny when mouse leaves navbar
navbar.addEventListener('mouseleave', () => {
    navbarRight.classList.remove('show');
});

// Go to add-trip.html when "Add Trip" button clicked
navbarButtonAddTrip.addEventListener('click', () => {
    window.location.href = 'add-trip.html';
});