//load module
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + '/src'));
app.use(bodyParser.urlencoded({extended: true}));
var port = process.env.PORT || 3000;
var isAnswerTimeFlg = false; // 回答開始フラグ
var isSpecialFlg = false; // 特別問題フラグ

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// 回答開始かどうかフラグを返す
app.get('/isAnswer', function(req, res){
    res.json(isAnswerTimeFlg);
});

// 回答開始フラグを変える
app.post('/isAnswerChange', function(req, res){
    if(isAnswerTimeFlg === false){
        isAnswerTimeFlg = true;
    }
    else {
        isAnswerTimeFlg = false;
    }
    res.json(isAnswerTimeFlg);
});


//  特別問題かどうかフラグを返す
app.get('/isSpecial', function(req, res){
    res.json(isSpecialFlg);
});


// 特別問題フラグを変える
app.post('/isSpecialChange', function(req, res){
    if(isSpecialFlg === false){
        isSpecialFlg = true;
    }
    else{
        isSpecialFlg = false;
    }

    res.json(isSpecialFlg);
});

app.get('/isCheck', function(req, res){
    var result = {
        'isAnswer': isAnswerTimeFlg,
        'isSpecial': isSpecialFlg
    }
    res.json(result);
});

//standing
// app.listen(3000, function(){
// 	console.log('working!');
// });
app.listen(port);
