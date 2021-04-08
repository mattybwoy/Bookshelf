var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

class Booklist {
  constructor (isbn, title, author, publisher, pages, rating) {
    this.isbn = isbn,
    this.title = title,
    this.author = author,
    this.publisher = publisher,
    this.pages = pages,
    this.rating = rating
  }

  static add(isbn, title, author, publisher, pages, rating) {
    var pg = require('pg');
    require('dotenv').config();

    var client = new pg.Client(process.env.conString);

    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      client.query(`INSERT INTO books(isbn, title, author, publisher, pages, rating) VALUES('${isbn}', '${title}', '${author}', '${publisher}', '${pages}', '${rating}');`,);
    })
  }

  static edit(isbn, title, author, publisher, pages, rating) {
    var pg = require('pg');
    require('dotenv').config();

    var client = new pg.Client(process.env.conString);

    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      client.query('UPDATE books SET title=($2), author=($3), publisher=($4), pages=($5), rating=($6) WHERE isbn=($1);',[isbn, title, author, publisher, pages, rating]);
    })
  }

  static list() {
    var pg = require('pg');
    require('dotenv').config();

    var client = new pg.Client(process.env.conString);

    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      client.query('SELECT * FROM books', (error, result) => {
      if(error) {
        console.log(error)
        throw error
      }
      console.log(result.rows)
      for(let book of result.rows) {
        console.log(book.title)
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.isbn}</h6>

                        <div>Author: ${book.author}</div>
                        <div>Publisher: ${book.publisher}</div>
                        <div>Number Of Pages: ${book.pages}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editBookModal" onClick="setEditModal(${book.isbn})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `
        //const container = window.document.getElementById('booklisting')
        //global.document = new JSDOM("http://localhost:3000/list").window.document.getElementById('booklisting').innerHTML+= x;
        const dom = new JSDOM(`<!DOCTYPE html><body><p id="main">My First JSDOM!</p></body>`)
        console.log(dom.window.document.getElementById("main").textContent);
        //document.getElementById('booklisting').innerHTML = document.getElementById('booklisting').innerHTML + x;
        //container.innerHTML += x;
      }
    })
  })}

  static delete(isbn) {
    var pg = require('pg');
    require('dotenv').config();

    var client = new pg.Client(process.env.conString);

    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }
      client.query('DELETE FROM books WHERE isbn = $1',[isbn])
    })
  }

}

module.exports = Booklist;