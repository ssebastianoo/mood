import AddMood from "../components/AddMood";
import Moods from "../components/Moods";
import Account from "../components/Account";
import { useSelector } from "react-redux";

export default function Home() {
    const uid = useSelector((state) => state.moods.uid);
    const addingMood = useSelector((state) => state.moods.addingMood);

    return (
        <div>
            {uid ? (
                <>
                    <AddMood uid={uid} />
                    {!addingMood ? <Moods uid={uid} /> : null}
                </>
            ) : null}
        </div>
    );
}
