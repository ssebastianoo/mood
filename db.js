async function addData(mood, reason) {
    await fetch("/api/db?action=add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mood: mood,
        reason: reason,
      }),
    });
}

export { addData };