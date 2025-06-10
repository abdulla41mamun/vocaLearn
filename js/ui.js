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
