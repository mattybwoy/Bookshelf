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
  var bookList = []
  try {
    await client.query('SELECT * FROM books', (error, result) => {
      if(error) {
        console.log(error)
        throw error
      }
      //console.log(result.rows[0].title)
    result.rows.forEach(element => bookList.push( new booklist (element.isbn, element.title, element.author, element.publisher, element.pages, element.rating)));
    //return listOfSpaces
    console.log(bookList)
      res.status(200).json(bookList)
    });
    //res.json(results);
    //res.sendFile(path.join(__dirname + '/public/list.html'));
  } catch (err) {
    console.log(err);
  }
   
})

app.get('/list/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;

    // Searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});


app.listen(port, () => console.log(`Listening on port ${port}...`))