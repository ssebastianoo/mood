import {
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState, useEffect } from "react";

export default function Account({ setUid }) {
    const provider = new GoogleAuthProvider();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("username") && localStorage.getItem("uid")) {
            setUsername(localStorage.getItem("username"));
            setUid(localStorage.getItem("uid"));
        }
    })

    function googleLogin() {
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    const user = result.user;
                    setUid(user.uid);
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
        /* console.log(checkCookies("token"));
        if (checkCookies("token")) {
            const credential = GoogleAuthProvider.credential(getCookies("token"));
            signInWithCredential(auth, credential).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            googleLogin();
        } */
        googleLogin();
    }

    function logout() {
        signOut(auth)
            .then(() => {
                setUid(null);
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
                <div className="login">
                    <button onClick={login}>Login with Google</button>
                </div>
            ) : (
                <div className="">
                    <p>{username}</p>
                    <div className="dropdown">
                        <button onClick={logout}>log out</button>
                    </div>
                </div>
            )}
        </>
    );
}
