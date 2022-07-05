import { getMoods, addMood } from "../utils";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import Loading from "./Loading";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch, useSelector } from "react-redux";
import { setMoods, setAddingMood } from "../features/moodsSlice";

export default function AddMood() {
    const moodLevels = [
        {
            label: "Happy",
            image: "./mood-levels/Happy.png",
            moods: ["happy1", "happy2", "happy3"],
        },
        {
            label: "Sad",
            image: "./mood-levels/Sad.png",
            moods: ["sad1", "sad2", "sad3"],
        },
        {
            label: "Angry",
            image: "./mood-levels/Angry.png",
            moods: ["angry1", "angry2", "angry3"],
        },
    ];

    const labels = ["Just a little", "Normally", "A lot"];

    const [selectedMood, setSelectedMood] = useState(null);
    const [reason, setReason] = useState(null);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState(null);
    const [phase, setPhase] = useState(1);

    const dispatch = useDispatch();
    const uid = useSelector((state) => state.moods.uid);
    const addingMood = useSelector((state) => state.moods.addingMood);

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

        setPhase(1);
        setSelectedMood(null);
        dispatch(setAddingMood(false));
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
        if (e.code && e.code == "Enter") {
            if (!selectedMood) return alert("Select a mood!");
            if (reason.trim() === "") setReason(null);
            sendData();
        }
    }

    function Back() {
        return (
            <div className="w-[90%]">
                <button
                    onClick={() => {
                        if (phase === 1) {
                            dispatch(setAddingMood(false));
                        } else {
                            setPhase(phase - 1);
                        }
                    }}
                >
                    back
                </button>
            </div>
        );
    }

    function Title() {
        switch (phase) {
            case 1:
                return <h3>How are you feeling today?</h3>;
            case 2:
                return <h3>How much?</h3>;
            case 3:
                return <h3>Why?</h3>;
        }
    }

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div className="add-mood">
                {!addingMood ? (
                    <div className="w-full h-48 flex items-center justify-center">
                        <button
                            onClick={() => dispatch(setAddingMood(true))}
                            className="bg-gradient-to-r from-purple-light to-turquoise text-3xl p-3 rounded-lg shadow-3xl w-60"
                        >
                            Add Mood
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[92vh]">
                        <div className="bg-gradient-to-r from-purple-light to-turquoise rounded-lg shadow-3xl w-[80vw] h-[90%]">
                            <div className="h-[15%] p-2">
                                <div className="flex h-[30%]">
                                    <Back />
                                </div>
                                <div className="flex items-center justify-center h-[70%]">
                                    <Title />
                                </div>
                            </div>
                            {phase === 1 ? (
                                <div className="flex items-center justify-between flex-col h-[85%] p-5">
                                    {moodLevels.map((category, index) => {
                                        return (
                                            <div
                                                className="category-mood"
                                                key={index}
                                            >
                                                <img
                                                    src={category.image}
                                                    width="150"
                                                    onClick={() => {
                                                        setCategory(index);
                                                        setPhase(phase + 1);
                                                    }}
                                                    alt={category.label}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <>
                                    {phase === 2 ? (
                                        <div className="flex items-center justify-center gap-20 flex-col h-[85%] p-5">
                                            {moodLevels[category].moods.map(
                                                (mood, index) => (
                                                    <div
                                                        onClick={() => {
                                                            {
                                                                setSelectedMood(
                                                                    mood
                                                                );
                                                                setPhase(
                                                                    phase + 1
                                                                );
                                                            }
                                                        }}
                                                        className={
                                                            "mood-level" +
                                                            (selectedMood ===
                                                            mood
                                                                ? " selected"
                                                                : "")
                                                        }
                                                        key={index}
                                                    >
                                                        <button className="bg-red p-2 rounded-md">
                                                            {labels[index]}
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-full flex justify-center items-center flex-col">
                                            <textarea
                                                onKeyDown={check}
                                                onChange={(e) => {
                                                    setReason(e.target.value);
                                                }}
                                                className="w-[90%] h-[200px] text-white bg-[rgba(0,0,0,0.5)] rounded-md p-2 mb-5 outline-none shadow-solid"
                                                type="text"
                                                placeholder="Reason"
                                                id="reason"
                                            />
                                            <button
                                                onClick={sendData}
                                                className="w-[90%] bg-red p-2 rounded-md shadow-3xl"
                                            >
                                                Enter
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
