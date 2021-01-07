import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {Accordion, Button, Card, ListGroup, Overlay} from "react-bootstrap";
import {useRef, useState} from "react";

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
export function SignOut(props) {
    return auth.currentUser && (
        <button  className={"sign-out"+props.mode}  onClick={() => auth.signOut()}>SIGN OUT</button>

    )
}


export function ScoreBoard(props){
    let mode = props.mode;

    const userRef = firestore.collection('users');

    let query;
    if (mode){
        query = userRef.orderBy('bestScoreN', 'desc').limit(10);
    }else{
        query = userRef.orderBy('bestScoreR', 'desc').limit(10);
    }

    const [bestScores] = useCollectionData(query, { idField: 'id' });

    const [show, setShow] = useState(false);
    const target = useRef(null);
    return(

    <div  id='scoardboard' >
        <Button id={'sc-btn'+mode} ref={target} onClick={() => setShow(!show)}>
            SCOREBOARD
        </Button>
        <Overlay id='sc-ovl' target={target.current} show={show} placement="bottom">
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        zIndex:"5000",
                    }}
                >
                    <ListGroup id='listgroup'>
                        {bestScores && bestScores.map(ele => <Scores mode={mode} key={ele.id} bestScores={ele} />)}
                    </ListGroup>
                </div>
            )}
        </Overlay>

    </div>
    );


}
function Scores (props) {
    const { name, bestScoreN, bestScoreR  } = props.bestScores;
    const mode = props.mode;
    if(mode){
        return (
            <ListGroup.Item>{name} : {bestScoreN}</ListGroup.Item>

        )
    }else{
        return (
            <ListGroup.Item>{name} : {bestScoreR}</ListGroup.Item>
        )
    }

}