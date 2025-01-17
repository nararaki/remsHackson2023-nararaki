const express = require("express");
const fs = require("fs");
const app = express();
var userId;
var passwd;
var IotId;
var _isopen;
var idFromIot;
var count;
var counthairetu;
var mysql = require("mysql2/promise");
let client;
var i;
let session = "yes";
app.post("/sessionregister", (req, res) => {
  if (session != undefined) {
    res.send(session);
    res.send(false);
  } else {
    res.send(true);
  }
});
/**
 * DB接続生成
 * DB操作時に接続、クローズをする
 */
//const con = mysql.createConnection({
//host: "localhost",
//port: 3306,
//user: "root",
//password: "#An37knaP",
//database: "test_db"
//});
//con.connect((err) => {
//if (err) throw err;
//console.log('Connected');
//});
//app.get('/sql-data', (req, res) => {
//  const sql = 'select * from customers'

// con.query()でsql文を実行して結果をresultに格納する
//con.query(sql, (err, result) => {
// エラーが発生した場合はエラーメッセージを返す
//if(err) {
//return res.status(400).json({"error": err.message})
// }
// エラーが発生しなかった場合はsql文で取得したデータを返す
// return res.json(result)
//})
//});

const userInfo = {
  count: count,
  userId: userId,
  passwd: passwd,
  IotId: IotId,
};
//class userInfo{
//constructor(userId,passwd,IotId){
//  this.userId = userId;
//this.passwd = passwd;
//this.IotId = IotId
//}
//}
const userInfos = [];
const Iotinfo = [
  {
    id: idFromIot,
    statusIsOpen: _isopen,
  },
];
//ar newinfo;
//./regislation以下のファイルを取得
app.use(express.static(__dirname + "/regislation"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello");
});
var t;
app.post("/regislation.html", (req, res) => {
  var testcount = req.body.count;
  //newinfo = new userInfo();
  userInfo.count = req.body.number;
  userInfo.userId = req.body.nameinput;
  userInfo.passwd = req.body.passwd;
  console.log(userInfo);
  t = userInfos.push(userInfo);
  console.log(t);
  console.log(userInfos[i]);
  i++;
  for (var j = 0; j < i; j++) {
    console.log(userInfos[j]);
  }
});
app.post("/postIotdata", (req, res) => {
  Iotinfo.id = req.body.id;
  Iotinfo.statusIsOpen = req.body.isOpen;
  console.log(Iotinfo);
});
app.get("/getdata", (req, res) => {});
//こっから先テスト
const userinfos = [];
let i = 0;
app.post("/test", (req, res) => {
  userinfos.push(req.body);
  i++;
  //ユーザーが入力した機器のidと実際のiotidがあっていたらok
  //console.log(req.body);
  //console.log(userinfos[i]);
  if (Iotinfo.id == userInfo.IotId) {
    isIdJudge = true;
  }
  res.send();
});
app.post("/login", () => {
  let loginid = req.body.id;
  let loginpasswd = req.body.passwd;
  for (let j = 0; j < i; j++) {
    if (userinfos[j].nameinput == loginid) {
      if (userinfos[j].passwd == loginpasswd) {
        res.send();
      }
    }
  }
});
app.post("testIotdata", (req, res) => {});
app.listen(5000, () => {
  console.log("ServerStarted");
});
