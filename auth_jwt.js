var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getToken = (emailIDx) =>
  new Promise((resolve, reject) => {
    const emailID = emailIDx;
    console.log(emailID + " <-login/signup");
    if (emailID) {
      resolve(
        jwt.sign({ emailID: emailID }, process.env.secretKey, {
          expiresIn: "1h",
        })
      );
    } else {
      reject(false);
    }
  });

exports.verifyToken = (token) => {
  const fun1 = () => {
    const parse_token = token;
    const fun2 = jwt.verify(
      parse_token,
      process.env.secretKey,
      function (err, decoded) {
        if (err) {
          return false;
        } else {
          return decoded.emailID;
        }
      }
    );
    return fun2;
  };
  const last = fun1();
  return last;
};
