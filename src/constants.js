

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


//Tools
const TOOLS = [
  {
    id: 0,
    name: 'Free Draw',
    drawing: false, 
    mouseDown: function(stage, hoverBitmap, event) {
      this.drawing = true;
      hoverBitmap.visible = false;
      this.clickEvent(stage, event);
    },
    mouseUp: function(hoverBitmap) {
      this.drawing = false;
      hoverBitmap.visible = true;
    },
    mouseMove: function(stage, hoverBitmap, event) {
      if(this.drawing) {
        this.clickEvent(stage, event);
      } else {
        // move hover block
        hoverBitmap.x = Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE;
        hoverBitmap.y = Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE;
        stage.update(event);
      }
    },
    clickEvent: function(stage, event) {
      let obj = stage.getObjectUnderPoint(event.stageX, event.stageY);
      if(!obj) {
        let image = new Image();
        image.onload = () => {
          let bitmap = new createjs.Bitmap(image);
          bitmap.x = Math.floor(event.stageX/SQUARE_SIZE) * SQUARE_SIZE;
          bitmap.y = Math.floor(event.stageY/SQUARE_SIZE) * SQUARE_SIZE;
          bitmap.scaleX = SQUARE_SIZE/image.width;
          bitmap.scaleY = SQUARE_SIZE/image.height;
          stage.addChild(bitmap);
          stage.update(event);
        }
        image.src = getSelectedBlockUrl();
      }
    }
  }, {
    id: 1,
    name: 'Remove',
    drawing: false,
    mouseDown: function(stage, hoverBitmap, event) {
      this.drawing = true;
      hoverBitmap.visible = false;
      
      let obj = stage.getObjectUnderPoint(event.stageX, event.stageY);
      if(obj){
        if(!obj.graphics) {
          stage.removeChild(obj);
        }
      }
      stage.update(event);
    },
    mouseUp: function(hoverBitmap) {
      this.drawing = false;
      hoverBitmap.visible = true;
    },
    mouseMove: function(stage, hoverBitmap, event) {
      if(this.drawing) {
        let obj = stage.getObjectUnderPoint(event.stageX, event.stageY);
        if(obj){
          if(!obj.graphics) {
            stage.removeChild(obj);
          }
        }
      } else {
        hoverBitmap.x = Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE;
        hoverBitmap.y = Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE;
      }
      stage.update(event);
    }
  }
];

let selectedTool = TOOLS[0];
export function getSelectedTool() {
  return selectedTool;
}
export function setSelectedTool(tool) {
  selectedTool = tool;
}

export { 
  SQUARE_SIZE, 
  WIDTH, 
  HEIGHT, 
  BLOCKS,
  BACKGROUND,
  TOOLS
};
