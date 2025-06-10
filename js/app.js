document.addEventListener("DOMContentLoaded", function () {
    // Initially show the group selection screen
    showScreen("group-selection-screen");

    // Initialize IndexedDB and render the group list once the DB is ready
    openDatabase().then(() => {
        renderGroupList(1); // Render Group 1 (or loop for more groups if needed)
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

// Rendering the list of vocabulary groups
function renderGroupList(numberOfGroups) {
    const groupListContainer = document.getElementById("group-list");
    for (let i = 1; i <= numberOfGroups; i++) {
        const button = document.createElement("button");
        button.textContent = `Group ${i}`;
        button.onclick = () => {
            initializeGroup(i); // Initialize the group when selected
            showScreen("learning-screen"); // Show the learning screen
        };
        groupListContainer.appendChild(button);
    }
}

// Show the appropriate screen
function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");
    screens.forEach((screen) => screen.style.display = "none");
    document.getElementById(screenId).style.display = "block";
}

// Initialize group by loading vocabulary data
function initializeGroup(groupId) {
    loadGroup(groupId).then((words) => {
        currentGroupWords = words; // Load the words for the selected group
        currentWordIndex = 0; // Start from the first word
        renderCurrentWord(); // Render the first word
    }).catch((err) => {
        console.error('Error loading group:', err);
    });
}
