const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user: 'bigboss',
    password: '1qaz2wsx',
    database: 'face-detect'
  }
});

db.select('*').from('users')
  .then(data => {
    console.log(data);
  }); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', signIn.handleSignIn(db, bcrypt) );

app.post('/register', register.handleRegister(db, bcrypt) );

app.get('/profile/:id', profile.handleProfileGet(db) );

app.put('/image', image.handleImage(db) );

app.post('/imageurl', image.handleApiCall );

app.listen(3000, () => {
  console.log('app is running on port 3000');
});

