let hexInput = document.getElementById("hex-input");
let inputColor = document.getElementById("input-color")
let hexValue ="";




function convertHex(hex) {
    if (isValidHex(hex)) {
        let strippedHex = hex.replace('#', ' ')

        if(strippedHex.length === 3) {
            strippedHex = strippedHex[0] + strippedHex[0]
            + strippedHex[1] + strippedHex[1]
            + strippedHex[2] + strippedHex[2];
        }    
        const r  = parseInt(strippedHex.substring(0,2), 16);
        const g  = parseInt(strippedHex.substring(2,4), 16);
        const b  = parseInt(strippedHex.substring(4,6), 16);
        
        return {r,g,b}
    }
    return null
}


const isValidHex = (hex) => {
    if(!hex) return false;
    
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

hexInput.addEventListener("input", () => {
    hexValue = hexInput.value; 
    if (isValidHex(hexValue)){
        inputColor.style.background = hexValue; 
    }
    
    
});

