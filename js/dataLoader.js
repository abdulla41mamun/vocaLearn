function loadGroup(groupId) {
    return new Promise((resolve, reject) => {
        getData("vocabularyGroups", groupId).then((data) => {
            if (data) {
                resolve(data.words); // If data is cached in IndexedDB, return it
            } else {
                fetch(`data/group${groupId}.json`) // Fetch the corresponding group data
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Failed to load group ${groupId}.json`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        putData("vocabularyGroups", data, groupId); // Cache data in IndexedDB
                        resolve(data.words); // Return words for the group
                    })
                    .catch((err) => reject("Failed to load group data: " + err));
            }
        });
    });
}
