import { SignIn} from "./Scoreboard";
import firebase from "firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useState} from "react";


export function AccueilPage(){
    return(

        <div id='accueil' >
            <div id='lg'/>
            <SignIn/>

        </div>
    );
}
export function EnterName(){
    const [FormValue, setFormValue] = useState('');
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const firestore = firebase.firestore();

    const HandleSubmit = async (e) => {

        e.preventDefault();

        await firestore.collection('users').doc(user.uid).set({
            name:FormValue,bestScoreN:0,bestScoreR:0
        })

        window.location.reload();

    }

    return(
        <div id='accueil' >
            <div id='lg'/>
            <form id='form-accueil' onSubmit={HandleSubmit}>
                <input type='text'
                       placeholder='Enter your name'
                       value={FormValue}
                       onChange={(e) => setFormValue(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>


        </div>
    );
}
