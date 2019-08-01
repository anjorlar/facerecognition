require("dotenv").config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');



const server = express();
server.use(cors());

// const User = require('./model/user');
// const Login = require('./model/login');
const userRoute = require('./routes/api/user');
const loginRoute = require('./routes/api/auth');
server.use(express.json());

server.use('/api/register', userRoute);
server.use('/api/user', loginRoute);


sequelize
  .sync({
    force: false
  })
  .then(result => {
    server.listen(3300, () => console.log('Server is running on Port 3300'))
  })
  .catch(err => console.log(err));