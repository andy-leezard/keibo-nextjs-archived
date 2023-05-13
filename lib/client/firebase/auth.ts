import { auth } from "./firebase"
import { sendPasswordResetEmail as _sendPasswordResetEmail } from "firebase/auth"

export const sendPasswordResetEmail = (email: string) =>
  _sendPasswordResetEmail(auth, email)
