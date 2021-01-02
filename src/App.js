import ColorPicker from '@radial-color-picker/react-color-picker';
import '@radial-color-picker/react-color-picker/dist/react-color-picker.min.css';
import './App.css';
import * as React from "react";
import { Form } from 'react-bootstrap';

function App() {
  const [color, setColor] = React.useState({
    hue: 90,
    saturation: 100,
    luminosity: 50,
    alpha: 1,
  });
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

  return (
      <>
        <ColorPicker {...color} onInput={onInput} />

        <div>
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



      </>
  );
}
function hslToRgb(h, s, l){
    let r, g, b;
    h=h/360;
    s=s/100;
    l=l/100;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        let hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return 'rgba('+r*255+','+g*255+','+b*255+',1)'
}
export default App;
