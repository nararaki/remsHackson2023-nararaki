const baseurl = "http://localhost:5000/regislation.html";
var count = 0;
const passwdbutton = document.getElementById('passwdbutton');
const passwdinput = document.getElementById('passwdinput');
const nameinput = document.getElementById('nameinput');
const Iotinput = document.getElementById('iotnumber');
passwdbutton.addEventListener('click',()=>{
count++;
const username = nameinput.value;
const userpasswd = passwdinput.value;
const Iotnumber = Iotinput.value;
const userdata = {
    nameinput: username,
    passwd: userpasswd,
    Iotid: Iotnumber,
};
postpassid(userdata);
nameinput.value = '';
passwdinput.value = '';
Iotinput.value = '';
});
function postpassid(userdata){
    return fetch(baseurl,{
method:'POST',
body: JSON.stringify(userdata),
headers: {
    "Content-Type": "application/json",
  },
    });
}

