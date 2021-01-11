import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button, ListGroup, Overlay} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import * as React from "react";

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
    let id = props.id;

    const userRef = firestore.collection('users');
    const [att,setAtt]=useState([0,0,"ss"]);

    useEffect(() => {
        firestore.collection('users').doc(id).get().then((doc) => {
            setAtt([
                doc.data()['bestScoreR'],
                doc.data()['bestScoreN'],
                doc.data()['name']
            ])
        });
    },id
    )

    let query;
    let query2;

    if (mode){
        query = userRef.orderBy('bestScoreN', 'desc').limit(10);
        query2 = userRef.where("bestScoreN", ">", att[1]);
    }else{
        query = userRef.orderBy('bestScoreR', 'desc').limit(10);
        query2 = userRef.where("bestScoreR", ">", att[0]);
    }

    const [bestScores] = useCollectionData(query, { idField: 'id' });
    const [onTop] = useCollectionData(query2);
    let place;
    try{
        place = onTop.length;
    }catch (e){
        //pass
    }

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

                    }}
                >
                    <ListGroup id='listgroup' >
                        {bestScores && bestScores.map((ele,index) => <Scores i={index} mode={mode} key={ele.id} bestScores={ele} />)}
                        {mode ? <ListGroup.Item  className='u' id='list-items2'><p>#{place+1}</p><p>{att[2]}</p>  <p>{att[1]}%</p></ListGroup.Item> :  <ListGroup.Item className='u' id='list-items'><p>#{place+1}</p><p>{att[2]}</p>  <p>{att[0]}%</p></ListGroup.Item>}
                    </ListGroup>
                </div>
            )}
        </Overlay>

    </div>
    );



}
function Scores (props) {
    const { name, bestScoreN, bestScoreR } = props.bestScores;
    const mode = props.mode;
    const i = props.i+1;
    if(mode){
        return (
            <ListGroup.Item  id='list-items2'><p>#{i}</p><p>{name}</p>  <p>{bestScoreN}%</p></ListGroup.Item>

        )
    }else{
        return (
            <ListGroup.Item id='list-items'><p>#{i}</p><p>{name}</p>  <p>{bestScoreR}%</p></ListGroup.Item>
        )
    }

}