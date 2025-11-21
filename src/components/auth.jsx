import { auth, googleProvider } from '../config/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from "react"

export const Auth = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.photoURL);
  

  const signIn = async () => {
    console.log(auth?.currentUser?.email);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(`There has been an error: ${error}`)
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(`There has been an error signing in with Google: ${error}`);
      
    }
  }

   const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(`There has been an error signing out: ${error}`);
      
    }
  }

  return (
    <div>
      <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)}/>
      <input placeholder="passowrd" type="password" onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}