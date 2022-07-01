import DeleteMood from "./DeleteMood";
import { updateMood } from "../utils";
import { useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useDispatch } from "react-redux";
import { editMood } from "../features/moodsSlice";
import { getMoodLabel } from "../utils";

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
        <div className="mood-parent flex even:justify-end">
            <div className="mx-8">
                {/* {edit ? (
                    <div className="mood-child max-w-[40vw]">
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
                                            {getMoodLabel(level)}
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
                            </div> */}
                <div className="mood-child max-w-[40vw]">
                    <p className="text-purple text-sm">
                        {mood.timestamp.split(" / ")[0]}{" "}
                        <span className="text-red">/</span>{" "}
                        {mood.timestamp.split(" / ")[1]}{" "}
                        <span className="text-red">/</span>{" "}
                        {mood.timestamp.split(" / ")[2]}
                    </p>
                    {edit ? (
                        <>
                            <form onSubmit={save}>
                                <select
                                    name="mood"
                                    className="text-black"
                                    defaultValue={mood.mood}
                                >
                                    {moodLevels.map((level, index) => {
                                        return (
                                            <option key={index} value={level}>
                                                {getMoodLabel(level)}
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
                                <div className="flex items-center justify-between w-[150px] h-10">
                                    <button className="bg-emerald-500 w-[70px] h-7 rounded-md bg">
                                        Save
                                    </button>
                                    <button
                                        onClick={cancel}
                                        className="bg-red w-[70px] h-7 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="text-yellow text-xl">
                                {getMoodLabel(mood.mood)}
                            </h2>
                            <p className="break-all">{mood.reason}</p>
                            <div className="flex items-center justify-between w-[150px] h-10">
                                <button
                                    onClick={showEdit}
                                    className="bg-yellow w-[70px] h-7 rounded-md"
                                >
                                    Edit
                                </button>
                                {/* <button className="bg-red w-[70px] h-7 rounded-md">Delete</button> */}
                                <DeleteMood id={mood.id} />
                            </div>
                        </>
                    )}
                    {/* <button className="ml-2" onClick={showEdit}>
                            edit
                        </button>
                        <DeleteMood id={mood.id} /> */}
                </div>
            </div>
        </div>
    );
}
