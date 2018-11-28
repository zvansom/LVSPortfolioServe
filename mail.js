const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
// For the currently non-working promise based mail.
// const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/views/${filename}.pug`, options.body);
  const inlined = juice(html);
  return inlined;
};

exports.send = (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const { email, to, subject } = options.body;
  const mailOptions = {
    from: email,
    to,
    subject,
    html,
    text
  };

  // Callback based version of sendMail which works
  transport.sendMail(mailOptions, (err, info) => {
    if(err) { 
      console.log(err);
      return err; 
    }
    console.log('info', info);
    return info;
  });

  // ! This is the promisified version. It doesn't work, but I don't know why.
  // const sendMail = promisify(transport.sendMail, transport);
  // return sendMail(mailOptions);
};
