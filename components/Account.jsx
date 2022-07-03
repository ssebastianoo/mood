import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithCredential,
    setPersistence,
    browserLocalPersistence,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { setUid } from "../features/moodsSlice";
import { useDispatch } from "react-redux";

export default function Account() {
    const provider = new GoogleAuthProvider();
    const [username, setUsername] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("idToken")) {
            autoLogin();
        }
    });

    function googleLogin() {
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    localStorage.setItem("idToken", credential.idToken);
                    dispatch(
                        setUid({ uid: user.uid, username: user.displayName })
                    );
                    setUsername(user.displayName);
                })
                .catch((err) => {
                    console.log(err);
                    alert("there was an error logging in");
                });
        });
    }

    function autoLogin() {
        const idToken = localStorage.getItem("idToken");
        const credential = GoogleAuthProvider.credential(idToken);
        signInWithCredential(auth, credential)
            .then(async (result) => {
                const user = result.user;
                dispatch(
                    setUid({ uid: user.uid, username: user.displayName })
                );
                setUsername(user.displayName);
            })
            .catch(() => {
                localStorage.removeItem("idToken");
            });
    }

    function login() {
        const idToken = localStorage.getItem("idToken");
        if (!idToken) return googleLogin();
        autoLogin();
    }

    function logout() {
        signOut(auth)
            .then(() => {
                dispatch(setUid({ uid: null, username: null }));
                setUsername(null);
                localStorage.clear();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            {!username ? (
                <button onClick={login}>Login with Google</button>
            ) : (
                <p>{username}</p>
            )}
        </>
    );
}
