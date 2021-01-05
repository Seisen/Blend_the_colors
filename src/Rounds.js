
export function get_colors(mode){
    try{
        let c2;
        let c0 = document.getElementsByClassName('rightb')[0].style.backgroundColor.replace(')', ', 1)').replace('rgb', 'rgba');
        let c1 = document.getElementsByClassName('leftb')[0].style.backgroundColor.replace(')', ', 1)').replace('rgb', 'rgba');
        if(mode) {
             c2 = document.getElementsByClassName('rcp__well')[0].style.backgroundColor.replace(')', ', 1)').replace('rgb', 'rgba');
        }else{
             c2 = document.getElementById('noname').style.backgroundColor.replace(')', ', 1)').replace('rgb', 'rgba');
        }
        return[c0,c1,c2]
    }catch (e){
        //pass
    }
}