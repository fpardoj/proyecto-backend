import { Schema, model } from "mongoose";

const ArticulosSchema = new Schema({
    categoria:      {type:Schema.ObjectId, ref: 'categoriaschema'},// de esta forma se crea una referencia entre modelos o documentos de una base de datos.
    codigo:         {type:String, maxlength:60, unique:true, required:true},
    nombre:         {type:String, maxlength:60, unique:true, required:true},
    descripcion:    {type:String, maxlength:255, required:true},
    precio_venta:   {type:Number, required:true},
    stock:          {type:Number, required:true},
    estado:         {type:Number, default:1},
    createAt:       {type:Date, default: Date.now}
})

const Articulo = model('articulosschema', ArticulosSchema);
export default Articulo;

//un schema es un documento donde se guardan informacion sobre las relaciones.