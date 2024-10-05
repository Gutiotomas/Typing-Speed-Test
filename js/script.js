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

function endTest() {
    if (!isTestRunning) return; // Prevent ending the test if it's not running

    var userTypedText = document.getElementById("userInput").value;

    isTestRunning = false; // Mark test as not running
    endTime = new Date().getTime();

    // Disable user input
    document.getElementById("userInput").readOnly = true;

    // Calculate time elapsed and words per minute (WPM)
    var timeElapsed = (endTime - startTime) / 1000; // in seconds
    var typedWords = userTypedText.split(/\s+/).filter(function (word) {
        return word !== "";
    }).length;
    var totalLength = userTypedText.length;

    var wpm = 0; // Default value
    if (timeElapsed !== 0 && !isNaN(typedWords)) {
        wpm = Math.round((typedWords / timeElapsed) * 60);
    }
    var accuracy = calculateAccuracy(userTypedText, testText);

    // Display the results
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML =
        "<h2>Typing Test Results:</h2>" +
        "<p>Total Length: " + totalLength + "</p>" +
        "<p>Words Typed: " + typedWords + "</p>" +
        "<p>Time Elapsed: " + timeElapsed.toFixed(2) +" seconds</p>" +
        "<p>Words Per Minute (WPM): " + wpm + "</p>" + 
        "<p>Precision: " + accuracy.toFixed(2) + "%</p>";

    var speedDiv = document.getElementById("speed");

    // Check the conditions for wpm and accuracy
    if (wpm <= 35 && accuracy <= 70) {
    speedDiv.innerHTML = "<p>You are a beginner, keep practicing!</p>";
    } else if (wpm > 35 && wpm <= 50 && accuracy <= 80) {
        speedDiv.innerHTML = "<p>You type fast but with low precision, focus on accuracy!</p>";
    } else if (wpm > 35 && wpm <= 70 && accuracy > 80) {
        speedDiv.innerHTML = "<p>You are an intermediate typist with good speed and accuracy!</p>";
    } else if (wpm > 70 && wpm <= 90 && accuracy >= 90) {
        speedDiv.innerHTML = "<p>You are an advanced typist with excellent speed and precision!</p>";
    } else if (wpm > 90 && accuracy >= 95) {
        speedDiv.innerHTML = "<p>You are a professional typist with top-level speed and accuracy!</p>";
    } else {
        speedDiv.innerHTML = "<p>Keep practicing to improve your speed and accuracy!</p>";
    }

    // Hide End Test button and show Restart button
    var endButton = document.getElementById("btnEnd");
    endButton.style.display = "none";
    var restartButton = document.getElementById("btnRestart");
    restartButton.style.display = "block"; // Show Restart button

    // Remove Enter key listener after test ends
    document.removeEventListener("keydown", handleEnterKey);
}

function restartTest() {
    isTestRunning = false; // Reset test state
    // Clear inputs and results
    document.getElementById("userInput").value = "";
    document.getElementById("output").innerHTML = "";
    document.getElementById("speed").innerHTML = "";
    document.getElementById("inputText").innerText = "";
    document.getElementById("userInput").readOnly = true;

    // Show Start Test button again and hide End Test and Restart buttons
    var startButton = document.querySelector("button[onclick='startTest()']");
    startButton.style.display = "block";

    var endButton = document.getElementById("btnEnd");
    endButton.style.display = "none"; // Hide the End Test button until the test starts again
    var restartButton = document.getElementById("btnRestart");
    restartButton.style.display = "none"; // Hide the Restart Test button initially
}

function handleEnterKey(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default Enter behavior
        endTest();
    }
}

function calculateAccuracy(userText, originalText) {
    // Compare character by character
    var correctChars = 0;
    var totalChars = originalText.length;

    // Loop through each character in the user's text
    for (var i = 0; i < userText.length && i < totalChars; i++) {
        if (userText[i] === originalText[i]) {
            correctChars++;
            if (i === totalChars - 1) {
                // If the last character matches, check if the user has typed extra characters
                correctChars -= userText.length - totalChars;
            }
        }
    }
    // Calculate accuracy as a percentage
    return (correctChars / totalChars) * 100;
}
