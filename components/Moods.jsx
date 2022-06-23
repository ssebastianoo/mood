import { useEffect } from "react";
import { getMoods } from "../utils";
import Loading from "./Loading";
import Mood from "./Mood";
import { useSelector, useDispatch } from "react-redux";
import { setMoods } from "../features/moodsSlice";

export default function Moods({ uid }) {
    const moods = useSelector((state) => state.moods.value);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getMoods_() {
            const docs = await getMoods(uid);
            dispatch(setMoods(docs));
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
        <div className="moods-parent">
            <div className="line"></div>
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
