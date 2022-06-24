import AddMood from "../components/AddMood";
import Moods from "../components/Moods";
import Account from "../components/Account";
import { useSelector } from "react-redux";

export default function Home() {
    const uid = useSelector((state) => state.moods.uid);

    return (
        <div>
            <Account />
            {uid ? (
                <>
                    <AddMood uid={uid} />
                    <Moods uid={uid} />
                </>
            ) : null}
        </div>
    );
}
