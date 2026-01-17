/**************** FIREBASE ****************/
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔹 YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyBnosp4iHaCh-W2tSyF2697G5xvIviJqkg",
  authDomain: "the-jubilee-aspect.firebaseapp.com",
  projectId: "the-jubilee-aspect",
  storageBucket: "the-jubilee-aspect.firebasestorage.app",
  messagingSenderId: "191518733883",
  appId: "1:191518733883:web:05e207bedf31f1586ece1e",
  measurementId: "G-LJG52MXYQD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**************** UI REFERENCES ****************/
const screens = document.querySelectorAll('.screen');

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

/**************** UI LOGIC ****************/
function show(id){
  screens.forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id === "dashboard") loadCrew();
}

function login(){
  if(iUser.value==="jathin" && iPass.value==="949812"){
    iUser.value = "";
    iPass.value = "";
    iError.innerText = "";
    show("dashboard");
  } else {
    iError.innerText = "Invalid credentials";
    iPass.value = "";
  }
}

/**************** FIRESTORE LOGIC ****************/
async function joinCrew(){
  await addDoc(collection(db,"crew"),{
    name: iName.value,
    phone: iPhone.value,
    email: iEmail.value,
    gender: iGender.value,
    role: iRole.value,
    exp: iExp.value,
    city: iCity.value,
    time: Date.now()
  });

  alert("OUR team will talk to you");

  iName.value = "";
  iPhone.value = "";
  iEmail.value = "";
  iGender.value = "";
  iRole.value = "";
  iExp.value = "";
  iCity.value = "";

  show("home");
}

async function loadCrew(){
  const box = document.getElementById("crewList");
  box.innerHTML = "";

  const querySnapshot = await getDocs(collection(db,"crew"));
  querySnapshot.forEach(docSnap => {
    const c = docSnap.data();
    const div = document.createElement("div");
    div.className = "crew";
    div.innerHTML = `
      <p><b>Name:</b> ${c.name}</p>
      <p><b>Phone:</b> ${c.phone}</p>
      <p><b>Email:</b> ${c.email}</p>
      <p><b>Gender:</b> ${c.gender}</p>
      <p><b>Role:</b> ${c.role}</p>
      <p><b>Experience:</b> ${c.exp}</p>
      <p><b>City:</b> ${c.city}</p>
      <button class="delete" onclick="removeCrew('${docSnap.id}')">DELETE</button>
    `;
    box.appendChild(div);
  });
}

async function removeCrew(id){
  if(confirm("Remove this crew member?")){
    await deleteDoc(doc(db,"crew",id));
    loadCrew();
  }
                                        }
