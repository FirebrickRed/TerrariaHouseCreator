// const SQUARE_SIZE = 15;
import {SQUARE_SIZE, WIDTH, HEIGHT, getSelectedBlockUrl} from "./constants.js";
// const DIRT_URL = "https://static.wikia.nocookie.net/terraria_gamepedia/images/4/44/Mud_Block.png/revision/latest/scale-to-width-down/16?cb=20200516215456";
let blocks = [];
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
  console.log('Creating Lines');
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
  let drawing = false;

  stage.on('stagemousedown', event => {
    drawing = true;
    placeBlock(event);
  });

  stage.on('stagemouseup', event => {
    drawing = false;
  });
  
  stage.on('stagemousemove', event => {
    if(drawing) {
      placeBlock(event);
    }
  });
}

const placeBlock = event => {
  console.log('placeblock', getSelectedBlockUrl());
  let bitmap = new createjs.Bitmap(getSelectedBlockUrl());
  stage.addChild(bitmap);

  console.log('bounds', bitmap.getBounds());

  bitmap.x = Math.floor(event.stageX/SQUARE_SIZE)*SQUARE_SIZE;
  bitmap.y = Math.floor(event.stageY/SQUARE_SIZE)*SQUARE_SIZE;
  update();

  blocks.push(bitmap);
  console.log(blocks);
}

const update = event => {
  stage.update(event);
}

if(document.getElementById('buildingCanvas')) {
  console.log('running building canvas script');
  runIt();
}

