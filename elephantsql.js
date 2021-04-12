var pg = require('pg');
require('dotenv').config();
//or native libpq bindings
//var pg = require('pg').native

var client = new pg.Client(process.env.conString);

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }

  client.query('SELECT NOW() AS "theTime"', function(error, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);

    //client.end();
  });
});

module.exports = client;