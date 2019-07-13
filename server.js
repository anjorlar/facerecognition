const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');


const server = express();
server.use(bodyParser.json());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: '1233',
      entries: 0,
      joined: new Date()
    },

    {
      id: '124',
      name: 'Matt',
      email: 'Matt@gmail.com',
      password: '1234',
      entries: 0,
      joined: new Date()
    }
  ]
}

server.get('/', (req, res) => {
  res.send(database.users)

})

server.post('/signin', (req, res) => {
  // res.json('success')
  // console.log('direct', 'signin')
  console.log('email:', req.body.email)
  console.log('password:', req.body.password)
  if (req.body.email == database.users[0].email
    &&
    req.body.password == database.users[0].password
  ) {

    res.json('success');

    console.log('if', 'success')
  }
  else {
    res.status(400).json('email or password not correct')
    console.log('failed')
  }
})
server.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  // const saltRounds = 10;
  // bcrypt.hash(password, saltRounds, (err, hash) => {
  //   console.log(hash);
  // })
  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  })
  res.json(database.users[database.users.length - 1]);
})

server.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.status(200).json(user)
    }
  })
  if (!found) {
    res.status(400).json('Not Found')
  }
})

server.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++
      return res.json(user.entries)
    }
  })
  if (!found) {
    res.status(400).json('Not Found')
  }
})

server.listen(3300, () => console.log('server is running on port 3300'));


/*
stating routes and endpoints
register -> post = user
signin -> post -> = successful or failed
profile-> :userid -> get =user
image ->put =user
*/