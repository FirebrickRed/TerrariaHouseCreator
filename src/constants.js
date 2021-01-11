

//canvas size
const WIDTH = 600;
const HEIGHT = 1000;

//grid square size
const SQUARE_SIZE = 15;

//blocks
let selectedBlockUrl = '';
export function getSelectedBlockUrl() {
  return selectedBlockUrl;
}
export function setSelectedBlockUrl(url) {
  selectedBlockUrl = url;
}

const BLOCKS = [
  {
    blockName: "Dirt",
    url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/5/55/Dirt_Block.png/revision/latest/scale-to-width-down/16?cb=20200516211400",
  },
  {
    blockName: "Mud",
    url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/4/44/Mud_Block.png/revision/latest/scale-to-width-down/16?cb=20200516215456",
  },
];
//background images

export { 
  SQUARE_SIZE, 
  WIDTH, 
  HEIGHT, 
  BLOCKS
};
