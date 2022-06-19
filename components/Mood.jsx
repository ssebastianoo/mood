import DeleteMood from "./DeleteMood";
import { useState } from "react";

export default function Mood({mood, moods, setMoods}) {
   // const [edit, setEdit] = useState(false);

    return (
        <div className="bg-green-400 p-2 rounded-md shadow-3xl">
            <p>{mood.timestamp}</p>
            <h3>{mood.mood}</h3>
            <p>{mood.reason}</p>
            <DeleteMood id={mood.id} moods={moods} setMoods={setMoods} />
        </div>
    );
}
