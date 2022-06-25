import AddMood from "../components/AddMood";
import Moods from "../components/Moods";
import Account from "../components/Account";
import Stats from "../components/Stats";
import { useSelector } from "react-redux";

export default function Home() {
    const uid = useSelector((state) => state.moods.uid);

    return (
        <div>
            <Account />
            {uid ? (
                <>
                    <AddMood uid={uid} />
                    <div className="sections">
                        <Stats />
                        <Moods uid={uid} />
                    </div>
                </>
            ) : null}
        </div>
    );
}
