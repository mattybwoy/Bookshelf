const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const port = 3000;
const client = require('./elephantsql');
var booklist = require('./booklist')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  //res.send(add)
})

app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/add.html'));

})

app.post('/add', (req, res) => {
  booklist.add(req.body.isbn, req.body.title, req.body.author, req.body.publisher, req.body.pages, req.body.rating)
  res.redirect('/');
})

app.get('/list', async (req, res) => {
  try {
    await client.query('SELECT * FROM books', (error, result) => {
      if(error) {
        console.log(error)
        throw error
      }
      res.status(200).json(result.rows)
    });
    //res.json(results);
    //res.sendFile(path.join(__dirname + '/public/list.html'));
  } catch (err) {
    console.log(err);
  }
   
})


app.listen(port, () => console.log(`Listening on port ${port}...`))