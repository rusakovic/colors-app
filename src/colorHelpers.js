// {
//   paletteName: "Material UI Colors",
//   id: "material-ui-colors",
//   emoji: "🎨",
//   colors: [
//     { name: "red", color: "#F44336" },
//     { name: "pink", color: "#E91E63" },
//     { name: "purple", color: "#9C27B0" },
//     { name: "deeppurple", color: "#673AB7" },
//     { name: "indigo", color: "#3F51B5" },
//     { name: "blue", color: "#2196F3" },
//     { name: "lightblue", color: "#03A9F4" },
//     { name: "cyan", color: "#00BCD4" },
//     { name: "teal", color: "#009688" },
//     { name: "green", color: "#4CAF50" },
//     { name: "lightgreen", color: "#8BC34A" },
//     { name: "lime", color: "#CDDC39" },
//     { name: "yellow", color: "#FFEB3B" },
//     { name: "amber", color: "#FFC107" },
//     { name: "orange", color: "#FF9800" },
//     { name: "deeporange", color: "#FF5722" },
//     { name: "brown", color: "#795548" },
//     { name: "grey", color: "#9E9E9E" },
//     { name: "bluegrey", color: "#607D8B" }
//   ]
// }

import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

 let generatePalette = (starterPalette) => {
   let newPalette ={
     paletteName: starterPalette.paletteName,
     id: starterPalette.id,
     emoji: starterPalette.emoji,
     colors: {}
    }
    
    // loop all color levels and create empty array
    for(let level of levels) {
      newPalette.colors[level] = [];
    }
  for(let color of starterPalette.colors) {
    let scale = getScale(color.color, 10).reverse() //to make the array from light to dark. by default chroma return from dark to light.
    for(let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(), // css() converts the color to rgba format
        rgba: chroma(scale[i])
          .css()
          .replace('rgb', 'rgba')
          .replace(")", ",1.0)")
      })
    }
  }
  return newPalette;
}

// we should take our original 'hexColor' and create the range from 'Darkest of our color' - 'Our color' - 'White color'
// and return the array [black, hexColor, white] https://vis4.net/chromajs/#chroma-scale
let getRange = (hexColor) => {
  const end = '#fff';
  return [
    chroma(hexColor)
      .darken(1.4) // pure black is a very dark color -> we'll get very dark color range. so, we make black more lighter
      .hex(),
    hexColor,
    end
  ];
}

// we generate scale from our range from getRange(hexColor) function
let getScale = (hexColor, numOfColors) => {
  return chroma
    .scale(getRange(hexColor)) // we get the gradient of the colors
    .mode("lab") // more info about color modes https://vis4.net/chromajs/#scale-mode
    .colors(numOfColors) // we generate the array of exact colors we gor from color .scale. 'numOfColors' = volume of scale https://vis4.net/chromajs/#scale-colors
    
}

export { generatePalette };