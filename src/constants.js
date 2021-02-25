

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
    name: 'Free Draw',
    drawing: false,
    mouseDown: function(event, grid) {
      this.drawing = true;
      let gridX = Math.floor(event.stageX/SQUARE_SIZE);
      let gridY = Math.floor(event.stageY/SQUARE_SIZE);
      
      grid[gridX][gridY].image.src = getSelectedBlockUrl();
    },
    mouseUp: function() {
      this.drawing = false;
    },
    mouseMove: function(event, grid) {
      let gridX = Math.floor(event.stageX/SQUARE_SIZE);
      let gridY = Math.floor(event.stageY/SQUARE_SIZE);

      grid[gridX][gridY].image.src = getSelectedBlockUrl();
    }
  }, {
    name: "Remove",
    drawing: false,
    mouseDown: function(event, grid) {
      this.drawing = true;
      let gridX = Math.floor(event.stageX/SQUARE_SIZE);
      let gridY = Math.floor(event.stageY/SQUARE_SIZE);

      grid[gridX][gridY].image.src = "./assets/blank.png";
    },
    mouseUp: function() {
      this.drawing = false;
    }, 
    mouseMove: function(event, grid) {
      let gridX = Math.floor(event.stageX/SQUARE_SIZE);
      let gridY = Math.floor(event.stageY/SQUARE_SIZE);

      grid[gridX][gridY].image.src = "./assets/blank.png";
    }
  }, {
    name: "Rectangle",
    drawing: false,
    lastClick: [0,0],
    mouseDown: function(event, grid) {
      if(this.drawing) {
        let point2 = [Math.floor(event.stageX/SQUARE_SIZE), Math.floor(event.stageY/SQUARE_SIZE)];
        let startingX = this.lastClick[0] < point2[0] ? this.lastClick[0] : point2[0];
        let endingX = this.lastClick[0] > point2[0] ? this.lastClick[0] : point2[0];
        let startingY = this.lastClick[1] < point2[1] ? this.lastClick[1] : point2[1];
        let endingY = this.lastClick[1] > point2[1] ? this.lastClick[1] : point2[1];
        console.log(`LastClick: ${this.lastClick} point2: ${point2} startingX: ${startingX} endingX: ${endingX} startingY: ${startingY} endingX: ${endingY}`);

        for(let i = startingX; i <= endingX; i++) {
          grid[i][point2[1]].image.src = getSelectedBlockUrl();
          grid[i][this.lastClick[1]].image.src = getSelectedBlockUrl();
        }
        for(let i = startingY; i <= endingY; i++) {
          grid[point2[0]][i].image.src = getSelectedBlockUrl();
          grid[this.lastClick[0]][i].image.src = getSelectedBlockUrl();
        }
      }

      this.drawing = !this.drawing;
      this.lastClick = [Math.floor(event.stageX/SQUARE_SIZE), Math.floor(event.stageY/SQUARE_SIZE)];
    },
    mouseUp: function() {

    },
    mouseMove: function() {

    }
  }
  // }, {
  //   name: 'Line',
  //   drawing: false,
  //   lastClick: [0,0],
  //   mouseDown: function(stage, hoverBitmap, event) {
  //     console.log('click', event.stageX/SQUARE_SIZE);

  //     if(this.drawing) {
  //       let point2 = [Math.floor(event.stageX/SQUARE_SIZE) * SQUARE_SIZE + (SQUARE_SIZE/2), Math.floor(event.stageY/SQUARE_SIZE) * SQUARE_SIZE+(SQUARE_SIZE/2)]
  //       let slope = (point2[1]-this.lastClick[1])/(point2[0]-this.lastClick[0]);
  //       console.log('in if', this.lastClick, point2, slope);
        
  //       let line = new createjs.Shape();
  //       stage.addChild(line);
  //       line.graphics.setStrokeStyle(3).beginStroke('green');
  //       line.graphics.moveTo(this.lastClick[0], this.lastClick[1]);
  //       line.graphics.lineTo(point2[0], point2[1]);
  //     }

  //     this.drawing = !this.drawing;
  //     this.lastClick = [Math.floor(event.stageX/SQUARE_SIZE) * SQUARE_SIZE+(SQUARE_SIZE/2), Math.floor(event.stageY/SQUARE_SIZE) * SQUARE_SIZE+(SQUARE_SIZE/2)];
  //   },
  //   mouseUp: function(hoverBitmap) {
  //   },
  //   mouseMove: function(stage, hoverBitmap, event) {
  //     // if(this.drawing) {
  //     //   let point2 = [Math.floor(event.stageX/SQUARE_SIZE) * SQUARE_SIZE, Math.floor(event.stageY/SQUARE_SIZE) * SQUARE_SIZE]
  //     //   let slope = (point2[1]-this.lastClick[1])/(point2[0]-this.lastClick[0]);
  //     //   console.log('moving:', this.lastClick, point2, slope);
  //     // }
  //   }
  // }, {
  //   name: 'Rectangle',
  //   drawing: false,
  //   lastClick: [0,0],
  //   mouseDown: function(stage, hoverBitmap, event) {
  //     if(this.drawing) {
  //       hoverBitmap.visible = false;
  //       let point2 = [Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE, Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE];

  //       let startingX = this.lastClick[0] < point2[0] ? this.lastClick[0] : point2[0];
  //       let endingX = this.lastClick[0] > point2[0] ? this.lastClick[0] : point2[0];
  //       for(let i = startingX; i <= endingX; i += SQUARE_SIZE) {
  //         this.placeBlock(stage, event, i, point2[1], false);
  //         this.placeBlock(stage, event, i, this.lastClick[1], false);
  //       }
        
  //       let startingY = this.lastClick[1] < point2[1] ? this.lastClick[1] : point2[1];
  //       let endingY = this.lastClick[1] > point2[1] ? this.lastClick[1] : point2[1];
  //       for(let i = startingY; i < endingY; i += SQUARE_SIZE) {
  //         this.placeBlock(stage, event, point2[0], i, false);
  //         this.placeBlock(stage, event, this.lastClick[0], i, false);
  //       }
  //     }
  //     hoverBitmap.visible = true;

  //     this.drawing = !this.drawing;
  //     this.lastClick = [Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE, Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE];
  //   },
  //   mouseUp: function(hoverBitmap) {

  //   },
  //   mouseMove: function(stage, hoverBitmap, event) {
  //     // if(this.drawing) {

  //     //   hoverBitmap.visible = false;
  //     //   let point2 = [Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE, Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE];
  //     //   let startingX = this.lastClick[0] < point2[0] ? this.lastClick[0] : point2[0];
  //     //   let endingX = this.lastClick[0] > point2[0] ? this.lastClick[0] : point2[0];
  //     //   let startingY = this.lastClick[1] < point2[1] ? this.lastClick[1] : point2[1];
  //     //   let endingY = this.lastClick[1] > point2[1] ? this.lastClick[1] : point2[1];

  //     //   for(let i = startingX; i < endingX; i += SQUARE_SIZE) {
  //     //     let obj = stage.getObjectUnderPoint(i, point2[1]);
  //     //     if(obj) {
  //     //       if(!obj.graphics) {
  //     //         stage.removeChild(obj);
  //     //       }
  //     //     }
  //     //   }
  //     //   for(let i = startingY; i < endingY; i += SQUARE_SIZE) {
  //     //     let obj = stage.getObjectUnderPoint(point2[0], i);
  //     //     if(obj) {
  //     //       if(!obj.graphics) {
  //     //         stage.removeChild(obj);
  //     //       }
  //     //     }
  //     //   }

  //     //   for(let i = startingX; i < endingX; i += SQUARE_SIZE) {
  //     //     this.placeBlock(stage, event, i, point2[1], true);
  //     //     this.placeBlock(stage, event, i, this.lastClick[1], true);
  //     //   }
  //     //   for(let i = startingY; i < endingY; i += SQUARE_SIZE) {
  //     //     this.placeBlock(stage, event, point2[0], i, true);
  //     //     this.placeBlock(stage, event, this.lastClick[0], i, true);
  //     //   }
  //     // }
  //   },
  //   placeBlock: function(stage, event, x, y, isHover) {
  //     let obj = stage.getObjectUnderPoint(x, y);
  //     if(obj) {
  //       if(obj.graphics){
  //         let image = new Image();
  //         image.onload = () => {
  //           let bitmap = new createjs.Bitmap(image);
  //           if(isHover) {
  //             bitmap.alpha = 0.5;
  //           }
  //           bitmap.x = x;
  //           bitmap.y = y;
  //           bitmap.scaleX = SQUARE_SIZE/image.width;
  //           bitmap.scaleY = SQUARE_SIZE/image.height;
  //           stage.addChild(bitmap);
  //           stage.update(event);
  //         }
  //         image.src = getSelectedBlockUrl();
  //       }
  //     }
  //   }
  // }
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
