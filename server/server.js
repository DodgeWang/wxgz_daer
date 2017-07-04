var express = require('express');
var app = express();
var request = require('request');
var sign = require('./sign.js');


app.set('port', process.env.PORT || 5000);



app.get('/getSignature', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	// var url = req.protocol + '://' + req.get('host') + req.originalUrl;
	var url = "http://www.jxchaguan.com/weixin/index.html";
	// console.log(req)
	console.log(url)
	var APPID = "wxefe5a7d37bd36609";
    var APPSECRET = "5e0851e060ddc345985cdee2f525bb00"
    request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        	body = JSON.parse(body);
            var ACCESS_TOKEN = body.access_token;
            request('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token='+ACCESS_TOKEN+'&type=jsapi',function (error, response, body) {
            	if (!error && response.statusCode == 200) {
            		body = JSON.parse(body);
            		var config = sign(body.ticket, url);
            		res.json(config);
            	}
            })
        }
    })
});


app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
         app.get('port') + '; press Ctrl-C to terminate.' );
});