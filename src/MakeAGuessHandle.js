import {blendColorsRGB} from "./BlendColors";
import * as React from "react";
import {confirmAlert} from "react-confirm-alert";

export function MakeAGuessHandle(props){
    if(props.mode){
        return(<>
                <h1 style={{color:"white",fontSize:'40px',borderBottom: '4px dashed rgba(250,250,250,0.5)',paddingBottom:'5px'
                }}>Your guess</h1>
                <div id='MAG-alert'>
                    <h1 style={{color:"white"}}>Your answer</h1>
                    <div className='mag-res'>
                        <div className='mag-color' style={{backgroundColor:props.c0}}/>
                        <p style={{color:"white"}}>+</p>
                        <div className='mag-color' style={{backgroundColor:props.c1}}/>
                        <p style={{color:"white"}}>=</p>
                        <div className='mag-color' style={{backgroundColor:props.c2}}/>
                    </div>
                    <h1 style={{color:"white"}}>The right answer</h1>
                    <div className='mag-res'>
                        <div className='mag-color' style={{backgroundColor:props.c0}}/>
                        <p style={{color:"white"}}>+</p>
                        <div className='mag-color' style={{backgroundColor:props.c1}}/>
                        <p style={{color:"white"}}>=</p>
                        <div className='mag-color' style={{backgroundColor:blendColorsRGB(props.c0,props.c1)}}/>
                    </div>
                    <h3 style={{color:"white"}}>Accuracy : {Math.round((props.res)*10000)/10000}</h3>
                </div>
            </>
        )
    }else{
        return(<>
                <h1 style={{color:"black",fontSize:'40px',borderBottom: '4px dashed rgba(0,0,0,0.5)',paddingBottom:'5px'
                }}>Your guess</h1>
                <div id='MAG-alert'>
                    <h1 style={{color:"black"}}>Your answer</h1>
                    <div className='mag-res'>
                        <div className='mag-color' style={{backgroundColor:props.c0}}/>
                        <p style={{color:"black"}}>+</p>
                        <div className='mag-color' style={{backgroundColor:props.c1}}/>
                        <p style={{color:"black"}}>=</p>
                        <div className='mag-color' style={{backgroundColor:props.c2}}/>
                    </div>
                    <h3 style={{color:"black"}}>Accuracy : {Math.round((props.res)*10000)/10000}</h3>
                </div>
            </>
        )
    }
}
export function RecapGame(colors,res, mode,new_BC){
    let color;
    let rgbaa;
    let Cn;
    if (mode){
        color="white";
        rgbaa='rgba(250,250,250,0.5)';
        Cn='custom-ui';
    }else{
        color="black";
        rgbaa='rgba(0,0,0,0.5)'
        Cn='custom-ui reverse';
    }


    confirmAlert({

        customUI: ({ onClose }) => {
            return (
                <div className={Cn} >
                    <h1 style={{color:color,
                        borderBottom: '2px dashed '+rgbaa
                    }}>Results of the game</h1>
                    {result(colors,color)}
                    <h3 style={{color:color}}>Average accuracy : {res} </h3>
                    {newBestScore(new_BC,color)}
                    <button style={{color:color,
                                    border:'2px dashed '+color
                    }}

                        id='mag-handler-btn'
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Play again
                    </button>
                </div>
            );
        }
    });

}
function newBestScore(_new,color){
    if(_new){
        return(
            <h3 style={{
                color:color,
                fontSize:'30px',
                textAlign:'center'

            }}>New best Score!</h3>
        );
    }else{
        return null;

    }

}
function result(colors,color) {
    let rows = [];
    for (let i = 0 ; i < 15 ;i+=3){
        rows.push(
            <div className='mag-res'>
                <div className='mag-color' style={{backgroundColor:colors[i]}}/>
                <p style={{color:color}}>+</p>
                <div className='mag-color' style={{backgroundColor:colors[i+1]}}/>
                <p style={{color:color}}>=</p>
                <div className='mag-color' style={{backgroundColor:colors[i+2]}}/>
            </div>
        )
    };
    return rows
}