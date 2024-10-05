// Array of test texts
const testTexts = [
    "The quick brown fox jumps over the lazy dog",
    "A journey of a thousand miles begins with a single step",
    "To be or not to be, that is the question",
    "All that glitters is not gold",
    "She sells seashells by the seashore",
    "The early bird catches the worm",
    "Actions speak louder than words",
    "A picture is worth a thousand words",
    "The pen is mightier than the sword",
    "Don't count your chickens before they hatch",
    "When in Rome, do as the Romans do",
    "The grass is always greener on the other side",
    "An apple a day keeps the doctor away",
    "Barking dogs seldom bite",
    "Beauty is in the eye of the beholder",
    "You can lead a horse to water, but you can't make it drink",
    "Good things come to those who wait",
    "All good things must come to an end",
    "Time and tide wait for no man",
    "A watched pot never boils",
    "Every cloud has a silver lining",
    "You can't judge a book by its cover",
    "Fortune favors the bold",
    "What doesn't kill you makes you stronger",
    "Haste makes waste",
    "A friend in need is a friend indeed",
    "A fool and his money are soon parted",
    "If it ain't broke, don't fix it",
    "Necessity is the mother of invention",
    "Life is what happens when you're busy making other plans"
];

let testText = ""; // The currently selected test text
let startTime, endTime;
let isTestRunning = false; // To track if the test is in progress

function readOnly(){
    document.getElementById("userInput").readOnly = true; 
}

window.onload = function() {
    readOnly(); // Call the function when the page loads
};

function startTest() {
    isTestRunning = true; // Mark test as running

    // Select a random test text from the array
    testText = testTexts[Math.floor(Math.random() * testTexts.length)];

    // Set the test text in the inputText field
    document.getElementById("inputText").innerText = testText;

    // Reset results and timer
    document.getElementById("output").innerHTML = "";
    startTime = new Date().getTime();

    // Hide Start Test button
    var startButton = document.querySelector("button[onclick='startTest()']");
    startButton.style.display = "none";

    // Show End Test button
    var endButton = document.getElementById("btnEnd");
    endButton.style.display = "block";
    endButton.innerHTML = "End Test";
    endButton.onclick = endTest;

    document.getElementById("userInput").readOnly = false; // Enable user input
    document.getElementById("userInput").focus(); // Focus on the typing area

    // Add Enter key listener to end test only if text matches
    document.addEventListener("keydown", handleEnterKey);
}