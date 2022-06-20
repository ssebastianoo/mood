import { useEffect } from "react";
import { getMoods } from "../utils";
import Loading from "./Loading";
import Mood from "./Mood";

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
                <Mood key={index} mood={mood} moods={moods} setMoods={setMoods}/>
            ))}
        </div>
    );
}
