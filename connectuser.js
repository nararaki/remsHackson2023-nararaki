const express = require("express");
const fs = require("fs");
const app = express();
var userId;
var passwd;
var IotId;
var  _isopen=true;
var idFromIot;
// require('mysql2')でコールバック関数を使う方法だと動かなかった
var mysql = require('mysql2/promise');
let client;
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
    //console.log('Connected')
//});
//app.get('/sql-data', (req, res) => {
    //const sql = 'select * from customers'
  
    // con.query()でsql文を実行して結果をresultに格納する
    //con.query(sql, (err, result) => {
      // エラーが発生した場合はエラーメッセージを返す
      //if(err) {
        //return res.status(400).json({"error": err.message})
      //}
      // エラーが発生しなかった場合はsql文で取得したデータを返す
      //return res.json(result)
    //})
  //});


const userInfo = {
    userId: userId,
    passwd: passwd,
    IotId: IotId,
};
const Iotinfo = {
id: idFromIot,
statusIsOpen: _isopen,
};
//./regislation以下のファイルを取得
app.use(express.static(__dirname + '/regislation'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',(req,res)=>{
    res.send("Hello");
});
app.post('/regislation.html',(req,res)=>{
    userInfo.userId = req.body.nameinput;
    userInfo.passwd = req.body.passwd;
    userInfo.IotId = req.body.Iotid;
console.log(userInfo);
});
app.post('/postIotdata',(req,res)=>{
 Iotinfo.id = req.body.id;
 Iotinfo.statusIsOpen = req.body.isOpen;
 console.log(Iotinfo);
});
app.get('/getdata',(req,res)=>{
    if(Iotinfo.id == userInfo.userId){
    res.send(Iotinfo.statusIsOpen);
    console.log(Iotinfo.statusIsOpen);
    } else {
      console.log("一致しませんでした。");
    }

});
app.get('/goHome',(req,res)=>{
  if(userInfo.IotId == 1) {
    res.send(true);
    console.log("一致しました");
  } else {
    res.send(false);
    console.log("一致しませんでした");
  }
})
app.listen(5000,()=>{
console.log("ServerStarted");
});