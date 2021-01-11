import randomColor from "randomcolor";
import * as React from "react";
import ColorPicker from "@radial-color-picker/react-color-picker";
import {hslToRgb} from "./hslToRgbf";
import { useAlert} from "react-alert";
import '@radial-color-picker/react-color-picker/dist/react-color-picker.min.css';
import {get_colors, numAverage} from "./Rounds";
import {getResult, reverseRoundValid} from "./BlendColors";
import {useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase";
import {ScoreBoard} from "./Scoreboard";
import {confirmAlert} from "react-confirm-alert";
import {MakeAGuessHandle, RecapGame} from "./MakeAGuessHandle";
const auth = firebase.auth();
const firestore = firebase.firestore();

export function ReverseMode(props){
    const alert = useAlert();


    const id = props.id;

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
    const [histArr, setHistArr] = React.useState([]);

    const [round ,setRound] = React.useState(1);

    const add = (value,value2) =>{
        setArr(arr.concat(value))
        setHistArr(histArr.concat(value2))
    }
    const HandleClick = ()=>{
        let c = get_colors(false);
        let res = getResult(c[0],c[1],c[2])
        if (reverseRoundValid(c[0],c[1])){
            confirmAlert({
                afterClose: () => {UpdateRound(res,c);},
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui reverse'>
                            <MakeAGuessHandle c0={c[0]} c1={c[1]} c2={c[2]} res={res} mode={false}/>
                            <button
                                id='mag-handler-btn' className='reverse'
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
        }else{


                alert.error("The colors you picked are too close!");




        }

    }

    const UpdateRound = (res,c) => {

        add(res,c);

        setColorToGuess(prevState => {
            return{
                x: randomColor(),
            };
        });

        if (round<=5){
            setRound(round+1);
        }
    };
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
    const gameEnded = () => {

        let _new = numAverage(arr);
        getOld();
        setRound(1);

        let new_BC = _old < _new;
        if(new_BC){Handle0();}

        RecapGame(histArr,_new,false,new_BC);
        setArr([]);
        setHistArr([]);
    }
    useEffect(() => {
        if(round > 5){
            gameEnded();
        }
    })


    //this line is to set noname as a child of cp to ignore the change of the colorpicker without rewriting all the code
    useEffect(() => {
        document.getElementById('cp').appendChild(document.getElementById('noname'));
    })
    //
    return (
        <>
            {id ?  <ScoreBoard mode={false} id={id} /> : null}
            <div  >
                <div id='noname'  style={{backgroundColor:colorToGuess.x}} />
            </div>
            <button id='make-a-guess' className='false' onClick={HandleClick} > MAKE A GUESS </button>
            <div id='p-conteneur'>
                <p id='round-number' className='R'>ROUND : {round}/5  </p>
                <p id='round-average' className='R'>ACCURACY : {numAverage(arr) || 0}  </p>
            </div>

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