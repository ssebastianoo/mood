import {
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { setUid } from "../features/moodsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Account() {
    const provider = new GoogleAuthProvider();
    const [username, setUsername] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("username") && localStorage.getItem("uid")) {
            setUsername(localStorage.getItem("username"));
            dispatch(
                setUid({
                    uid: localStorage.getItem("uid"),
                    username: localStorage.getItem("username"),
                })
            );
        }
    });

    function googleLogin() {
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const user = result.user;
                    dispatch(
                        setUid({ uid: user.uid, username: user.displayName })
                    );
                    setUsername(user.displayName);
                    localStorage.setItem("uid", user.uid);
                    localStorage.setItem("username", user.displayName);
                })
                .catch((err) => {
                    console.log(err);
                    alert("there was an error logging in");
                });
        });
    }

    function login() {
        googleLogin();
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
