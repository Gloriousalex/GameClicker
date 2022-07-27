const formStart = document.querySelector('.form-class');
const container = document.querySelector('.container');

// Functions set

function retrieveFormData (event) { //Retrieve Data from Form and write it to LocalStorage
  event.preventDefault()
  const fname = form.querySelector("[name='fname']"),
        lname = form.querySelector("[name='lname']"),
        uname = form.querySelector("[name='uname']"),
        mail  = form.querySelector("[name='mail']");

  const registrationData = {
    fname: fname.value,
    lname: lname.value,
    uname: uname.value,
    mail : mail.value,
  }
  
  localStorage.setItem('UserData', JSON.stringify(registrationData));
  formStart.classList.add('hiddenBar');  
  run();

}

function addRightSideBar (userData,gameData) { //Adding Right Side Bar, get items from LocalStorage
  const sideBar = document.querySelector('.sideBar');
  sideBar.classList.replace('hiddenBar', 'activeBar');
  const sideBarValue =
  `<div class="userInfoField">
  <fieldset >
  <legend>User Detail</legend>
  <div>
  <h3>User Name</h3>
  <p class="userInfo">${userData.fname} ${userData.lname}</p>
  <h3>Nickname</h3>
  <p class="userInfo">${userData.uname}</p>
  <h3>Mail</h3>
  <p class="userInfo">${userData.mail}</p>
  <h3>Level</h3>
  <p class="userInfo">${gameData.level}</p>
  </fieldset>
  <button id="logout">Log Out</button>
  </div>
  `
  sideBar.insertAdjacentHTML('afterbegin',sideBarValue); 
}

function registrationStart () { //Registration Form
  const form = document.querySelector('#form');
  const rightBar = document.querySelector('.sideBar');
  rightBar.classList.replace('activeBar', 'hiddenBar');

  formStart.classList.remove('hiddenBar')
  form.addEventListener('submit', retrieveFormData);
}

function randomize (count) { //randoms length of array with image
  let num = Math.random()*count;
  return Math.round(num);
}

function findCard (images) { //finds random image from current lvl
  const newImage       = {...images};
  const imageCounter   = images.cards.length -1;
  const randomImg      = randomize(imageCounter);
        newImage.cards = images.cards[randomImg];
  return newImage;
}


function playGame (gameData, userData) { //Main Game function
  if (!gameData) {
    localStorage.setItem('gameData', JSON.stringify(findCard(russians[0])));
    run();
  } else { 
    const gameDiv = document.querySelector('.container');

    const rusTerValue = `<div class ="imageField">
    <h1>${gameData.cards.info}</h1>
    <img src ="./IMG/${gameData.cards.name}" id="imageRus">
    <div id="counter">
    <div class = "Counterclass">
    <p>Clicks left: <strong id="clickcount">${gameData.clickcounts}</strong></p>
    </div>
    </div>
    </div>
    `
    
    gameDiv.insertAdjacentHTML('afterbegin', rusTerValue); //insert main window
    addRightSideBar(userData,gameData); 

    let clickcounts = gameData.clickcounts;
    const logOutBTN = document.querySelector('#logout');
    const imageClicker   = document.querySelector('#imageRus');
    const newTextCounter = document.querySelector('#clickcount');

    imageClicker.addEventListener('click', () => { //main clicker - listener
      imageClicker.classList.add('rotated')

      setTimeout(() => {
        imageClicker.classList.remove('rotated');
      }, 10);

      clickcounts--;
      newTextCounter.textContent = `${clickcounts}`;

      if (clickcounts === 0) {
        const gameLevel = gameData.id+1;  //Прописать победителя

        if (gameLevel > russians.length-1) {
          victory(gameData,userData);
        } else {
        clearData();
        localStorage.setItem('gameData', JSON.stringify(findCard(russians[gameLevel])));
        run();
        }

      }
    });
  
    logOutBTN.addEventListener('click', () => { //logout button with erase data
      clearData();  
      localStorage.removeItem('UserData');
      localStorage.removeItem('gameData');
      run();
      
    });
  }
}

function victory (gameData, userData) {
    clearData();
    const gameDiv = document.querySelector('.container');
    const victoryValue = `<div class ="imageField">
    <div class = "victory">
    <h1>Congratulations, ${userData.uname}!</h1>
    <h3>You defeated all russian morons and bring peace all around the world!</h3>
    <h3>Click "again" to defeat them one more time.</h3>
    <p>some images may change :)</p>
    <button class="btn">Again</button>  
    </div>
    </div>`
    gameDiv.insertAdjacentHTML('afterbegin', victoryValue);
    const againBtn = gameDiv.querySelector('.btn');

    againBtn.addEventListener('click', () => { //Не перезапускает, так как уже удалено геймдата
      const imageData = document.querySelector('.imageField');
      imageData.remove();
      localStorage.removeItem('UserData');
      localStorage.removeItem('gameData');
      run();
    })
}

function clearData () {  //clears data from  storage and some windows
  const sideUserData = document.querySelector(`.userInfoField`);
  const imageData    = document.querySelector('.imageField');
  
  sideUserData.remove();
  imageData.remove();
}

function run() {  //Main Code for playing game
  const userData = JSON.parse(localStorage.getItem('UserData'));
  const gameData = JSON.parse(localStorage.getItem('gameData'));

  if (!userData) {
    registrationStart();
  } else {
    // addRightSideBar(userData);
    playGame(gameData, userData);
  }

}

// Playing Game

run();

