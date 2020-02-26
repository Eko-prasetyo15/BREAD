const express = require('express');
const app = express();
const path = require('path');
let fs = require('fs');
const readData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const writeData = (readData) => fs.writeFileSync('./data.json', JSON.stringify(readData, null, 3), 'utf8');
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

app.post('/add', (req, res) => {
    readData.push({
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    })
    writeData(readData);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    let id = req.params.id
    readData.splice(id, 1);
    writeData(readData);
    res.redirect('/');

})
app.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    res.render('edit', {
        item: {...readData[id]},id});
});
app.post('/edit/:id', (req, res) => {
    let id = req.params.id;
    const newValue = {
        string: req.body.string,
        integer: req.body.integer,
        float: req.body.float,
        date: req.body.date,
        boolean: req.body.boolean
    };
    readData.splice(id, 1, newValue);
    writeData(readData);
    res.redirect('/');
});
app.listen(3000, () => {
    console.log("web ini berjalan di localhost:3000")
})