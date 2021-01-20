const express = require('express');
const morgan = require('morgan');
var router = express.Router();
require('./src/cars.model');
require('./src/db');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Cars = mongoose.model('Cars');
const app = express();


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use(morgan('dev'));

app.get('/', (req, res) =>{

    Cars.find((err, docs) => {
        res.end(JSON.stringify(docs));
    });
})

app.put('/', (req, res) => {
    Cars.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) =>{
        res.end(JSON.stringify(doc));
    })
});


app.post('/', (req, res) => {
    var carCreate = new Cars();
    carCreate.name = req.body.name;
    carCreate.model = req.body.model;
    carCreate.save();  
    res.end(JSON.stringify(carCreate));
});

app.delete('/', (req, res) => {
    Cars.remove({_id: req.body._id});
    res.end('delete');
});


app.get('*', (req, res) =>{
    res.end('not found');
})


app.listen(3000,  ()=> {
    console.log('RUN')
});

module.exports = router;