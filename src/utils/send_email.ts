import nodemailer = require('nodemailer');
import Mail = require('nodemailer/lib/mailer');

export function sendMail(email:string,obj:{subject?:string,text?:string}) {
    return new Promise((resolve, reject) => {
      let mailOptions:Mail.Options = {
        from: 'fromuser@domain.com',
        to: email,
        subject: obj.subject||'',
        text: obj.text||'',
        html:'<h2>HELLO KITTY !</h2>'        
      };
      let mailConfig = {
        service: 'gmail',
        auth: {
          user: process.env.user||'',
          pass: process.env.password||''
        }
      };
      nodemailer.createTransport(mailConfig).sendMail(mailOptions, 
                (err:Error|null,
            info:nodemailer.SentMessageInfo) => {
                if (err) {
                reject(err);
                } else {
                resolve(info);
                }
            });
            });
        }