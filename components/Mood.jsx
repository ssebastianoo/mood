import DeleteMood from "./DeleteMood";
import { updateMood } from "../utils";
import { useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch } from "react-redux";
import { editMood } from "../features/moodsSlice";

export default function Mood({ mood }) {
    const [edit, setEdit] = useState(false);
    const [moodInputReason, setMoodInputReason] = useState(mood.reason);
    const moodLevels = ["Happy3", "Happy2", "Happy1", "Sad1", "Sad2", "Sad3"];
    const dispatch = useDispatch();

    function showEdit() {
        setMoodInputReason(mood.reason);
        setEdit(true);
    }

    async function save(e) {
        e.preventDefault();

        const moodCopy = { ...mood };
        moodCopy.mood = e.target.mood.value;
        moodCopy.reason = e.target.reason.value;

        const res = await updateMood(mood.id, {
            mood: moodCopy.mood,
            reason: moodCopy.reason,
        });
        setEdit(false);
        dispatch(editMood(moodCopy));

        if (res.success) {
            Notify.success("Mood updated successfully");
        } else {
            Notify.failure("There was an error updating the mood");
        }
    }

    function cancel(e) {
        e.preventDefault();
        setEdit(false);
    }

    return (
        <div className="mood-parent">
            <div className="mood">
                {edit ? (
                    <div className="mood-child edit">
                        <p>{mood.timestamp}</p>
                        <form onSubmit={save}>
                            <select
                                name="mood"
                                className="text-black"
                                defaultValue={mood.mood}
                            >
                                {moodLevels.map((level, index) => {
                                    return (
                                        <option key={index} value={level}>
                                            {level}
                                        </option>
                                    );
                                })}
                            </select>
                            <br />
                            <input
                                className="text-black"
                                type="text"
                                value={moodInputReason}
                                placeholder={mood.reason}
                                name="reason"
                                onChange={(e) => {
                                    setMoodInputReason(e.target.value);
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
                    <div className="mood-child">
                        <p className="timestamp">{mood.timestamp}</p>
                        <h2 className="mood-title">{mood.mood}</h2>
                        <p className="reason">{mood.reason}</p>
                        <DeleteMood id={mood.id} />
                        <button className="ml-2" onClick={showEdit}>
                            edit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
