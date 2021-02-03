const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const port = 3000;
const client = require('./elephantsql');
var booklist = require('./booklist');
const { json } = require('body-parser');

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

});

app.get('/delete/:isbn', (req, res) => {
  //res.send('Please input ISBN in URL')
  const isbn = req.params.isbn;

    try {
    client.query('SELECT * FROM books', (error, result) => {
      if(error) {
        console.log('The error is ' + error)
        throw error
      }
    for (let book of result.rows) {
      if(book.isbn == isbn) {
        client.query('DELETE FROM books WHERE isbn = $1',[isbn])
        return res.status(200).send(`Book deleted with ISBN ${isbn}`)
      }
    }
    });
  } catch (err) {
    console.log('What is the error' + err);
  }
})

// app.delete('/delete/:isbn', (req, res) => {
//     const isbn = req.params.isbn;

//     try {
//     client.query('SELECT * FROM books', (error, result) => {
//       if(error) {
//         console.log('The error is ' + error)
//         throw error
//       }
//     for (let book of result.rows) {
//       if(book.isbn == isbn) {
//         client.query('DELETE FROM books WHERE isbn == [isbn]')
//         return res.status(200).send(`Book deleted with ISBN ${isbn}`)
//       }
//     }
//     });
//   } catch (err) {
//     console.log('What is the error' + err);
//   }
// })


app.listen(port, () => console.log(`Listening on port ${port}...`))