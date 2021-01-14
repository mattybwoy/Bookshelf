const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const port = 3000;
const client = require('./elephantsql');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

let books = [{
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "author": "Marijn Haverbeke",
    "publisher": "No Starch Press",
    "pages": 472,
    "rating": 5
}];

app.get('/', (req, res) => {
  res.send(add)
})

app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/add.html'));

})

app.post('/add', (req, res) => {
  const book = req.body
  books.push(book)
  console.log(book)
  res.send('Book Added!')
})

app.get('/list', async (req, res) => {
  res.json(books)
  // try {
  //   const results = await client.query('SELECT * FROM books');
  //   console.log(results)
  //   res.json(results);
    
  // } catch (err) {
  //   console.log(err);
  // }
   //res.sendFile(path.join(__dirname + '/public/list.html'));
})


app.listen(port, () => console.log(`Listening on port ${port}...`))