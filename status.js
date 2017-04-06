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

// 回答開始かどうかフラグを返す
app.get('/isAnswer', function(req, res){
    res.json(isAnswerTimeFlg);
});

// 回答開始フラグを変える
app.post('/isAnswerChange', function(req, res){
    isAnswerTimeFlg = true;
    res.json(isAnswerTimeFlg);
});


//  特別問題かどうかフラグを返す
app.get('/isSpecial', function(req, res){
    res.json(isSpecialFlg);
});


// 特別問題フラグを変える
app.post('/isSpecialChange', function(req, res){
    isSpecialFlg = true;
    res.json(isSpecialFlg);
});


//standing
// app.listen(3000, function(){
// 	console.log('working!');
// });
app.listen(port);
