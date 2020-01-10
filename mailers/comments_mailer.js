const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) => {
    console.log('inside new comment mailer');
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from: 'XXXXXXXXXXXXXXXXX',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err, info) => {
        if(err) {
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
};