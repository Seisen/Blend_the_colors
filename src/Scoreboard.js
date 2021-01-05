import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {Accordion, Card} from "react-bootstrap";

firebase.initializeApp({
    apiKey: "AIzaSyC_q_AoIfegqVsC_aSwUPhHTCHGN3uhcC8",
    authDomain: "blendthecolors-df341.firebaseapp.com",
    databaseURL: "https://blendthecolors-df341-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "blendthecolors-df341",
    storageBucket: "blendthecolors-df341.appspot.com",
    messagingSenderId: "732334047092",
    appId: "1:732334047092:web:8c3ba8cf38b74fb4823621",
    measurementId: "G-D4Q7140CK5"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

export function SignIn() {

    const SignInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);

    }
    const SignInWithFb = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider);


    }

    return(
        <>
            <button className="sign-in t" onClick={SignInWithGoogle}>Sign in with google</button>
            <button className="sign-in" onClick={SignInWithFb}>Sign in with facebook</button>
        </>
    );
}
export function SignOut() {
    return auth.currentUser && (
        <button  className="sign-out" onClick={() => auth.signOut()}>SIGN OUT</button>

    )
}

export function UpdateBestScore(acc, mode){
    const [user] = useAuthState(auth);
    const addScore = () => {firestore.collection('users').doc(user.uid).get().then((doc) => {
        if (mode){
            if (!doc.exists){
                const addd = () => {
                    firestore.collection('users').doc(user.uid).set({bestScoreN:acc});
                }
                addd();
            }
        }else{
            if (!doc.exists){
                const addd = () => {
                    firestore.collection('users').doc(user.uid).set({bestScoreR:acc});
                }
                addd();
            }
        }

    })}
    addScore();
}

export function ScoreBoard(props){
    let mode = props.mode;
    const [user] = useAuthState(auth);
    const userRef = firestore.collection('users');

    let query;
    if (mode){
        query = userRef.orderBy('bestScoreN').limit(10);
    }else{
        query = userRef.orderBy('bestScoreR').limit(10);
    }

    const [bestScores] = useCollectionData(query, { idField: 'id' });

    return(

    <Accordion defaultActiveKey="0">
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                SCOREBOARD
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                {bestScores && bestScores.map(ele => <Scores mode={mode} key={ele.id} bestScores={ele} />)}
            </Accordion.Collapse>
        </Card>

    </Accordion>
    )


}
function Scores (props) {
    const { name, bestScoreN, bestScoreR  } = props.bestScores;
    const mode = props.mode;
    if(mode){
        return (
            <Card.Body>{name} : {bestScoreN}</Card.Body>
        )
    }else{
        return (
            <Card.Body>{name} : {bestScoreR}</Card.Body>
        )
    }

}