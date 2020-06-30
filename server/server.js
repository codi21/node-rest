const express = require('express');
const mongoose = require('mongoose');
const app = express(); //routear mas facil y demas 
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));//middleware
app.use(bodyParser.json());
require('./config/config');

//const cors = require('cors');
//app.use(cors());
app.use(require('./routes/usuario'));
//parse aplication/x-www-form-urlencoded

//parse aplication/json
 
mongoose.connect(process.env.URLDB,{ useNewUrlParser: true , useUnifiedTopology : true} ,(err,res) => {
    if ( err ) throw err;
    console.log('Base de datos ONLINE');
});
mongoose.set('useCreateIndex', true);
app.listen(process.env.PORT , () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
