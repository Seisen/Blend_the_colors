
import './App.css';
import * as React from "react";
import { Form } from 'react-bootstrap';
import {NormalMode} from "./NormalMod";
import {ReverseMode} from "./ReverseMode";

function App() {
    const [normalmode,setmode] = React.useState(false);

    return(
        <>

            {normalmode ? <NormalMode/> : <ReverseMode/>}
        </>
    );
}

export default App;
