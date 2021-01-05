
import './App.css';
import * as React from "react";

import {NormalMode} from "./NormalMod";
import {ReverseMode} from "./ReverseMode";


function App() {
    const [normalmode,setmode] = React.useState(true);

    const handleClick = () => {

        setmode(prevState => {return(!prevState)})
    };

    return(
        <>

            <button className={normalmode.toString()} id='changeMode'  onClick={handleClick}>CHANGE MODE</button>

            {normalmode ? <NormalMode  /> : <ReverseMode/>}

        </>
    );
};

export default App;
