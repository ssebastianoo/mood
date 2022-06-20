import DeleteMood from "./DeleteMood";
import { updateMood } from "../utils";
import { useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function Mood({ mood, moods, setMoods }) {
    const [edit, setEdit] = useState(false);
    const [moodValue, setMoodValue] = useState(mood.mood);
    const [moodReason, setMoodReason] = useState(mood.reason);
    const moodLevels = ["Happy3", "Happy2", "Happy1", "Sad1", "Sad2", "Sad3"];

    async function save(e) {
        e.preventDefault();
        const res = await updateMood(mood.id, {
            mood: e.target.mood.value,
            reason: e.target.reason.value,
        });
        setMoodValue(e.target.mood.value);
        setEdit(false);

        if (res.success) {
            Notify.success("Mood updated successfully");
        } else {
            Notify.failure("There was an error updating the mood");
        }
    }

    function cancel(e) {
        e.preventDefault();
        setEdit(false);
        setMoodValue(mood.mood);
        setMoodReason(mood.reason);
    }

    return (
        <div className="bg-green-400 p-2 rounded-md shadow-3xl">
            <p>{mood.timestamp}</p>
            {edit ? (
                <div>
                    <form onSubmit={save}>
                        <select
                            name="mood"
                            className="text-black"
                            defaultValue={mood.mood}
                        >
                            {moodLevels.map((level, index) => {
                                return <option key={index} value={level}>{level}</option>;
                            })}
                        </select>
                        <br />
                        <input
                            className="text-black"
                            type="text"
                            value={moodReason}
                            name="reason"
                            onChange={(e) => {
                                setMoodReason(e.target.value);
                            }}
                        />
                        <br />
                        <button>Save</button>
                        <button onClick={cancel} className="ml-2">
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h3>{moodValue}</h3>
                    <p>{moodReason}</p>
                    <DeleteMood
                        id={mood.id}
                        moods={moods}
                        setMoods={setMoods}
                    />
                    <button className="ml-2" onClick={() => setEdit(true)}>
                        edit
                    </button>
                </div>
            )}
        </div>
    );
}
