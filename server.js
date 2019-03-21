var port = process.env.PORT || 8082;
const express = require('express')
var bodyParser = require("body-parser")
var app = express()
var http = require('http');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
app.use(bodyParser.json({limit:"10mb"}));

app.use(bodyParser.urlencoded({limit:"10mb", extended:true, parameterLimit:500}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var mailAccountUser = 'tt600794@gmail.com'
var mailAccountPassword = 'Test.test95'
var fromEmailAddress = 'tt600794@gmail.com'
var toEmailAddress = 'vaddadi.mani@gmail.com'

var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    },
    tls: { 
        rejectUnauthorized: false 
    }
}))

app.post('/SendMail',async function(req,res){
	var name = await req.body.name;
	var email = await req.body.email;
	var content = await req.body.content;
	var json = JSON.stringify(req.body);
	console.log("Fetch Data",json);
	var mail = {
	    from: fromEmailAddress,
	    to: toEmailAddress,
	    subject:"Enquiry Details From Contact Form" ,
	    text: json
    }
    console.log("Mail Detials",mail);
    transport.sendMail(mail, function(error, response){
	    if(error){
	        console.log(error);
	        res.send({
	        	status:400
	        })
	    }else{
	        console.log("Message sent: " + JSON.stringify(response));
	        res.send({
	        	status:200
	        })
	    }

        transport.close();
    });
})

app.listen(port,() => {
  console.log("Backend Server Started at",port,"\n");
})