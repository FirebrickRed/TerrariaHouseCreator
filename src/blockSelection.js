import { BLOCKS, setSelectedBlockUrl } from "./constants";

const blockSelection = () => {
  
  BLOCKS.forEach(block => {
    let input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'block');
    input.setAttribute('value', block.blockName.toLowerCase());
    if(block.blockName.toLowerCase() === 'dirt') {
      input.checked = true;
    }
    input.addEventListener('click', event => {
      setSelectedBlockUrl(block.url);
    });

    let label = document.createElement('label');
    label.innerHTML = block.blockName;

    document.getElementById('blockSelection').appendChild(input);
    document.getElementById('blockSelection').appendChild(label);
  });
}

if(document.getElementById('blockSelection')) {
  blockSelection();
}