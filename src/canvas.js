// const SQUARE_SIZE = 15;
import {SQUARE_SIZE, WIDTH, HEIGHT, getSelectedBlockUrl} from "./constants.js";
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

const buildIt = () => {
  createjs.Touch.enable(stage);
  let drawing = false;

  stage.on('stagemousedown', event => {
    let obj = stage.getObjectUnderPoint(event.stageX, event.stageY);

    drawing = true;
    if(!obj){
      placeBlock(event);
    }
  });

  stage.on('stagemouseup', event => {
    drawing = false;
  });
  
  stage.on('stagemousemove', event => {
    if(drawing) {
      let obj = stage.getObjectUnderPoint(event.stageX, event.stageY);
      if(obj === null) {
        placeBlock(event);
      }
    }
  });
}

const placeBlock = event => {

  let image = new Image();

  image.onload = function() {
    let bitmap = new createjs.Bitmap(image);

    bitmap.x = Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE;
    bitmap.y = Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE;

    bitmap.scaleX = 15/image.width;
    bitmap.scaleY = 15/image.height;

    stage.addChild(bitmap);
    update();
  }

  image.src = getSelectedBlockUrl();
}

const update = event => {
  stage.update(event);
}

if(document.getElementById('buildingCanvas')) {
  runIt();
}

