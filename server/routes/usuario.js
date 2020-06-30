const express = require('express');
const bcrypt = require ('bcrypt');
const _ = require ('underscore');
const Usuario = require('../models/usuario')
const app = express() //routear mas facil y demas 
app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0 ; 
    let limite = req.query.limite || 5 ;
    desde = Number(desde);
    limite = Number(limite);
    Usuario.find({estado:true},'nombre email role estado google img')
            .skip(desde)//saltar los 5
            .limit(limite)
            .exec((err,usuarios) => {
                if (err){
                    return res.status(400).json({
                        of:false,
                        err
                    });
                }
                Usuario.count({estado:true},(err,conteo) => {
                    res.json({
                        ok:true,
                        usuarios,
                        cuantos: conteo
                    });
                });
                
            });
});

app.post('/usuario', function (req, res) {
    let body = req.body;
    console.log(body);
    let usuario = new Usuario ({
        nombre : body.nombre,
        email : body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    });

    usuario.save( (err ,usuarioDB) => {
        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok : true,
            usuario: usuarioDB 
        });

    });
});
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick( req.body, ['nombre','email','img','role','estado']);// Podemos elegir con la libreria de underscore los elementos que queremos , asi no nos mandan datos que no sirven
    Usuario.findByIdAndUpdate(id ,body,{ new : true } ,(err , usuarioDB) => {
        if (err){
            return res.staus(400).json({
                ok: false,
                err
            });
        }
        
        res.json({
            ok: true,
            usuario : usuarioDB
        });
    });
    /*res.json({
        id
    }*/

    //actualizar
});
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    //Usuario.findByIdAndRemove(id,(err,usuariosBorrado)=>{
    let cambiaEstado = {
        estado : false
    }
    Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true},(err,usuariosBorrado)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuariosBorrado){
            return res.status(400).json({
                ok: false,
                err: {
                    message : 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok:true,
            usuario:usuariosBorrado
        });
    });
});


module.exports = app;
