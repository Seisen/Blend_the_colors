import {useState} from "react";
import MouseTooltip from 'react-sticky-mouse-tooltip';

export function TutorialN(){
    const [disable,setDisable] = useState(false);

    if(!disable){
        return(
            <>
                <MouseTooltip
                    style={{zIndex:'50000',
                        fontFamily:'ME',
                        color:'white'
                    }}
                    visible={true}
                    offsetX={10}
                    offsetY={10}
                >
                    <span style={{zIndex:'50000'}}>
                        Click to play!
                    </span>
                </MouseTooltip>
                <div id='conteneur-tuto' onClick={() => {setDisable(!disable)}}
                     style={{
                         display:'flex',
                         width:'100vw',
                         height:'100vh',
                         zIndex:'10000',
                         position:'absolute',
                         cursor:'pointer'
                     }}
                >
                    <div id='arrow1' />
                    <div id='arrow2' />
                    <div id='arrow3' />
                    <p id='texteTuto1'>Choose here !</p>
                    <p id='texteTuto2'>try to find the closest color to the mix of these two color</p>

                </div>
            </>
        )
    }else{return null}
}
export function TutorialR(){
    const [disable,setDisable] = useState(false);
    if(!disable){
        return(
            <>
                <MouseTooltip
                    style={{zIndex:'50000',
                        fontFamily:'ME',
                        color:'black'
                    }}
                    visible={true}
                    offsetX={10}
                    offsetY={10}
                >
                    <span style={{zIndex:'50000'}}>
                        Click to play!
                    </span>
                </MouseTooltip>
                <div id='conteneur-tuto' onClick={() => {setDisable(!disable)}}
                     style={{
                         display:'flex',
                         width:'100vw',
                         height:'100vh',
                         zIndex:'10000',
                         position:'absolute',
                         cursor:'pointer'
                     }}
                >
                    <div id='arrow1' className='r' />
                    <div id='arrow2' className='r' />
                    <div id='arrow3' className='r' />
                    <p id='texteTuto1' className='r'>Now find this color !</p>
                    <p id='texteTuto2' className='r'>Choose there !</p>

                </div>
            </>
        )
    }else{return null}
}