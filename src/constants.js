

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
    blockName: "Clay",
    url: "./assets/clay.png"
  },
  {
    blockName: "Ash",
    url: "./assets/ash.png"
  },
  {
    blockName: "Silt",
    url: "./assets/silt.png"
  },
  {
    blockName: "Wood",
    url: './assets/wood.png'
  },
  {
    blockName: "Remove",
    url: 'remove'
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
const BACKGROUND = [
  {
    name: 'Forest',
    url: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/b/b5/Forest_background_2.png/revision/latest/scale-to-width-down/170?cb=20200816173532'
  }, 
  {
    name: 'Underground',
    url: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/a/a7/Underground_background_2.png/revision/latest/scale-to-width-down/120?cb=20200821140126'
  },
  {
    name: 'Cavern',
    url: 'https://static.wikia.nocookie.net/terraria_gamepedia/images/b/bf/Cavern_background_2.png/revision/latest/scale-to-width-down/120?cb=20200821141038'
  }
]

export { 
  SQUARE_SIZE, 
  WIDTH, 
  HEIGHT, 
  BLOCKS,
  BACKGROUND
};
