const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

// Logs in a User

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = new Error('All fields are required');
    error.statusCode = 400;
    next(error);
  } else {
    User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) {
          // return res.status(400).json({msg:'Invalid Email'});
          const error = new Error('User Not Found');
          error.statusCode = 404;
          return next(error);
        }
        bcrypt
          .compare(password, user.password)
          .then(match => {
            if (!match) {
              const error = new Error('Invalid Password');
              error.statusCode = 400;
              // throwing this takes it to the catch block 
              // I'll recommend using next(error)
              console.log(error)
              next(error)
              // res.status(400).json({ mes: 'Invalid Password' })
              // next()
              // throw error;
            } else {
              // Creates a jwt and stores the userId in the encoded token
              jwt.sign({ userId: user.id },
                process.env.AUTH_SECRET_KEY,
                { expiresIn: '1h' },
                (err, token) => {
                  if (!err) {
                    res.json({
                      token,
                      user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                      }
                    });
                  } else {
                    next(err);
                  }
                }
              );
            }
          })
          .catch(err => {
            next(err);
          });
      })
      .catch(err => {
        next(err);
      });
  }
};

// Gets the current logged in user

exports.getCurrentUser = (req, res, next) => {
  const userId = req.userId;
  console.log(userId)
  User.findByPk(userId
    , {
      attributes: { exclude: ['password', 'updatedAt'] }
    }
  ).then(user => {
    if (!user) {
      const error = new Error('User Not Found');
      error.statusCode = 404;
      next(error);
      // return res.status(404).json({ msg: 'User Not Found' });
    } else {
      res.json(user);
    }
  })
    .catch(error => next(error));
};