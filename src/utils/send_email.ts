import nodemailer = require('nodemailer');
import Mail = require('nodemailer/lib/mailer');

export function sendMail(email:string,obj:{subject?:string,text?:string}) {
  console.log(('email'))
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
      console.log( {
        user: process.env.user,
        pass: process.env.password
      })
      nodemailer.createTransport(mailConfig).sendMail(mailOptions, 
                (err:Error|null,
            info:nodemailer.SentMessageInfo) => {
                if (err) {
                  console.log(err)
                reject(err);
                } else {
                resolve(info);
                }
            });
            });
        }