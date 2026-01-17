const screens = document.querySelectorAll('.screen');

/* SAFE INPUT REFERENCES */
const iName   = document.getElementById('name');
const iPhone  = document.getElementById('phone');
const iEmail  = document.getElementById('email');
const iGender = document.getElementById('gender');
const iRole   = document.getElementById('role');
const iExp    = document.getElementById('exp');
const iCity   = document.getElementById('city');

const iUser  = document.getElementById('username');
const iPass  = document.getElementById('password');
const iError = document.getElementById('error');

function show(id){
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id === 'dashboard') loadCrew();
}

function login(){
  if(iUser.value === "jathin" && iPass.value === "949812"){
    iUser.value = "";
    iPass.value = "";
    iError.innerText = "";
    show('dashboard');
  }else{
    iError.innerText = "Invalid credentials";
    iPass.value = "";
  }
}

function joinCrew(){
  const crew = {
    name:   iName.value,
    phone:  iPhone.value,
    email:  iEmail.value,
    gender: iGender.value,
    role:   iRole.value,
    exp:    iExp.value,
    city:   iCity.value
  };

  let list = JSON.parse(localStorage.getItem('crew')) || [];
  list.push(crew);
  localStorage.setItem('crew', JSON.stringify(list));

  alert("OUR team will talk to you");

  /* CLEAR FORM */
  iName.value = "";
  iPhone.value = "";
  iEmail.value = "";
  iGender.value = "";
  iRole.value = "";
  iExp.value = "";
  iCity.value = "";

  show('home');
}

function loadCrew(){
  const box = document.getElementById('crewList');
  box.innerHTML = "";

  let list = JSON.parse(localStorage.getItem('crew')) || [];

  list.forEach((c, i) => {
    const div = document.createElement('div');
    div.className = 'crew';
    div.innerHTML = `
      <p><b>Name:</b> ${c.name}</p>
      <p><b>Phone:</b> ${c.phone}</p>
      <p><b>Email:</b> ${c.email}</p>
      <p><b>Gender:</b> ${c.gender}</p>
      <p><b>Role:</b> ${c.role}</p>
      <p><b>Experience:</b> ${c.exp}</p>
      <p><b>City:</b> ${c.city}</p>
      <button class="delete" onclick="removeCrew(${i})">DELETE</button>
    `;
    box.appendChild(div);
  });
}

function removeCrew(index){
  if(confirm("Remove this crew member?")){
    let list = JSON.parse(localStorage.getItem('crew')) || [];
    list.splice(index, 1);
    localStorage.setItem('crew', JSON.stringify(list));
    loadCrew();
  }
}