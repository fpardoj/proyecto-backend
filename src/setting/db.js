import mongoose from 'mongoose';
import { database } from './keys';


//esta es la estructura que nos arrojara el servidor en caso de tener una conexion exitosa.
mongoose.connect(database, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology : true
})
    .then(data => console.log('Db is connect cachon'))
    .catch(err => console.log(err));
