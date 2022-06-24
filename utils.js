function format(inputDate) {
    let date, month, year;
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
    date = date.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");
    return `${date} / ${month} / ${year}`;
}

function getMoodLabel(id) {
    const labels = {
        happy1: "Little Happy",
        happy2: "Happy",
        happy3: "Very Happy",
        sad1: "Little Sad",
        sad2: "Sad",
        sad3: "Very Sad",
        angry1: "Little Angry",
        angry2: "Angry",
        angry3: "Very Angry",
    };
    if (!labels[id.toLowerCase()]) return "";
    return labels[id.toLowerCase()];
}

async function getMoods(uid) {
    const res = await fetch("/api/db?uid=" + encodeURI(uid));
    const docs = await res.json();
    docs.map((doc) => {
        doc.timestamp = format(new Date(doc.timestamp.seconds * 1000));
    });
    docs.sort((a, b) => {
        return a.timestamp - b.timestamp;
    });
    docs.reverse();
    return docs;
}

async function addMood(data) {
    const res = await fetch("/api/db", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.status !== 200) {
        return { success: false };
    }
    return { success: true };
}

async function deleteMood(id) {
    const res = await fetch("/api/db?id=" + encodeURI(id), {
        method: "DELETE",
    });
    if (res.status !== 200) {
        return { success: false };
    }
    return { success: true };
}

async function updateMood(id, data) {
    const res = await fetch("/api/db?id=" + encodeURI(id), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.status !== 200) {
        return { success: false };
    }
    return { success: true };
}

export { format, getMoods, addMood, deleteMood, updateMood, getMoodLabel };
