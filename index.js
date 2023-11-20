
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AutoRouter = require('./routes/autoroute'); 
const TypesRouter = require('./routes/types');
const { Auto } = require('./models/auto');
const app = express();

mongoose.connect(process.env.MONGO_URI);
console.log(mongoose.connection.readyState);
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use('/autoroute', AutoRouter);
app.use('/types', TypesRouter);

app.set('view engine', 'ejs');


app.get('/', async function (_, res) {
    const auto = await Auto.find().sort({ nrauto: 'asc' });
    console.log(auto);
//    const auto = [{
//        nrauto:'bv11tsm'
//    }]
    res.render('auto/index', { auto: auto });
});


var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});


/*
Proiect 1  : 
Tema: Inventar auto
Entitate : Autovehicul
Campuri : nr auto, tip auto, descriere, consum, tarif
*/