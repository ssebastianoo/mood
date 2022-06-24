import { getMoods, addMood } from "../utils";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import Loading from "./Loading";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch, useSelector } from "react-redux";
import { setMoods } from "../features/moodsSlice";

export default function AddMood() {
    const moodLevels = [
        {
            label: "Happy",
            moods: [
                {
                    id: "happy1",
                    label: "Little Happy",
                },
                {
                    id: "happy2",
                    label: "Happy",
                },
                {
                    id: "happy3",
                    label: "Very Happy",
                },
            ],
        },
        {
            label: "Sad",
            moods: [
                {
                    id: "sad1",
                    label: "Little Sad",
                },
                {
                    id: "sad2",
                    label: "Sad",
                },
                {
                    id: "sad3",
                    label: "Very Sad",
                },
            ],
        },
        {
            label: "Angry",
            moods: [
                {
                    id: "angry1",
                    label: "Little Angry",
                },
                {
                    id: "angry2",
                    label: "Angry",
                },
                {
                    id: "angry3",
                    label: "Very Angry",
                },
            ],
        },
    ];
    const [selectedMood, setSelectedMood] = useState(null);
    const [reason, setReason] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);

    const dispatch = useDispatch();
    const uid = useSelector((state) => state.moods.uid);

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
                <h3>How are you feeling today?</h3>
                <div className="mood-levels">
                    {category != null ? (
                        <>
                            <button onClick={() => setCategory(null)}>change category</button>
                            {moodLevels[category].moods.map((mood, index) => (
                                <div
                                    onClick={() => {
                                        setSelectedMood(mood.id);
                                    }}
                                    className={
                                        "mood-level" +
                                        (selectedMood === mood.id
                                            ? " selected"
                                            : "")
                                    }
                                    key={index}
                                >
                                    <p>{mood.label}</p>
                                </div>
                            ))}
                        </>
                    ) : (
                        moodLevels.map((category, index) => {
                            return (
                                <div className="category-mood" key={index}>
                                    <p>{category.label}</p>
                                    <img
                                        src={
                                            "/mood-levels/" +
                                            category.moods[1].id +
                                            ".png"
                                        }
                                        onClick={() => setCategory(index)}
                                        alt={category.label}
                                    />
                                </div>
                            );
                        })
                    )}
                    {/* moodLevels.map((mood, index) => {
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
                    }) */}
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
