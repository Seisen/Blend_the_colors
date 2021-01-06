import randomColor from "randomcolor";
import * as React from "react";
import ColorPicker from "@radial-color-picker/react-color-picker";
import {hslToRgb} from "./hslToRgbf";

import '@radial-color-picker/react-color-picker/dist/react-color-picker.min.css';
import {get_colors, numAverage} from "./Rounds";
import {getResult} from "./BlendColors";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase";
const auth = firebase.auth();
const firestore = firebase.firestore();

export function ReverseMode(){
    const [_old,set_old] = useState(0);
    const [user] = useAuthState(auth);

    useEffect(() => {
        document.getElementById('noname').appendChild(document.getElementById('logo'));
    })

    const [color, setColor] = React.useState({
        hue: 90,
        saturation: 100,
        luminosity: 50,
        alpha: 1,
    });
    const [backcolor, setBackcolor] = React.useState({
        left:randomColor(),
        right:randomColor()
    });
    const [colorToGuess, setColorToGuess] = React.useState({x:randomColor()});

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
    const updateBackColor = () => {

        if(right){
            setBackcolor(prevState => {
                return{
                    ...prevState,
                    right: hslToRgb(color.hue,color.saturation,color.luminosity),
                };
            });
        }else{
            setBackcolor(prevState => {
                return{
                    ...prevState,
                    left: hslToRgb(color.hue,color.saturation,color.luminosity),
                };
            });
        }
    };

    const [right, setRight] = React.useState(null);

    const [arr, setArr] = React.useState([]);

    const [round ,setRound] = React.useState();

    const add = (value) =>{
        setArr(arr.concat(value))
    }

    const HandleClick = () => {
        let _new;
        const getOld = async(e) => {await firestore.collection('users').doc(user.uid).get().then((doc) => {
            set_old(doc.data()['bestScoreR']) ;
        })}
        const Handle0 = () => {firestore.collection('users').doc(user.uid).get().then((doc) => {
            const addd = () => {
                firestore.collection('users').doc(user.uid).update({
                    bestScoreR:numAverage(arr)
                });
            }
            addd();
        })};
        let c = get_colors(true);
        let res = getResult(c[0],c[1],c[2])
        add(res);

        setColorToGuess(prevState => {
            return{
                x: randomColor(),
            };
        });

        if (round<5){
            setRound(round+1);
        }else{
            _new = numAverage(arr);
            getOld();
            setRound(1);
            if(_old < _new){Handle0();}
            setArr([]);
        }
    };


    //this line is to set noname as a child of cp to ignore the change of the colorpicker without rewriting all the code
    useEffect(() => {
        document.getElementById('cp').appendChild(document.getElementById('noname'));
    })
    return (
        <>
            <div  >
                <div id='noname'  style={{backgroundColor:colorToGuess.x}} />
            </div>

            <button id='make-a-guess' className='false' onClick={HandleClick} > MAKE A GUESS </button>
            <p id='round-number' className='R'>ROUND : {round}/5</p>
            <p id='round-average' className='R'>ACCURACY : {numAverage(arr) || 0}  </p>


            <div id='back'>
                <div  style={{
                    width:'50%',
                    height:'100%',
                    backgroundColor: backcolor.left
                }}
                 className={'leftb left'+right}
                 onClick={async () => {if(right!==false) await setRight(false);}}
                />

                <div style={{
                    width:'50%',
                    height:'100%',
                    backgroundColor: backcolor.right

                }}
                 className={'rightb right'+right}
                 onClick={async () => {if(right!==true) await setRight(true);}}
                />
            </div>

            <div id='color-picker'>

                <ColorPicker {...color}
                             onMouseMove={(e) => {if(e.buttons===1){updateBackColor()}}}
                             onInput={onInput}

                             id='cp' />

                <div id='inputs'>
                    <input type="range" min='0' max='100' id='saturationInput'
                           onChange={changeSaturation }

                           onMouseMove={(e) => {if(e.buttons===1){updateBackColor()}}}
                           style={{backgroundImage: 'linear-gradient(to right,'
                                   +hslToRgb(color.hue,0,color.luminosity)+
                                   ','+hslToRgb(color.hue,50,color.luminosity)+
                                   ','+hslToRgb(color.hue,100,color.luminosity)+')'}}
                    />

                    <input type="range" min='0' max='100' id='luminosityInput'
                           onChange={changeLuminosity}
                           onMouseMove={(e) => {if(e.buttons===1){updateBackColor()}}}

                           style={{backgroundImage: 'linear-gradient(to right,'
                                   +hslToRgb(color.hue,color.saturation,0)+
                                   ','+hslToRgb(color.hue,color.saturation,50)+
                                   ','+hslToRgb(color.hue,color.saturation,100)+')'}}/>
                </div>
            </div>
            <div><div id='logo' className='R'/></div>

        </>
    );
//here we put a div inside colorpicker to mask the color changing input without rewriting all the code

}