const express = require('express');
const app = express();
const path = require('path');
let fs = require('fs');
const readData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const writeData = (data) => fs.writeFileSync('data.json', JSON.stringify(data, null, 3), 'utf8');
var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        json: readData
    })
})

app.get('/add', function (req, res) {
    res.render('add')
})
app.get('/add/edit', function (req, res) {
    res.render('edit')
})

app.listen(3000, () => {
    console.log("web ini berjalan di localhost:3000")
})