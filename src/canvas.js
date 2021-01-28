import {SQUARE_SIZE, WIDTH, HEIGHT, getSelectedBlockUrl, getSelectedTool} from "./constants.js";
let canvas, stage;

const add = (firstNum, secondNum) => {
  return firstNum + secondNum;
}

const notFuzzy = num => {
  return add(num, .5);
}

const runIt = () => {
  canvas = document.getElementById('buildingCanvas');
  stage = new createjs.Stage(canvas);

  createLines();
  buildIt();
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

let hoverImage = new Image();
export const updateHoverImage = () => {
  hoverImage.src = getSelectedBlockUrl();
  update();
}

const buildIt = () => {
  createjs.Touch.enable(stage);
  let hoverBitmap = new createjs.Bitmap(hoverImage);
  
  hoverImage.onload = function() {
    // Makes hovered block transparent
    hoverBitmap.alpha = 0.5;
    hoverBitmap.scaleX = SQUARE_SIZE/hoverImage.width;
    hoverBitmap.scaleY = SQUARE_SIZE/hoverImage.height;

    stage.addChild(hoverBitmap);
    update();
  }
  hoverImage.src = getSelectedBlockUrl();

  // let drawing = false;
  stage.on('stagemousedown', event => {
    getSelectedTool().mouseDown(stage, hoverBitmap, event);
    // drawing = true;
    // hoverBitmap.visible = false;
    // clickEvent(event);
  });

  stage.on('stagemouseup', event => {
    getSelectedTool().mouseUp(hoverBitmap);
    // drawing = false;
    // hoverBitmap.visible = true;
  });
  
  stage.on('stagemousemove', event => {
    getSelectedTool().mouseMove(stage, hoverBitmap, event);
    // if(drawing) {
    //   clickEvent(event);
    // } else {
    //   //move hover block
    //   hoverBitmap.x = Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE;
    //   hoverBitmap.y = Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE;
    //   update();
    // }
  });
}

// const clickEvent = event => {
//   let obj = stage.getObjectUnderPoint(event.stageX, event.stageY);
//   let isRemovingBlock = getSelectedBlockUrl() == 'remove';
  
//   if(!obj && !isRemovingBlock){
//     placeBlock(event);
//   } else if(obj !== null && isRemovingBlock) {
//     if(!obj.graphics){
//       stage.removeChild(obj);
//     }
//     update();
//   }
// }

// const placeBlock = event => {

//   let image = new Image();

//   image.onload = function() {
//     let bitmap = new createjs.Bitmap(image);

//     bitmap.x = Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE;
//     bitmap.y = Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE;

//     bitmap.scaleX = SQUARE_SIZE/image.width;
//     bitmap.scaleY = SQUARE_SIZE/image.height;

//     stage.addChild(bitmap);
//     update();
//   }

//   image.src = getSelectedBlockUrl();
// }

const update = event => {
  stage.update(event);
}

if(document.getElementById('buildingCanvas')) {
  runIt();
}

