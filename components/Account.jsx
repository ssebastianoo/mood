import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithCustomToken,
    signInWithCredential,
    setPersistence,
    browserLocalPersistence,
    signOut,
} from "firebase/auth";
import {
    getCookies,
    checkCookies,
    setCookies,
    removeCookies,
} from "cookies-next";
import { auth } from "../firebase";
import { useState } from "react";

export default function Account({ uid, setUid }) {
    const provider = new GoogleAuthProvider();
    const [username, setUsername] = useState(null);

    function googleLogin() {
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential =
                        GoogleAuthProvider.credentialFromResult(result);
                    const user = result.user;
                    setUid(user.uid);
                    setUsername(user.displayName);
                    setCookies("token", credential.idToken, {
                        sameSite: true,
                    });
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
                removeCookies("token");
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
