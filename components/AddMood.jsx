import { getMoods, addMood } from "../utils";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import Loading from "./Loading";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch } from "react-redux";
import { setMoods } from '../features/moodsSlice';

export default function AddMood({ uid }) {
    const moodLevels = ["Happy3", "Happy2", "Happy1", "Sad1", "Sad2", "Sad3"];
    const [selectedMood, setSelectedMood] = useState(null);
    const [reason, setReason] = useState(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    function setMoodLevel(e) {
        e.preventDefault();
        setSelectedMood(e.target.innerText);
    }

    async function sendData() {
        if (!selectedMood) {
            return Notify.failure("Please select a mood");
        }

        const data = {
            mood: selectedMood,
            reason: reason,
            timestamp: Timestamp.now(),
            uid: uid,
        };

        setSelectedMood(null);
        document.getElementById("reason").value = "";
        setLoading(true);

        const res = await addMood(data);
        if (res.success) {
            Notify.success("Mood updated successfully");
        } else {
            Notify.failure("There was an error updating the mood");
        }
        const moodsList = await getMoods(uid);
        dispatch(setMoods(moodsList));
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
            <div className="add-mood">
                <div className="mood-levels">
                    {moodLevels.map((mood, index) => {
                        return (
                            <div
                                onClick={setMoodLevel}
                                className={
                                    "mood-level" +
                                    (selectedMood === mood
                                        ? " selected"
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
