import { initializeApp } from 'firebase/app'

import { getAuth, GithubAuthProvider, onAuthStateChanged, signInWithPopup, useDeviceLanguage } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
    projectId: process.env.NEXT_PUBLIC_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_APPID
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const mapUserFromFirebaseAuth = user => {
    user = auth.currentUser

    const username = user.displayName
    const avatar = user.photoURL
    const uid = user.uid

    return {
        username,
        avatar,
        uid
    }
}

export const authStateChanged = onChange => {
    return onAuthStateChanged(auth, user => {
        const normalizeUser = user ? mapUserFromFirebaseAuth(user) : null
        onChange(normalizeUser)
    })
}

export const loginWithGithub = async () => {
    const githubProvider = new GithubAuthProvider()
    useDeviceLanguage(auth)
    return await signInWithPopup(auth, githubProvider)
}