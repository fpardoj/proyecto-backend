// en index levantamos el servidor
//babel es un transconspilador dond ese usa js 6 en sus ultimas caracteristicas

//const express = require('express');
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import router from './routes/app'
//Db
import pool from './setting/db'

const app = express();
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccesStatus: 200
}

//difinicion del puerto

app.set('port', process.env.PORT || 3000)

//Middleware
app.use(morgan('dev'));
app.use(cors());

//metodo que permite guardar informacion en nuestro body.
app.use(express.json({ extended: true}));
app.use(express.urlencoded({extended:true}));

//router
app.use('/api', cors(corsOptions), router);

// Public definicion de arhicos estaticos
app.use(express.static(path.join(__dirname, 'public')));
// solicitamos el puerto que ya hemos definido*/

app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'))
});