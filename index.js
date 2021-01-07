const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

})

app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/add.html')); 
})


app.listen(port, () => console.log(`Listening on port ${port}...`))