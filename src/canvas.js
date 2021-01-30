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

  stage.on('stagemousedown', event => {
    getSelectedTool().mouseDown(stage, hoverBitmap, event);
    stage.update(event);
  });

  stage.on('stagemouseup', event => {
    getSelectedTool().mouseUp(hoverBitmap);
  });
  
  stage.on('stagemousemove', event => {
    if(getSelectedTool().drawing){
      getSelectedTool().mouseMove(stage, hoverBitmap, event);
    } else { 
      // move hover block
      hoverBitmap.x = Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE;
      hoverBitmap.y = Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE;
    }
    stage.update(event);
  });
}

const update = event => {
  stage.update(event);
}

if(document.getElementById('buildingCanvas')) {
  runIt();
}

