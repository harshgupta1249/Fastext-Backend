const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../config/db");

//SIGN-UP FUNCTION

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      let userData = data.rows;

      if (userData.length !== 0) {
        res.status(400).json({
          error: "User already exists",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal Server Error",
            });
          }

          const user = {
            name,
            email,
            password: hash,
          };

          client
            .query(
              `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');`
            )
            .then((data) => {
              //GENERATE TOKEN

              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );

              //SEND TOKEN

              res.status(200).json({
                message: "User Added Succesfully",
                token: token,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: "Database Error1",
              });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database Error2",
      });
    });
};



//SIGN-IN FUNCTION

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows;

      if (userData.length === 0) {
        res.status(400).json({
          error: "User does not exist, instead SIGNUP !",
        });
      } else {
        //SQL RETURNS ARRAY [] OF RESULTS, EVEN IF THE RESULT IS SINGLE ROW => userData[0]
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Server error",
            });
          } else if (result === true) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );

            res.status(200).json({
              message: "User signed in successfully",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "Password Invalid",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred!",
      });
    });
};
