import {SQUARE_SIZE, WIDTH, HEIGHT, getSelectedBlockUrl, getSelectedTool} from "./constants.js";
let canvas, stage;
let grid = [];

// function Block() {
//   this.id = "(0,0)";
//   this.x = 0;
//   this.y = 0;
//   this.blockImage = './assets/dirt.png';
// }

const add = (firstNum, secondNum) => {
  return firstNum + secondNum;
}

const notFuzzy = num => {
  return add(num, .5);
}

const createLines = () => {
  let line = new createjs.Shape();
  stage.addChild(line);

  line.graphics.setStrokeStyle(1).beginStroke("black");
  // Vertical lines
  for(let i = 0; i < HEIGHT; i += SQUARE_SIZE) {
    line.graphics.moveTo(notFuzzy(i), notFuzzy(0));
    line.graphics.lineTo(notFuzzy(i), notFuzzy(WIDTH));
  }
  // Horizontal lines
  for(let i = 0; i < WIDTH; i += SQUARE_SIZE) {
    line.graphics.moveTo(notFuzzy(0), notFuzzy(i));
    line.graphics.lineTo(notFuzzy(HEIGHT), notFuzzy(i));
  }

  line.graphics.endStroke();

  stage.update();
}

const runIt = () => {
  canvas = document.getElementById('buildingCanvas');
  stage = new createjs.Stage(canvas);
  stage.enableMouseOver(20);
  createjs.Ticker.setFPS(12);  //set some FPS
  createjs.Ticker.addEventListener("tick", stage); //set autiomatic refresh, so we don't need to use stage.update() frequently

  for(let i = 0; i < 66; i++) {
    grid.push([]);
    for(let j = 0; j < 40; j++) {
      let image = new Image();
      let bitmap = new createjs.Bitmap(image);
      image.onload = () => {
        bitmap.id = `(${i}, ${j})`;
        bitmap.x = i*SQUARE_SIZE;
        bitmap.y = j*SQUARE_SIZE;
        bitmap.gridX = i;
        bitmap.gridY = j;
        bitmap.scaleX = SQUARE_SIZE/image.width;
        bitmap.scaleY = SQUARE_SIZE/image.height;
        
        bitmap.prev;
        bitmap.on('rollover', event => {
          bitmap.prev = bitmap.image.src;
          bitmap.alpha = .5;
          image.src = getSelectedBlockUrl();
        });
        bitmap.on('rollout', event => {
          bitmap.alpha = 1;
          image.src = bitmap.prev;
        });
        
        stage.addChild(bitmap);
      }
      image.src = "./assets/blank.png";
      grid[i].push(bitmap);
    }
  }

  
  stage.on('stagemousedown', event => {
    getSelectedTool().mouseDown(event, grid);
  });

  stage.on('stagemouseup', event => {
    getSelectedTool().mouseUp();
  });

  stage.on('stagemousemove', event => {
    if(getSelectedTool().drawing) {
      getSelectedTool().mouseMove(event, grid);
    } else {
      // console.log('hewowow');
      // grid[Math.floor(event.stageX/SQUARE_SIZE)][Math.floor(event.stageY/SQUARE_SIZE)].on('mouseover', event => {
      //   console.log('uhhhh');
      // });
      // grid[Math.floor(event.stageX/SQUARE_SIZE)][Math.floor(event.stageY/SQUARE_SIZE)].on('rollout', event => {
      //   console.log('byyyeee');
      // });
      // // console.log('hewowow');
      // // grid[Math.floor(event.stageX/SQUARE_SIZE)][Math.floor(event.stageY/SQUARE_SIZE)].alpha = .5;
      // // grid[Math.floor(event.stageX/SQUARE_SIZE)][Math.floor(event.stageY/SQUARE_SIZE)].image.src = getSelectedBlockUrl();
    }
  });

  createLines();  

}

// const runIt = () => {
//   canvas = document.getElementById('buildingCanvas');
//   stage = new createjs.Stage(canvas);

//   createLines();
//   buildIt();
// }

// const buildIt = () => {
//   createjs.Touch.enable(stage);

//   stage.on('stagemousedown', event => {
//     getSelectedTool().mouseDown(stage, hoverBitmap, event);
//     stage.update(event);
//   });

//   stage.on('stagemouseup', event => {
//     getSelectedTool().mouseUp(hoverBitmap);
//   });
  
//   stage.on('stagemousemove', event => {
//     if(getSelectedTool().drawing){
//       getSelectedTool().mouseMove(stage, hoverBitmap, event);
//     } else { 
//       // move hover block
//       hoverBitmap.x = Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE;
//       hoverBitmap.y = Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE;
//     }
//     stage.update(event);
//   });
// }

// const update = event => {
//   stage.update(event);
// }

if(document.getElementById('buildingCanvas')) {
  runIt();
}

