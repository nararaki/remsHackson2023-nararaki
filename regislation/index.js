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
goHome();
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

async function goHome() {
    try {
      const response = await fetch('http://localhost:5000/goHome');
      if (!response.ok) {
        console.error('サーバーエラー:', response.statusText);
        return;
      }
      const data = await response.json();
      console.log('取得したデータ:', data);
      if (data) {
        window.location.href = 'home.html';
      }
    } catch (error) {
      console.error('エラーが発生しました:', error);
    }
  }