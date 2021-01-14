

//canvas size
const WIDTH = 600;
const HEIGHT = 1000;

//grid square size
const SQUARE_SIZE = 15;

//blocks
const BLOCKS = [
  {
    blockName: "Dirt",
    url: './assets/dirt.png'
  },
  {
    blockName: "Mud",
    url: "./assets/mud.png"
  },
  {
    blockName: "Wood",
    url: './assets/wood.png'
  }
];

let selectedBlockUrl = BLOCKS[0].url;
export function getSelectedBlockUrl() {
  return selectedBlockUrl;
}
export function setSelectedBlockUrl(url) {
  selectedBlockUrl = url;
}


//background images

export { 
  SQUARE_SIZE, 
  WIDTH, 
  HEIGHT, 
  BLOCKS
};
