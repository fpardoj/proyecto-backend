import { Schema, model } from "mongoose";

const VentaSchema = new Schema({
    usuario:            {type:Schema.ObjectId, ref:'usuarioschema', requires:true}, 
    persona:            {type:Schema.ObjectId, ref:'personaschema', requires:true},
    tipo_comprobante:   {type:String, maxlength:30, required:true},
    serie_comprobante:  {type:String, maxlength:30, required:true},
    impuesto:           {type:Number, reuired:true},
    total:              {type:Number, required:true},
    detalle:            [{
        _id:        {type:String, required: true},
        articulo:   {type:String, required: true},
        cantidad:   {type:Number, required: true},
        precio:     {type:Number, required: true},
        descuento:  {type:Number, required:true}
    }],
    estado:             {type:Number, default:1},
    createAt:            {type:Date, default:Date.now}
})

const Venta = model('ventaschema', VentaSchema);

export default Venta;