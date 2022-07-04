import { useState, useEffect } from "react";
import { getMoods } from "../utils";
import Loading from "./Loading";
import Mood from "./Mood";
import { useSelector, useDispatch } from "react-redux";
import { setMoods } from "../features/moodsSlice";

export default function Moods({ uid }) {
    const moods = useSelector((state) => state.moods.value);
    const dispatch = useDispatch();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function getMoods_() {
            const docs = await getMoods(uid);
            dispatch(setMoods(docs));
            setReady(true);
        }
        getMoods_();
    }, []);

    if (!ready) {
        return (
            <div className="flex items-center justify-center mt-36">
                <Loading />
            </div>
        );
    }

    if (moods.length === 0) {
        return (
            <div className="flex items-center justify-center mt-36">
                <p>no moods</p>
            </div>
        );
    }

    return (
        <div className="moods-parent mb-5">
            <div className="moods">
                {moods.map((mood, index) => (
                    <Mood
                        key={index}
                        mood={mood}
                        moods={moods}
                        setMoods={setMoods}
                    />
                ))}
            </div>
        </div>
    );
}
