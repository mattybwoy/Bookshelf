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
  }

module.exports = Booklist;