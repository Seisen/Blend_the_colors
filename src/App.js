
import './App.css';
import * as React from "react";

import {NormalMode} from "./NormalMod";
import {ReverseMode} from "./ReverseMode";

import firebase from "firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

import {SignOut} from './Scoreboard';
import {AccueilPage, EnterName} from "./AccueilPage";
import {useState} from "react";
const firestore = firebase.firestore();
const auth = firebase.auth();

function App() {
    const [normalmode,setmode] = React.useState(true);
    const [user] = useAuthState(auth);

    const handleClick = () => {

        setmode(prevState => {return(!prevState)})
    };

    const [name_exist, setNameExist] = useState(false);
    const Handle = () => {firestore.collection('users').doc(user.uid).get().then((doc) => {
        const addd = () => {
            firestore.collection('users').doc(user.uid).set({name:"",
                bestScoreN:0,bestScoreR:0
            });
        };
        addd();
    });};
    try{

        const getCA = () => {firestore.collection('users').doc(user.uid).get().then((doc) => {
            if (!doc.exists){
                Handle();
                setNameExist(false);
            }else{
                setNameExist(doc.data()['name'] !== "");
            }
        });};
        getCA();

    }catch (e){
        //pass
    }

    return(
        <>

            {user ? <SignOut mode={normalmode} /> : <AccueilPage/>}
            {name_exist ? null : <EnterName/>}

            <button className={normalmode.toString()} id='changeMode'  onClick={handleClick}>CHANGE MODE</button>

            {normalmode ? <NormalMode  /> : <ReverseMode/>}

        </>
    );
}

export default App;
