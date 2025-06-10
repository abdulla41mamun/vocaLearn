let currentGroupWords = [];
let currentWordIndex = 0;

function renderCurrentWord() {
    const word = getCurrentWord(); // Get the current word object
    const totalWords = currentGroupWords.length;  // Get total words in the group
    const currentWordNumber = currentWordIndex + 1;  // Current word index (1-based)

    // Display the word number (e.g., "Word 1/60")
    displayWord(word, currentWordNumber, totalWords);  // Display word, meaning, examples
}

function getCurrentWord() {
    return currentGroupWords[currentWordIndex];  // Get the word from the array
}

// Move to the next word
function getNextWord() {
    if (currentWordIndex < currentGroupWords.length - 1) {
        currentWordIndex++;
        renderCurrentWord(); // Render the next word
    } else {
        alert("End of group reached!");
    }
}

// Move to the previous word
function getPreviousWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        renderCurrentWord(); // Render the previous word
    } else {
        alert("You are at the first word!");
    }
}
