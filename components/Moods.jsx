import { useEffect } from "react";
import { db, getMoods } from "../firebase";
import {
    collection,
    query,
    orderBy,
    getDocs,
} from "firebase/firestore";
import Loading from "../components/Loading";
import { format } from '../utils';

export default function Moods({ moods, setMoods, uid }) {
    useEffect(() => {
        async function getMoods_() {
            const moodsList = [];
            const docs = await getMoods(uid);
            docs.forEach(data => {
                moodsList.push({
                    timestamp: format(new Date(data.timestamp.seconds * 1000)),
                    mood: data.mood,
                    reason: data.reason,
                });
            });
            setMoods(moodsList);
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
                </div>
            ))}
        </div>
    );
}
