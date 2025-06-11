document.addEventListener("DOMContentLoaded", function () {
    // Initially show the group selection screen
    showScreen("group-selection-screen");

    // Initialize IndexedDB and render the group list (2 groups in this case)
    openDatabase().then(() => {
        renderGroupList(64); // Only 2 groups (Group 1 and Group 2)
    });

    // Event listener for Next Word
    document.getElementById("next-word-btn").addEventListener("click", function () {
        getNextWord();
    });

    // Event listener for Previous Word
    document.getElementById("previous-word-btn").addEventListener("click", function () {
        getPreviousWord();
    });
});

// Function to render group selection buttons
function renderGroupList(numberOfGroups) {
    const groupListContainer = document.getElementById("group-list");
    groupListContainer.innerHTML = ''; // Clear previous list if any

    // Loop to create buttons for the groups
    for (let i = 1; i <= numberOfGroups; i++) {
        const button = document.createElement("button");
        button.textContent = `Group ${i}`;
        button.onclick = () => {
            initializeGroup(i); // Initialize the selected group
            showScreen("learning-screen"); // Show the learning screen
        };
        groupListContainer.appendChild(button);
    }
}

// Show the appropriate screen (group selection or learning screen)
function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => screen.style.display = "none");
    document.getElementById(screenId).style.display = "block";
}

// Initialize group by loading vocabulary data
function initializeGroup(groupId) {
    loadGroup(groupId).then((words) => {
        currentGroupWords = words; // Load words for the selected group
        currentWordIndex = 0; // Start from the first word of the group
        renderCurrentWord(); // Render the first word
    }).catch((err) => {
        console.error('Error loading group:', err);
    });
}

// Render the current word and its details (word, meaning, examples)
function renderCurrentWord() {
    const word = getCurrentWord(); // Get the current word object
    const totalWords = currentGroupWords.length;  // Get total words in the group
    const currentWordNumber = currentWordIndex + 1;  // Current word index (1-based)

    // Display the word number (e.g., "Word 1/60")
    displayWord(word, currentWordNumber, totalWords);  // Display word, meaning, examples
}

// Get the current word based on the index
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

// Function to load the vocabulary data for the selected group
function loadGroup(groupId) {
    return new Promise((resolve, reject) => {
        getData("vocabularyGroups", groupId).then((data) => {
            if (data) {
                resolve(data.words); // If data is cached in IndexedDB, return it
            } else {
                fetch(`data/group${groupId}.json`) // Dynamically load the correct group file
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Failed to load group ${groupId}.json`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        putData("vocabularyGroups", data, groupId); // Cache data in IndexedDB
                        resolve(data.words); // Return words for the selected group
                    })
                    .catch((err) => reject("Failed to load group data: " + err));
            }
        });
    });
}

// Display the current word, meaning, and examples
function displayWord(wordObj, currentWordNumber, totalWords) {
    const wordDisplay = document.getElementById("word-display");
    wordDisplay.innerHTML = ""; // Clear the previous content

    // Display the word number (e.g., "Word 1/60")
    wordDisplay.innerHTML = `Word ${currentWordNumber} / ${totalWords}: <strong>${wordObj.word}</strong>`;

    // Display the word meaning
    const meaningDisplay = document.createElement("p");
    meaningDisplay.textContent = `Meaning: ${wordObj.meaning}`;
    wordDisplay.appendChild(meaningDisplay);

    // Display the example sentences
    const examplesDisplay = document.getElementById("feedback");
    examplesDisplay.innerHTML = `
        <strong>Examples:</strong>
        <ul>
            <li>${wordObj.examples[0]}</li>
            <li>${wordObj.examples[1]}</li>
        </ul>
    `;
}
