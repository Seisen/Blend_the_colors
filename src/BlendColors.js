//credit https://gist.github.com/JordanDelcros/518396da1c13f75ee057
// added regex func to convert rgba into list [r,g,b,a]
// added function getResult that return the score
function blendColors(color1,color2) {

// Fast and easy way to combine (additive mode) two RGBA colors with JavaScript.
// [red, green, blue, alpha] based on these maximul values [255, 255, 255, 1].
    let base = rgbaToList(color1);
    let added = rgbaToList(color2);

    let mix = [];
    mix[3] = 1 - (1 - added[3]) * (1 - base[3]); // alpha
    mix[0] = Math.round((added[0] * added[3] / mix[3]) + (base[0] * base[3] * (1 - added[3]) / mix[3]));
    mix[1] = Math.round((added[1] * added[3] / mix[3]) + (base[1] * base[3] * (1 - added[3]) / mix[3]));
    mix[2] = Math.round((added[2] * added[3] / mix[3]) + (base[2] * base[3] * (1 - added[3]) / mix[3]));
    return mix
}

function rgbaToList(x){
    let rgbRegex =  /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    return x.match(rgbRegex).slice(1).map(Number)
}

export function getResult(modeNormal,color1,color2,colorMix){

}