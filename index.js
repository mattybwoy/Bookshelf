const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const port = 3000;
const client = require('./elephantsql');
var booklist = require('./booklist');
const { json } = require('body-parser');
var methodOverride = require('method-override')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
})

app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/add.html'));
})

app.post('/add', (req, res) => {
  booklist.add(req.body.isbn, req.body.title, req.body.author, req.body.publisher, req.body.pages, req.body.rating)
  res.redirect('/');
})

app.get('/edit', (req,res) => {
  res.sendFile(path.join(__dirname + '/public/edit.html'));
})

app.put('/edit', (req, res) => {
  const isbn = req.body.isbn
  booklist.edit(req.body.isbn, req.body.title, req.body.author, req.body.publisher, req.body.pages, req.body.rating)
  res.send('Book with ISBN:' + isbn + ' has been updated!')
})

app.get('/list', async (req, res) => {
  //booklist.list()
  res.locals.listofbook = await booklist.list();
  console.log(res.locals.listofbook)
  res.render('list')
  //res.sendFile(path.join(__dirname + '/public/list.html'));

  // var bookList = []
  // try {
  //   await client.query('SELECT * FROM books', (error, result) => {
  //     if(error) {
  //       console.log(error)
  //       throw error
  //     }
  //   result.rows.forEach(element => bookList.push( new booklist (element.isbn, element.title, element.author, element.publisher, element.pages, element.rating)));
  //   console.log(bookList)
  //     res.status(200).json(bookList)
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
   
})

app.post('/list/isbn', (req,res) => {
  const isbn = req.body.isbn

    try {
    client.query('SELECT * FROM books', (error, result) => {
      if(error) {
        console.log(error)
        throw error
      }
    for (let book of result.rows) {
      if(book.isbn == isbn) {
        return res.json(book)
      }
    } 
    });
  } catch (err) {
    console.log(err);
  }
})

app.get('/delete', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/delete.html'));
})

app.delete('/delete', (req,res) => {
  const isbn = req.body.isbn
  console.log(isbn)
  booklist.delete(req.body.isbn)
  res.send('Book with ISBN: ' + isbn + ' has been deleted!')
})

app.listen(port, () => console.log(`Listening on port ${port}...`))