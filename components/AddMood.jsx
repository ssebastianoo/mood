import { getMoods, addMood } from "../utils";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import Loading from "./Loading";

export default function AddMood({ setMoods, uid }) {
    const moodLevels = ["Happy3", "Happy2", "Happy1", "Sad1", "Sad2", "Sad3"];
    const [selectedMood, setSelectedMood] = useState(null);
    const [reason, setReason] = useState(null);
    const [loading, setLoading] = useState(false);

    function setMoodLevel(e) {
        e.preventDefault();
        setSelectedMood(e.target.innerText);
    }

    async function sendData() {
        const data = {
            mood: selectedMood,
            reason: reason,
            timestamp: Timestamp.now(),
            uid: uid,
        };

        setSelectedMood(null);
        document.getElementById("reason").value = "";
        setLoading(true);

        await addMood(data);
        const moodsList = await getMoods(uid);
        setMoods(moodsList);
        setLoading(false);
    }

    function check(e) {
        if (e.code) {
            if (e.code != "Enter") return;
        }

        if (!selectedMood) return alert("Select a mood!");
        if (reason.trim() === "") setReason(null);

        sendData();
    }

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div className="add-mood my-5 flex flex-col items-center">
                <div className="flex gap-2 justify-center flex-wrap mb-5">
                    {moodLevels.map((mood, index) => {
                        return (
                            <div
                                onClick={setMoodLevel}
                                className={
                                    "bg-orange-200 text-stone-800 p-1 rounded-md cursor-pointer duration-30" +
                                    (selectedMood === mood
                                        ? " border-2 border-white"
                                        : "")
                                }
                                key={index}
                            >
                                <p>{mood}</p>
                            </div>
                        );
                    })}
                </div>
                <input
                    onKeyDown={check}
                    onChange={(e) => {
                        setReason(e.target.value);
                    }}
                    className="w-40 text-black"
                    type="text"
                    placeholder="Reason"
                    id="reason"
                />
                <button onClick={sendData}>Enter</button>
            </div>
        );
    }
}
