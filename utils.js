function format(inputDate) {
    let date, month, year;
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
    date = date.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");
    return `${date}/${month}/${year}`;
}

async function getMoods(uid) {
    const res = await fetch('/api/db?action=get&uid=' + encodeURI(uid));
    const docs = await res.json();
    docs.map(doc => {
        doc.timestamp = format(new Date(doc.timestamp.seconds * 1000))
    })
    return docs;
}

async function addMood(data) {
    const res = await fetch('/api/db?action=add', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    if (res.status !== 200) {
        return {added: false};
    } return {added: true};
}

async function deleteMood(id) {
    const res = await fetch('/api/db?action=delete&id=' + encodeURI(id), {
        method: 'DELETE',
    });
    if (res.status !== 200) {
        return {deleted: false};
    } return {deleted: true};
}

export { format, getMoods, addMood, deleteMood };