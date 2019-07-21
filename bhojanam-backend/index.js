const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const parser = require('body-parser');

const multer=require('multer');

mongoose.connect('mongodb+srv://adityarajsingh@cluster0-ss0ut.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));


let count = 0;
app.use(morgan('dev'));



app.use('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'content-type');
    next();
})
app.use('/uploads',express.static('uploads'));


//routing
const suppliers = require('./routes/suppliers');
app.use('/suppliers', suppliers);

const needyPersons = require('./routes/needyPersons');
app.use('/needyPersons', needyPersons);

const delivery = require('./routes/delivery');
app.use('/delivery', delivery);

const orders = require('./routes/orders');
app.use('/orders', orders);

app.get('/', function (req, res) {
    res.send("Home!");
})





app.listen(process.env.PORT || port, function () {
    console.log(`server running on port ${port}`);
})
