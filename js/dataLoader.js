function loadGroup(groupId) {
    return new Promise((resolve, reject) => {
        getData("vocabularyGroups", groupId).then((data) => {
            if (data) {
                resolve(data.words); // If found in IndexedDB, use the cached data
            } else {
                fetch(`data/group${groupId}.json`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch the group file");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        putData("vocabularyGroups", data, groupId); // Cache the data in IndexedDB
                        resolve(data.words); // Return the words
                    })
                    .catch((err) => reject("Failed to load group data: " + err));
            }
        });
    });
}
