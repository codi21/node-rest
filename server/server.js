const express = require('express');
const bodyParser= require('body-parser');
require('./config/config');
const app = express() //routear mas facil y demas 
//parse aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))//middleware

//parse aplication/json
app.use(bodyParser.json())
 
app.get('/usuario', function (req, res) {
  res.json('getUsuario')
})
 
app.post('/usuario', function (req, res) {
    let body = req.body;
    if ( body.nombre === undefined)  {
        res.status(400).json(
            {
                ok: false ,
                mensaje: 'El nombre es necesario'
            }
        );
    // falta el nombre
    }
  res.json(
      {
          persona: body
      })//Crear
})
app.put('/usuario/:id', function (req, res) {
   let id = req.params.id;
  res.json({
    id
  }
  
  );//actualizar
})
app.delete('/usuario', function (req, res) {
  res.json('deleteUsuario')//Por lo general ahora se cambia de estado
})

app.listen(port , () => {
    console.log(`Escuchando puerto ${port} `);
});
