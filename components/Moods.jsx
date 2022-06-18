import { useEffect } from "react";
import { getMoods } from "../utils";
import Loading from "../components/Loading";
import DeleteMood from "../components/DeleteMood";

export default function Moods({ moods, setMoods, uid }) {
    useEffect(() => {
        async function getMoods_() {
            const docs = await getMoods(uid);
            setMoods(docs);
        }
        getMoods_();
    }, []);

    if (!moods) {
        return <Loading />;
    }

    if (moods.length === 0) {
        return <p>no moods</p>;
    }

    return (
        <div className="flex w-full justify-around flex-wrap mt-6 gap-x-2 gap-y-3">
            {moods.map((mood, index) => (
                <div
                    key={index}
                    className="bg-green-400 p-2 rounded-md shadow-3xl"
                >
                    <p>{mood.timestamp}</p>
                    <h3>{mood.mood}</h3>
                    <p>{mood.reason}</p>
                    <DeleteMood id={mood.id} moods={moods} setMoods={setMoods} />
                </div>
            ))}
        </div>
    );
}
