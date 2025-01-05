const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');
const mysql = require('mysql2');

const PORT = 3000;
const app = express();
app.set('view engine', 'ejs');

//database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'portadmin123',
    database: 'movie_app',
});

db.connect((err) => {
    if (err) {
        console.error('Connection Failed:', err.message);
        process.exit(1);
    }
    console.log('Connection Successful');
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});


//routes
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));

//search routes
app.get('/search', async (req, res) => {
  const { query } = req.query;
  const API_KEY = 'b083690e022cdf7ace97ea1a0948b884'; 

  if (!query) {
      return res.render('search', { movies: [], error: 'Please enter a search term' });
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  console.log('API URL:', url); 

  try {
      const response = await axios.get(url);
      console.log('API Response:', response.data); 
      res.render('search', { movies: response.data.results, error: null });
  } catch (error) {
      console.error('API Error:', error.response && error.response.data ? error.response.data : error.message); 
      res.render('search', { movies: [], error: 'Error fetching data from API' });
  }
});

//register route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) throw err;
      res.redirect('/login');
    });
});

//login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) throw err;
      if (results.length > 0 && bcrypt.compareSync(password, results[0].password)) {
        req.session.user = results[0];
        res.redirect('/');
      } else {
        res.status(401).send('Invalid credentials');
      }
    });
});

//logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000, () => console.log(`Server running on Port ${PORT}`));