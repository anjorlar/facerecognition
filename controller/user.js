const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')

const User = require('../model/user');

// Creating a new user

exports.postUser = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ erros: erros.array() })
  }
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ msg: 'All fields are required' });
  } else {
    let hashedPassword;
    // checks if user already exist via the email field
    User.findOne({
      where: { email }
    })
      .then(user => {
        if (user) {
          const error = new Error('User already exist');
          error.statusCode = 400;
          next(err);
          // res.status(400).json({ msg: 'User already exist' })
        } else {
          try {
            const salt = bcrypt.genSaltSync(10);
            hashedPassword = bcrypt.hashSync(password, salt);
          } catch (error) {
            throw error;
          }
          User.create({ name, email, password: hashedPassword })
            .then(user => {
              jwt.sign(
                { userId: user.id },
                process.env.AUTH_SECRET_KEY,
                { expiresIn: '1h' },
                (err, token) => {
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      password: hashedPassword
                    }
                  })
                }
              )
            })
            .catch(err => next(err));
        }
      }).catch(err => next(err));
  }
};


exports.getUser = (req, res, next) => {
  User.findOne()
    .then(user => {
      res.json(user)
    })
    .catch(err => res.json({
      success: false
    }))
}