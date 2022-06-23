import AddMood from "../components/AddMood";
import Moods from "../components/Moods";
import Account from "../components/Account";
import { useState } from "react";

export default function Home() {
    const [uid, setUid] = useState(null);

    return (
        <div>
            <Account uid={uid} setUid={setUid} />
            {uid ? (
                <>
                    <AddMood uid={uid} />
                    <Moods uid={uid} />
                </>
            ) : null}
        </div>
    );
}
