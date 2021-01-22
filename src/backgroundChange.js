import { BACKGROUND } from "./constants";

const changeBackground = () => {
  BACKGROUND.forEach(background => {
    let input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'background');
    input.setAttribute('value', background.name.toLowerCase());
    input.addEventListener('click', event => {
      console.log('click');
      document.getElementById('buildingCanvas').style.backgroundColor = 'unset';
      document.getElementById('buildingCanvas').style.backgroundImage = `url(${background.url})`;
      document.getElementById('buildingCanvas').style.backgroundSize = 'cover';
    });

    let label = document.createElement('label');
    label.innerHTML = background.name;

    document.getElementById('backgroundChange').appendChild(input);
    document.getElementById('backgroundChange').appendChild(label);
  });
}

const colorChanger = () => {
  let input = document.createElement('input');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', 'background');
  input.setAttribute('value', 'custom');

  let secondInput = document.createElement('input');
  secondInput.setAttribute('type', 'text');
  secondInput.setAttribute('name', 'colorChanger');
  secondInput.value = '#ffffff';
  secondInput.addEventListener('keyup', event => {
    console.log('in event change thing', secondInput.value);
    document.getElementById('buildingCanvas').style.backgroundColor = secondInput.value;
    document.getElementById('buildingCanvas').style.backgroundImage = 'unset';
    input.checked = true;
  });

  
  input.addEventListener('click', event => {
    document.getElementById('buildingCanvas').style.backgroundColor = secondInput.value;
    document.getElementById('buildingCanvas').style.backgroundImage = 'unset';
    console.log('clicked');
  });
  input.checked = true;

  document.getElementById('backgroundChange').appendChild(input);
  document.getElementById('backgroundChange').appendChild(secondInput);
}

// If the backgroundChange element is present, create buttons
if(document.getElementById('backgroundChange')) {
  colorChanger();
  changeBackground();
}