const hexInput = document.getElementById("hex-input");
const inputColor = document.getElementById("input-color")
const sliderText = document.getElementById('sliderText');
const slider = document.getElementById('slider');
const alteredColor = document.getElementById('altered-color');
const alteredColorText = document.getElementById('alteredColorText');


// function to convert Hex to RGB 
function convertHexToRGB(hex) {
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


// funtion to convert RGB to Hex (it is used 
  //in the the fucntion alteredColor)
function convertRGBToHex(r, g, b) {
      const firstPair = ("0" + r.toString(16)).slice(-2);
      const secondPair = ("0" + g.toString(16)).slice(-2);
      const thirdPair = ("0" + b.toString(16)).slice(-2);
  
      const hex = "#" + firstPair + secondPair + thirdPair;
      return hex;
}

//function to verify if the hex is valid or not 
const isValidHex = (hex) => {
    if(!hex) return false;
    
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

//Event on the input to change  de color of InpurColor 
hexInput.addEventListener('input', () => {
  
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;
    
    const strippedHex = hex.replace('#', '');
  
    inputColor.style.backgroundColor = "#" + strippedHex;  
  })


  //function altered color 
const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHexToRGB(hex);
    
    const amount = Math.floor((percentage/100) * 255);
    
    const newR = increaseWithin0To255(r,amount);
    const newG = increaseWithin0To255(g,amount);
    const newB = increaseWithin0To255(b,amount)
    console.log({newR, newG, newB});
    return convertRGBToHex(newR, newG, newB);
  }
  

  //function that permit to choose the intervall of r g and b between 0 to 255 (it is used 
  //in the the fucntion alteredColor)
  const increaseWithin0To255 = (hex, amount) => {
    // const newHex = hex + amount;
  // if(newHex > 255) return 255;
  // if(newHex < 0) return 0;
  // return newHex;
    return Math.min(255, Math.max(0, hex + amount));
  }


//Event on the slider to altered  the color 
slider.addEventListener('input', () => {
   
    if(!isValidHex(hexInput.value)) return;
  
    sliderText.textContent = `${slider.value}%`;
    
    //get the altered hex value
    const alteredHex = alterColor(hexInput.value, slider.value);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`; 
    //update the altered color
})

