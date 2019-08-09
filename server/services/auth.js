//routes/auth.js
const jwt = require("jsonwebtoken");
const { User } = require("../db/models/UserSchema");
const activateAccountEmail = require("./activateAccountEmail");
const resetPasswordEmailHandler = require("./resetPasswordEmail");

class Auth {

  static login(req, res, next) {
    const { username } = req.body;
    const user = {
      username
    };
    
    const token = jwt.sign(user, process.env.cookieParserSecret);
    return res.status(200).json({
      user,
      token
    });
  }


  static signup(req, res, next) {
    const {
      body: { username, password }
    } = req;

    User.register(
      new User({
        username,
        password,
        email: username,
        active: true // change to false if you want the user to activate through email
      }), password, async (error, account) => {
        if (error) {
          return res.status(500).json({ message: "ERR", error });
        }

        const user = { username };
        const token = jwt.sign(user, process.env.cookieParserSecret);

        try {
          await activateAccountEmail(token, username, res);
          return res.status(200).json({ message: "OK" });
        } catch (error) {
          return res.status(500).json({
            message: "ERR",
            error
          });
        }
      }
    );
  }

  static activate(req, res, next) {
    const token = req.params.token;
    if (!token)
      return res.status(401).send({ auth: false, message: "No token provided." });

    jwt.verify(token, process.env.cookieParserSecret, (err, decoded) => {
      // using the token we passed to authonticate the account
      if (err)
        return res.status(500).send({ auth: false, message: "Failed to authenticate token." });
      User.findOneAndUpdate(
        { username: decoded.username },
        { active: true },
        { new: true },
        (error, userAcc) => {
          if (error) {
            return res.status(500).json({ message: "ERR", error });
          }

          return res.status(200).json({ message: "account actiaveted" });
        }
      );
    });
  }

  static resetPasswordEmail(req, res, next) {
    const {
      body: { username }
    } = req;
    const user = {
      username
    };
    const token = jwt.sign(user, process.env.cookieParserSecret, {
      expiresIn: "2 days"
    });

    User.findOne({ username }, async (error, user) => {
        if (error) {
          return res.status(500).json({ error });
        }
        if (!user) {
          return res.status(500).json({ message: "no user with that email address" });
        }
        if (user) {
          try {
            await resetPasswordEmailHandler(token, username);
            return res.status(200).json({ msg: "check your email" });
          } catch (error) {
            return res.status(500).json({ error });
          }
        }
    });
  }

  static resetPassword(req, res, next) {
    const { username } = req.user;

    User.findOne({ username }, (e, user) => {
        if (e)
          res.status(500).json({ message: "password couldne be changed", error });

        if (user) {
          user.setPassword(req.body.password, (error, user) => {
            if (error) {
              res.status(500).json({ message: "password couldne be changed", error });
            }
            user.save(error => {
              if (error) {
                console.log(error);
                res.status(500).json({ message: "password couldne be changed", error });
              } else {
                res.status(200).json({ message: "password changed" });
              }
            });
          });
        }
    });
  }
}

module.exports = { Auth };
