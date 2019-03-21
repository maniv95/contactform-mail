var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var mailAccountUser = 'tt600794@gmail.com'
var mailAccountPassword = 'Test.test95'

var fromEmailAddress = 'tt600794@gmail.com'
var toEmailAddress = ['vaddadi.mani@gmail.com']
// var toEmailAddress = ['vaddadi.mani@gmail.com','varmabsr2009@gmail.com']

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

function Mail(name,email,content){
    var mail = {
    from: fromEmailAddress,
    to: toEmailAddress,
    subject:"Enquiry From Contact Form" ,
    text: [name,email,content]
}

transport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + JSON.stringify(response));
    }

    transport.close();
});
}
exports.Mail=Mail
