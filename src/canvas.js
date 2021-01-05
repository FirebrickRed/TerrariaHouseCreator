const SQUARE_SIZE = 15;
const WIDTH = 600;
const HEIGHT = 1000;
const DIRT_URL = "https://static.wikia.nocookie.net/terraria_gamepedia/images/5/55/Dirt_Block.png/revision/latest/scale-to-width-down/16?cb=20200516211400"
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

  
  stage.on('stagemousedown', event => {
    let bitmap = new createjs.Bitmap(DIRT_URL);
    console.log('uhhhh', event);
    stage.addChild(bitmap);
    bitmap.x = event.stageX;
    bitmap.y = event.stageY;
    update();
  });

  // document.getElementById('buildingCanvas').addEventListener('click', event => {
  //   let burb = new createjs.Bitmap(DIRT_URL);
  //   // burb.onload = update;
  //   console.log(event);
  //   console.log('mouse x,y', event.offsetX, event.offsetY);
  //   stage.addChild(burb);
  //   burb.x = event.offsetX;
  //   burb.y = event.offsetY;
  //   console.log(`burbX: ${burb.x} burby: ${burb.y}`);
  //   console.log(burb);
  //   update();
  // });
}

const update = event => {
  stage.update(event);
}

if(document.getElementById('buildingCanvas')) {
  console.log('running building canvas script');
  runIt();
}

