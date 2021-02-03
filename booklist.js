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

      client.query(`INSERT INTO books(isbn, title, author, publisher, pages, rating) VALUES('${isbn}', '${title}', '${author}', '${publisher}', '${pages}', '${rating}');`,
      );
    })
  }

  //   static async list(){
  //   var pg = require('pg');
  //   require('dotenv').config();

  //   var client = new pg.Client(process.env.conString);

  //   client.connect(function(err) {
  //     if(err) {
  //       return console.error('could not connect to postgres', err);
  //     }
  //   });
    
  //   //var result = await client.query("SELECT * FROM books") // tell it to wait
  //   //client.end();
  //   try {
  //   await client.query('SELECT * FROM books', (error, result) => {
  //     if(error) {
  //       console.log(error)
  //       throw error
  //     }
  //     res.status(200).json(result.rows)
  //   });
  //   //res.json(results);
  //   //res.sendFile(path.join(__dirname + '/public/list.html'));
  // } catch (err) {
  //   console.log(err);
  // }
    
  // }
}

module.exports = Booklist;