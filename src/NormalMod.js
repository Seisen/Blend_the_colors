import randomColor from "randomcolor";
import * as React from "react";
import ColorPicker from "@radial-color-picker/react-color-picker";
import {hslToRgb} from "./hslToRgbf";
import{get_colors} from "./Rounds";
import{getResult} from "./BlendColors";
import '@radial-color-picker/react-color-picker/dist/react-color-picker.min.css';
import {useEffect} from "react";


export function NormalMode(){
    useEffect(() => {
        document.getElementsByClassName('rcp__well')[0].appendChild(document.getElementById('logo'));
    })

    const [round ,setRound] = React.useState(0);
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


    const add = (value) =>{
        setArr(arr.concat(value))
    }
    const handleClick = () => {

        let c = get_colors(true);
        let res = getResult(c[0],c[1],c[2])
        add(res);

        setBackcolor(prevState => {
            return{
                left:randomColor(),
                right:randomColor(),
            };
        });
        if (round<5){
            setRound(round+1);
        }else{
            setRound(0);
        }


    };

    return (
        <>
            <button id='make-a-guess' className='true' onClick={handleClick} > MAKE A GUESS  </button>
            <p id='round-number' className='N'>ROUND : {round}/5  </p>

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