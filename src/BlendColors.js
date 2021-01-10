
import {normal} from "color-blend";
//credit https://gist.github.com/JordanDelcros/518396da1c13f75ee057
// added regex func to convert rgba into list [r,g,b,a]
// added function getResult that return the score
function blendColors(color1,color2) {

    let base = rgbaToList(color1);
    let added = rgbaToList(color2);

    let c = {r: base[0], g: base[1], b: base[2], a: 0.5}
    let d = {r: added[0], g: added[1], b: added[2], a: 0.5}

    let mix = normal(c,d);

    return [mix.r,mix.g,mix.b]
}
export function blendColorsRGB(color1,color2){
    let l = blendColors(color1,color2);
    return "rgb("+l[0]+","+l[1]+","+l[2]+")"
}

function rgbaToList(x){
    let rgbRegex =  /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    return x.match(rgbRegex).slice(1).map(Number)
}


/*

  based on the repo https://github.com/antimatter15/rgb-lab
  The code is based on the 1994 version of DeltaE.

  more information on this algorithm on http://zschuessler.github.io/DeltaE/learn/

 */

function deltaE(rgbA, rgbB) {
    let labA = rgb2lab(rgbA);
    let labB = rgb2lab(rgbB);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb){
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

export function getResult(color1,color2,color0){
    /**
     * @param {string}  color1 rgba
     * @param {string} color2 rgba
     * @param {string} colorMix rgba
     */
    let c1 = blendColors(color1,color2) ;
    let c2 = rgbaToList(color0);
    let delta = deltaE([c1[0],c1[1],c1[2]],[c2[0],c2[1],c2[2]])

    //invert to get the score

    let res = Math.abs(delta-100);

    return res

}