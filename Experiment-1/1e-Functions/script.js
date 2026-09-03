// 1. Function Declaration
function functionDeclaration() {
    return "Function Declaration executed successfully!";
}

// 2. Function Definition
let functionDefinition = function() {
    return "Function Definition executed successfully!";
};

// 3. Arrow Function
let arrowFunction = () => {
    return "Arrow Function executed successfully!";
};

// Display the results
document.getElementById("output").innerHTML =
    functionDeclaration() + "<br>" +
    functionDefinition() + "<br>" +
    arrowFunction();