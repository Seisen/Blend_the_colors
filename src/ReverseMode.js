import randomColor from "randomcolor";
import * as React from "react";
import ColorPicker from "@radial-color-picker/react-color-picker";
import {hslToRgb} from "./hslToRgbf";

import '@radial-color-picker/react-color-picker/dist/react-color-picker.min.css';


export function ReverseMode(){
    const [color, setColor] = React.useState({
        hue: 90,
        saturation: 100,
        luminosity: 50,
        alpha: 1,
    });
    const [backcolor, setBackcolor] = React.useState({
        left:randomColor(),
        right:randomColor()
    })
    const [colorToGuess, setColorToGuess] = React.useState(randomColor());

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
    const setButtonColor = () => {
        let ele = document.getElementsByClassName('rcp__well');
        try {
            ele[0].style.backgroundColor = colorToGuess;
            ele[0].classList.add('reverse');
        }catch (e){
            console.log('error', e);
        }

    }
    const [right, setRight] = React.useState(null);



    return (
        <>

            <div id='back'>
                <div style={{
                    width:'50%',
                    height:'100%',
                    backgroundColor: backcolor.left
                }}
                 className={'left'+right}
                 onClick={async () => {if(right!==false) await setRight(false);}}
                />

                <div style={{
                    width:'50%',
                    height:'100%',
                    backgroundColor: backcolor.right

                }}
                 className={'right'+right}
                 onClick={async () => {if(right!==true) await setRight(true);}}
                />
            </div>

            <div id='color-picker'>

                <ColorPicker {...color}
                             onMouseMove={(e) => {if(e.buttons===1){updateBackColor()}}}
                             onInput={onInput}
                             onChange={setButtonColor}
                             id='cp' />

                <div id='inputs'>
                    <input type="range" min='0' max='100' id='saturationInput'
                           onChange={changeSaturation }
                           onMouseMoveCapture={(e) => {if(e.buttons===1){setButtonColor()}}}
                           onMouseMove={(e) => {if(e.buttons===1){updateBackColor()}}}
                           style={{backgroundImage: 'linear-gradient(to right,'
                                   +hslToRgb(color.hue,0,color.luminosity)+
                                   ','+hslToRgb(color.hue,50,color.luminosity)+
                                   ','+hslToRgb(color.hue,100,color.luminosity)+')'}}
                    />

                    <input type="range" min='0' max='100' id='luminosityInput'
                           onChange={changeLuminosity}
                           onMouseMove={(e) => {if(e.buttons===1){updateBackColor()}}}
                           onMouseMoveCapture={(e) => {if(e.buttons===1){setButtonColor()}}}
                           style={{backgroundImage: 'linear-gradient(to right,'
                                   +hslToRgb(color.hue,color.saturation,0)+
                                   ','+hslToRgb(color.hue,color.saturation,50)+
                                   ','+hslToRgb(color.hue,color.saturation,100)+')'}}/>
                </div>
            </div>

        </>
    );
}