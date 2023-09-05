const firebaseConfig = {
  apiKey: "AIzaSyDn7H2HFy1GzfGShua9SxYAzQeybJqrnb4",
  authDomain: "delivery-robot-b5a61.firebaseapp.com",
  databaseURL: "https://delivery-robot-b5a61-default-rtdb.firebaseio.com",
  projectId: "delivery-robot-b5a61",
  storageBucket: "delivery-robot-b5a61.appspot.com",
  messagingSenderId: "604341999740",
  appId: "1:604341999740:web:e71a7f37459522849bd1f9",
  measurementId: "G-JWLB1MTW9Y"
};
firebase.initializeApp(firebaseConfig);
var parentRef = firebase.database().ref('deliveryrobot');
var contactFormDB = firebase.database().ref("deliveryrobot");
var childRef = firebase.database().ref('deliveryrobot/customer info')
document.getElementById("deliveryaddress").addEventListener("submit", submitForm);
function submitForm(e) {
  e.preventDefault();
var housenumber = getElementVal("housenumber");
saveMessages(housenumber);
document.getElementById("deliveryaddress").reset();
}
const saveMessages = (housenumber) => {
  childRef.update({
    housenumber,
  });
};
const getElementVal = (id) => {
  return document.getElementById(id).value;
};