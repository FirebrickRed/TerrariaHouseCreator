import { TOOLS, setSelectedTool } from "./constants";

const toolSelection = () => {
  TOOLS.forEach(tool => {
    let input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('name', 'tool');
    input.setAttribute('value', tool.name.toLowerCase());
    if(tool.name.toLowerCase() === 'free draw') {
      input.checked = true;
    }
    input.addEventListener('click', event => {
      setSelectedTool(tool);
    });

    let label = document.createElement('label');
    label.innerHTML = tool.name;

    document.getElementById('toolSelection').appendChild(input);
    document.getElementById('toolSelection').appendChild(label);
  });
}

if(document.getElementById('toolSelection')) {
  toolSelection();
}