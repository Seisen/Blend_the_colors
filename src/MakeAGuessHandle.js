import {blendColorsRGB} from "./BlendColors";
import * as React from "react";

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