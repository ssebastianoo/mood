import AddMood from "../components/AddMood";
import Moods from "../components/Moods";
import Account from "../components/Account";
import { useState } from "react";

export default function Home() {
    const [moods, setMoods] = useState(null);
    const [uid, setUid] = useState(null);

    return (
        <div>
            <Account uid={uid} setUid={setUid} />
            {uid ? (
                <>
                    <AddMood moods={moods} setMoods={setMoods} uid={uid} />
                    <Moods moods={moods} setMoods={setMoods} uid={uid} />
                </>
            ) : null}
        </div>
    );
}
