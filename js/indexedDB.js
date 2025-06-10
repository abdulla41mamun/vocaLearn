let db;

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("VocabularyApp", 1);

        request.onupgradeneeded = (e) => {
            db = e.target.result;
            if (!db.objectStoreNames.contains("vocabularyGroups")) {
                db.createObjectStore("vocabularyGroups", { keyPath: "id" });
            }
        };

        request.onsuccess = (e) => {
            db = e.target.result;
            resolve();
        };

        request.onerror = (e) => reject("Database Error: " + e.target.errorCode);
    });
}

function getData(storeName, key) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject("Error fetching data: " + e.target.errorCode);
    });
}

function putData(storeName, data, key) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.put(data, key);

        request.onsuccess = () => resolve();
        request.onerror = (e) => reject("Error saving data: " + e.target.errorCode);
    });
}
