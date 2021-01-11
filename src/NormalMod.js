import randomColor from "randomcolor";
import * as React from "react";
import ColorPicker from "@radial-color-picker/react-color-picker";
import {hslToRgb} from "./hslToRgbf";
import{get_colors, numAverage} from "./Rounds";
import{getResult} from "./BlendColors";
import '@radial-color-picker/react-color-picker/dist/react-color-picker.min.css';
import {useEffect, useState} from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase";
import {ScoreBoard} from "./Scoreboard";
import {MakeAGuessHandle, RecapGame} from "./MakeAGuessHandle";
const auth = firebase.auth();
const firestore = firebase.firestore();



export function NormalMode(props){
    const id = props.id;

    const [_old,set_old] = useState(0);
    const [user] = useAuthState(auth);
    useEffect(() => {
        document.getElementsByClassName('rcp__well')[0].appendChild(document.getElementById('logo'));
    })

    const [round ,setRound] = React.useState(1);
    const [color, setColor] = React.useState({
        hue: 90,
        saturation: 100,
        luminosity: 50,
        alpha: 1,
    });
    const [backcolor, setBackcolor] = React.useState({
        left: randomColor(),
        right: randomColor(),
    })


    const onInput = hue => {
        setColor(prev => {
            return {
                ...prev,
                hue,
            };
        });
    };
    const changeSaturation = (event) => {setColor
    (prevState => {
        return{
            ...prevState,
            saturation: event.target.value,
        };
    });
    };
    const changeLuminosity = (event) => {setColor
    (prevState => {
        return{
            ...prevState,
            luminosity: event.target.value,
        };
    });
    };
    const [arr, setArr] = React.useState([]);
    const [histArr, setHistArr] = React.useState([]);

    const add = (value,value2) =>{
        setArr(arr.concat(value))
        setHistArr(histArr.concat(value2))
    }
    const HandleClick = ()=>{

        let c = get_colors(true);
        let res = getResult(c[0],c[1],c[2])
        confirmAlert({
            afterClose: () => {UpdateRound(res,c);},
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <MakeAGuessHandle c0={c[0]} c1={c[1]} c2={c[2]} res={res} mode={true}/>
                        <button
                            id='mag-handler-btn'
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Continue
                        </button>
                    </div>
                );
            }
        });
    }
    const UpdateRound = (res,c) => {
        add(res,c);

        setBackcolor(prevState => {
            return{
                left:randomColor(),
                right:randomColor(),
            };
        });
        if (round<=5){
            setRound(round+1);
        }
    };
    const Handle0 = () => {firestore.collection('users').doc(user.uid).get().then((doc) => {
        const addd = () => {
            firestore.collection('users').doc(user.uid).update({
                bestScoreN:numAverage(arr)
            });
        }
        addd();
    })};
    const getOld = async(e) => {await firestore.collection('users').doc(user.uid).get().then((doc) => {
        set_old(doc.data()['bestScoreN']) ;
    })}

    const gameEnded = () => {

        let _new = numAverage(arr);
        getOld();
        setRound(1);

        let new_BC = _old < _new;
        if(new_BC){Handle0();}

        RecapGame(histArr,_new,true,new_BC);
        setArr([]);
        setHistArr([]);
    }

    useEffect(() => {
        if(round > 5){
            gameEnded();
        }
    })

    return (
        <>

            {id ?  <ScoreBoard mode={true} id={id}/> : null}

            <button id='make-a-guess' className='true' onClick={HandleClick} > MAKE A GUESS  </button>





            <div id='p-conteneur'>
                <p id='round-number' className='N'>ROUND : {round}/5  </p>
                <p id='round-average' className='N'>ACCURACY : {numAverage(arr) || 0}  </p>
            </div>


            <div id='back'>
                <div className='leftb' style={{
                    width:'50%',
                    height:'100%',
                    backgroundColor: backcolor.left
                }}/>

                <div className='rightb' style={{
                    width:'50%',
                    height:'100%',
                    backgroundColor: backcolor.right

                }}/>
            </div>

            <div id='color-picker'>
                <ColorPicker {...color} onInput={onInput} id='cp' />

                <div id='inputs'>
                    <input type="range" min='0' max='100' id='saturationInput'
                           onChange={changeSaturation}

                           style={{backgroundImage: 'linear-gradient(to right,'
                                   +hslToRgb(color.hue,0,color.luminosity)+
                                   ','+hslToRgb(color.hue,50,color.luminosity)+
                                   ','+hslToRgb(color.hue,100,color.luminosity)+')'}}
                    />

                    <input type="range" min='0' max='100' id='luminosityInput'
                           onChange={changeLuminosity}
                           style={{backgroundImage: 'linear-gradient(to right,'
                                   +hslToRgb(color.hue,color.saturation,0)+
                                   ','+hslToRgb(color.hue,color.saturation,50)+
                                   ','+hslToRgb(color.hue,color.saturation,100)+')'}}/>
                </div>
            </div>
            <div><div id='logo' className='N'/></div>
        </>
    );
}