const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index')
})

app.listen(3000, () => {
    console.log("web ini berjalan di localhost:3000")
})