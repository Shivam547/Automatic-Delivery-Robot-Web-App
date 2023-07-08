const firebaseConfig = {
    apiKey: "AIzaSyDn7H2HFy1GzfGShua9SxYAzQeybJqrnb4",
    authDomain: "delivery-robot-b5a61.firebaseapp.com",
    databaseURL: "https://delivery-robot-b5a61-default-rtdb.firebaseio.com",
    projectId: "delivery-robot-b5a61",
    storageBucket: "delivery-robot-b5a61.appspot.com",
    messagingSenderId: "604341999740",
    appId: "1:604341999740:web:d463e709377e19959bd1f9",
    measurementId: "G-WGJQCJX02D"
  };

  firebase.initializeApp(firebaseConfig);

var shopFormDB = firebase.database().ref("deliveryrobot");

document.getElementById("btn").addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault();

  var shop  = getElementVal("btn");
 

  saveMessages(shop);

  document.getElementById("btn").reset();
}

const saveMessages = (shop) => {
  var newshopForm = shopFormDB.push();

  newshopForm.set({
     shop,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};