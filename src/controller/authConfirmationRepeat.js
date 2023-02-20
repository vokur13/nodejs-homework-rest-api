const { UserModel } = require('../model');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const SENDER = process.env.SENDGRID_SENDER;

const authConfirmationRepeat = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: 400,
      message: 'missing required field email',
    });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (user.verify) {
      return res.status(400).json({
        status: 400,
        message: 'Verification has already been passed',
      });
    }

    const msg = {
      to: user.email, // Change to your recipient
      from: SENDER, // Change to your verified sender
      subject: 'Email verification request repeat',
      text: `Please, confirm your email with request GET /users/verify/${user.verificationToken}`,
      html: `<strong>Please, confirm your email with request GET /users/verify/${user.verificationToken}</strong>`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });

    res.status(200).json({
      status: 200,
      message: 'Verification email re-sent',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = authConfirmationRepeat;
