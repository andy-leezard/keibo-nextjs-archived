"use client"

import { auth } from "./firebase"
import {
  signInWithPopup as _signInWithPopup,
  sendPasswordResetEmail as _sendPasswordResetEmail,
} from "firebase/auth"
/* 
export const googleAuthProvider = new GoogleAuthProvider()

export const signInWithPopup = async () => {
  try {
    const result = await _signInWithPopup(auth, googleAuthProvider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const user = result.user
    // IdP data available using getAdditionalUserInfo(result)
    console.log({
      user,
      token,
    })
    return {
      user,
      token,
    }
  } catch (_error) {
    // Handle Errors here.
    const error = _error as any
    const errorCode = error?.code
    const errorMessage = error?.message
    // The email of the user's account used.
    const email = error?.customData.email
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
    // ...
    console.log({
      error,
      errorCode,
      errorMessage,
      email,
    })
  }
} */

export const sendPasswordResetEmail = (email: string) =>
  _sendPasswordResetEmail(auth, email)
