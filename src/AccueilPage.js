import { SignIn} from "./Scoreboard";
import firebase from "firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useAlert} from "react-alert";


export function AccueilPage(){
    return(

        <div id='accueil' className='d' >
            <div id='lg'/>
            <SignIn/>

        </div>
    );
}
/*export function EnterName(){
    const [FormValue, setFormValue] = useState('');
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const firestore = firebase.firestore();
    const alert = useAlert();


    const NameExist = () =>{
        const userRef = firestore.collection('users');
        let query = userRef.where("name", "==", FormValue);
        const [name] = useCollectionData(query, { idField: 'id' });
        console.log(!name.empty);

    }
    const HandleSubmit = () => {

        if(NameExist()){
            alert.error("This name is already taken");
        }else {
            alert.success("Welcome " + FormValue + " !");
        }
        }


    const HandleChangeName = async (e) => {
        e.preventDefault();
            await firestore.collection('users').doc(user.uid).set({
                name:FormValue,bestScoreN:0,bestScoreR:0
            })
        window.location.reload();

    }



    return(
        <div id='accueil' >
            <div id='lg'/>
            <form id='form-accueil' onSubmit={HandleChangeName()}>
                <input type='text'
                       placeholder='Enter your name'
                       value={FormValue}
                       onChange={(e) => setFormValue(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>


        </div>
    );
    if(NameExist !== 0){
            alert.error("Name already taken !");
        }
        else if(FormValue === ""){
            alert.error("Enter a non empty name!");
        }else{
            alert.success("Welcome "+FormValue+" !")
            await firestore.collection('users').doc(user.uid).set({
                name:FormValue,bestScoreN:0,bestScoreR:0
            })
}*/

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