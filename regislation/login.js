const baseurl = "http://localhost:5000/login";
const geturl = "http://localhost:5000/ischangeurl";
const isopenurl = "http://localhost:5000/home.html";
var count = 0;
const passwdbutton = document.getElementById("passwdbutton");
const passwdinput = document.getElementById("passwdinput");
const nameinput = document.getElementById("nameinput");
let _istranssite = false;
passwdbutton.addEventListener("click", async () => {
  count++;
  const username = nameinput.value;
  const userpasswd = passwdinput.value;
  const userdata = {
    number: count,
    nameinput: username,
    passwd: userpasswd,
  };
  console.log("c");
  await postpassid(userdata);
  console.log("a");
  const body = await isidcorrect();
  console.log(body);
  _istranssite = body.isIdJudge;
  if (_istranssite) {
    window.location.href = isopenurl;
  } else {
    alert("idとパスワードが違います サインアップはしましたか？");
  }
  //console.log(responce);
  nameinput.value = "";
  passwdinput.value = "";
  iotnumber.value = "";
});
async function postpassid(userdata) {
  await fetch(baseurl, {
    method: "POST",
    body: JSON.stringify(userdata),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //console.log("yes");
}
async function isidcorrect() {
  const response = await fetch(geturl);
  const body = await response.json();
  return body;
}
