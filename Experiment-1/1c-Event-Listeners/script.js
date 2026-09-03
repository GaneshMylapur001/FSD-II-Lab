let button = document.getElementById("myButton");
let message = document.getElementById("message");

button.addEventListener("click", function() {
    message.innerHTML = "Event Listener executed successfully!";
});