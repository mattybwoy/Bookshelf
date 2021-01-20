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
    // var pg = require('pg');
    // var client = new pg.Client(conString);

    client.connect(function (err) {
      if (err) {
        return console.error('could not connect to postgres', err);
      }

      client.query(`INSERT INTO spaces(title, description, image, location, pricePerNight, username) VALUES('${title}', '${description}', '${image}', '${location}', '${pricePerNight}', '${username}');`,
        function (err, result) {
          if (err) {
            return console.error('error running query', err);
          }
          client.end();
        });
    })
  }
}

module.exports = Booklist;