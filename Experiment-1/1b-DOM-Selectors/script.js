// Select element by ID
let heading = document.getElementById("heading");

// Select elements by class name
let paragraphs = document.getElementsByClassName("text");

// Select element using CSS selector
let button = document.querySelector("#changeBtn");

// Change heading when button is clicked
button.addEventListener("click", function() {
    heading.innerHTML = "Heading Changed Successfully!";
    paragraphs[0].innerHTML = "First paragraph changed using DOM selector.";
});