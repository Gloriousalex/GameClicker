

function retrieveFormData (event) {
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
  addRightSideBar(registrationData);
}

function addRightSideBar (userData) {
  const sideBar = document.querySelector('.sideBar');
  sideBar.classList.replace('hiddenBar', 'activeBar')
  sideBarValue =
  `
  <fieldset class="userInfoField">
  <legend>User Detail</legend><h2>User Detail</h2>
  <div>
  <h3>User Name</h3>
  <p class="userInfo">${userData.fname} ${userData.lname}</p>
  <p class="userName">${userData.uname}</p>
  <p class="userInfo">${userData.mail}</p>
  </fieldset>
  `
  sideBar.insertAdjacentHTML('afterbegin',sideBarValue);
}

function registrationStart () {
  const form = document.querySelector('#form');
  formStart = document.querySelector('.form-class')
  formStart.classList.remove('hiddenBar')
  form.addEventListener('submit', retrieveFormData);
}

const localitem = JSON.parse(localStorage.getItem('UserData'));

if (localitem === null) {
  registrationStart();
} else {
  addRightSideBar(localitem)
}



