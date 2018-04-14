const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    }, {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res)=> {
  const hash = '$2a$10$GlrSJdodH0XWzBxvGEQJ9uCNkVVFSU5C8202HpQmm.XEvYTLE7h6G';
  bcrypt.compare("apples", hash, function(err, res) {
    console.log(res == true);
  });  

  // const user = database.users.find(user => {
  //   return req.body.email === user.email && 
  // })
  if (req.body.email === database.users[0].email && 
    req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json('error logging in');
  }
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
  });
  database.users.push({
    id: '125',
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  });
  res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    } 
  });
  if (!found) {
    res.status(400).json('not found');
  }  
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    } 
  });
  if (!found) {
    res.status(400).json('not found');
  }    
})



// Load hash from your password DB.
/*
bcrypt.compare("veggies", hash, function(err, res) {
  // res = false
}); */

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
