import nodemailer from "nodemailer";
import emailTemp from "./signupEmailTemp";

export default (token:string, email:string) => {
  return new Promise((resolve, reject) => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, mailAcc) => {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: process.env.smtp,
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.nodemailerEmail, // generated ethereal user
          pass: process.env.nodemailerPw // generated ethereal password
        }
      });
      console.log(process.env.nodemailerEmail, process.env.nodemailerPw);
      // setup email data with unicode symbols
      const mailOptions = {
        from: process.env.nodemailerEmail, // sender address
        to: email, // list of receivers
        subject: `thanks for signing up (: `, // Subject line
        html: emailTemp(process.env.server || "", token, email)
      }; //

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log({ error });
          reject({
            error
          });
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
      resolve({
        msg: "check your email"
      });
    });
  });
};
