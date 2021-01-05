//#region Image Url

// Should probably change this to the gampedia wiki images

// if you need more images here is the url where I got these
// https://steamcommunity.com/sharedfiles/filedetails/?id=841032800
const FOREST_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096568452/AC74F597B6163FF1A205145369D8927274EB9583/';
const UNDERGROUND_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096823618/552388934A0A2556A3916D10836699E1746E908B/';
const CAVERN_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096825086/AB6921502542E8F3BF08C4E69365F567477A86AC/';
const UNDERWORLD_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096780792/26BCD2835D53795622F65899570A7EED8F5AC8FC/';
const SPACE_URL = '';
const SNOW_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096632551/635132DF725A977B6DB16702F351A8E61E1CB7C2/';
const ICE_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096751192/9FE4E2718427CE3241D4AEC8AF88DA0C578D9E96/';
const DESERT_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096676921/2A12C6A3429E82BC06724F25C4F5CF25B6A9699F/';
const UNDERGROUND_DESERT_URL = '';
const OCEAN_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096704787/0C8AAFB2952ED23BB8298884BA4C5086FF904A76/';
const JUNGLE_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096601917/A67941940A2A2A77A932FF74B1B541FE5391D413/';
const UNDERGROUND_JUNGLE_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096756223/A82529897139504E4FA13D015ECBB9839DB1686E/';
const TEMPLE_JUNGLE_URL = '';
const MUSHROOM_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096612049/D1FD47D506217833CD6B4C3F033D4D980085DE61/';
const CORRUPTION_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096598413/229B4B72BA00D5585036AD8382874A078CA08E84/';
const UNDERGROUND_CORRUPTION_URL = 'https://steamuserimages-a.akamaihd.net/ugc/779622891021434496/2D26F298E08E0FF5858D9D1DA465053A972B8C8D/';
const CRIMSION_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096695248/0032DA056803853336CD163FF0D3ECE62E5304E8/';
const UNDERGROUND_CRIMSION_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096774944/A817ABBCD87CB06FD25099BA7736F036BB6DF92B/';
const HALLOW_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056096710901/D0D487CEC5F8FB36CA38A131BD6404193D1E924A/';
const UNDERGROUND_HALLOW_URL = 'https://steamuserimages-a.akamaihd.net/ugc/100603056100222064/9BDFB74D7EA8E7BAEBBA1247E08FC5CAC12905EB/';
const DUNGEON_URL = '';

//#endregion


//Creates radio buttons for background image
const createInputs = () => {
  console.log('BC: creating inputs');
  let biomes = ['forest', 'underground', 'cavern'];
  let buttons = '';

  for(let i = 0; i < biomes.length; i++) {
    console.log(`BC: creating button for ${biomes[i]}`);
    buttons += `<input type="radio" name="biome" value="${biomes[i]}" /> <label>${biomes[i]}</label>`;
  }

  console.log('BC: button creation finished');
  return buttons;
}

//Adds Event Listener to Radio Buttons
const addListenerToRadio = () => {
  let radio = document.getElementsByName('biome');

  console.log('BC: Adding Event Listener');
  for(let i = 0; i < radio.length; i++) {
    radio[i].addEventListener('change', (event) => {
      console.log('BC: probably better tbh', event.target.value);
      let url = '';

      switch(event.target.value.toLowerCase()) {
        case 'forest':
          url = FOREST_URL;
          break;
        case 'underground':
          url = UNDERGROUND_URL;
          break;
        case 'cavern':
          url = CAVERN_URL;
          break;
      }

      document.getElementById('buildingCanvas').style.background = `url(${url})`;

      // document.getElementById('buildingCanvas').style.backgroundSize = 'cover';
    });
  }
}

// adds to the div labed backgroundChange
const changeButtons = () => {
  let div = document.getElementById('backgroundChange');

  div.innerHTML = createInputs();
  addListenerToRadio();
}

// If the backgroundChange element is present, create buttons
if(document.getElementById('backgroundChange')) {
  console.log('BC: Running Script');
  changeButtons();
}