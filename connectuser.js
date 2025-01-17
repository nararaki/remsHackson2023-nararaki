const { log } = require("console");
const express = require("express");
const fs = require("fs");
const app = express();
const crypto = require("crypto");
const webPush = require("web-push");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "nararaki",
  password: "",
  database: "test_db",
});
connection.connect(function (error) {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("connected");
});

let data = [];
var userId;
var passwd;
var IotId;
var _isopen;
var idFromIot;
var count;
var isIdJudge;
const userInfo = {
  count: count,
  userId: userId,
  passwd: passwd,
  IotId: IotId,
};
const loginInfo = {
  userId: userId,
  passwd: passwd,
};
const Iotinfo = {
  id: idFromIot,
  statusIsOpen: _isopen,
};
//ar newinfo;
//./regislation以下のファイルを取得
app.use(express.static(__dirname + "/regislation"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let session = "yes";
app.post("/sessionregister", (req, res) => {
  if (session != undefined) {
    res.send(session);
    res.send(false);
  } else {
    res.send(true);
  }
});
app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/register", (req, res) => {
  let iotdata = [];
  userInfo.count = req.body.number;
  userInfo.userId = req.body.nameinput;
  userInfo.passwd = req.body.passwd;
  userInfo.IotId = req.body.Iotid;
  getdata();
  connection.query("select iotid from user", (error, results) => {
    if (error) {
      console.log(error);
    }
    for(let i = 0;i < results.length;i++){
iotdata.push(results[i]);
    }
  });
    console.log(iotdata[1]);
  //一致するiotidが見つかったらユーザ登録完了
  for (let i = 0; i < 6; i++) {
    console.log(iotdata[i]);
    if (iotdata[i].iotid == userInfo.IotId) {
      connection.query(
        `UPDATE user SET id  = ${userInfo.userId},passwd = ${userInfo.passwd} WHERE iotid = ${userInfo.Iotdata}`,
        (error, results) => {},
      );
      isIdJudge = true;
      res.send(isIdJudge);
      res.end();
    }
  }
  //session = crypto.randomUUID();
  //res.cookie("session", session);
  res.send(isIdJudge);
  res.send();
});
app.post("/login", (req, res) => {
  let alldata;
  loginInfo.userId = req.body.username;
  loginInfo.passwd = req.body.userpasswd;
  connection.query("select * from user", (error, results) => {
    if (error) {
      throw error;
    } else {
       alldata = results;
    }
  });
  for(let i = 0;i < alldata.length;i++){
    if(loginInfo.userId == alldata[i].id){
      if(loginInfo.userId == alldata[i].passwd){
        isIdJudge = true;
        res.send(isIdJudge);
        session = crypto.randomUUID();
        res.cookie("session", session);
        res.end();
      }
    }
  }
  res.send(false);
});
app.get("/ischangeurl", (req, res) => {
  console.log("aaa");
  console.log({ isIdJudge });
  res.send({ isIdJudge });
  res.end();
});
app.post("/postIotdata", (req, res) => {
  console.log("hoge");
  console.log(req.body);
  Iotinfo.statusIsOpen = req.body.state;
  Iotinfo.id = parseInt(req.body.chipID);
  console.log(Iotinfo);
  connection.query(
    `insert into user (iotid) values(${Iotinfo.id})`,
    (error, results) => {
      if (error) console.log("error");
    },
  );
  res.send();
});
app.get("/getdata", (req, res) => {
  const userSession = "cookieのsessionの値";
  if (true || userSession == session) {
    res.send(Iotinfo);
  } else {
    res.sendStatus(400);
  }
});
app.get("/home", (req, res) => {
  if (req.body != session) {
    res.send(404);
  } else {
    res.send(true);
  }
});
app.get("/goHome", (req, res) => {
  if (userInfo.IotId == 1) {
    res.send(true);
    console.log("一致しました");
  } else {
    res.send(false);
    console.log("一致しませんでした");
  }
});
const vapidKeys = {
  publicKey:
    "",
  privateKey: "",
};
webPush.setVapidDetails(
  "",
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
let subscription;
let isTimerSet = false; // Timerが設定されているかどうかをチェックするフラグ
app.post("/subscribe", (req, res) => {
  subscription = req.body;
  console.log("Received Subscription:", subscription);
  res.status(201).json({});
  // Timerがまだ設定されていない場合にのみ、タイマーを設定
  if (!isTimerSet) {
    isTimerSet = true; // Timerが設定されているとマークする
    setInterval(async () => {
      if (subscription) {
        // subscriptionが存在する場合にのみ通知を送信
        let payload;

        // ここでIotinfo.statusIsOpenの値に応じた通知内容を設定
        if (Iotinfo.statusIsOpen) {
          payload = JSON.stringify({ title: "閉じています！" });
        } else {
          payload = JSON.stringify({ title: "開いています！" });
        }

        try {
          await webPush.sendNotification(subscription, payload);
        } catch (error) {
          console.error("Push Error: ", error);
        }
      }
    }, 20000); // 20秒ごとに実行  }
  }
});
app.listen(5000, "0.0.0.0", () => {
  console.log("ServerStarted");
});
function getdata() {
  connection.query("SELECT * FROM user", (error, results) => {
    let length = results.length;
    for (let i = 0; i < length; i++) {
      data.push(results[i]);
    }
    console.log(data);
  });
}
