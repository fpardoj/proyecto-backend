import models from '../models/models';
import controller from './controllersStock'
let add = async (req, res, next) =>{
    const { usuario, persona, tipo_comprobante, serie_comprobante, impuesto, total, detalle} = req.body;
    try {
        const data = await models.Venta.create({
            usuario,
            persona,
            tipo_comprobante,
            serie_comprobante,
            impuesto,
            total,
            detalle
        })
        let detalles = req.body.detalle;
        detalles.map(function(x){
            controller.dismStock(x._id, x.cantidad)
        })
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let query = async (req, res, next) =>{
    let id = req.query._id;
    try {
        const data = await models.Venta.findOne({_id: id})
        .populate('usuario',{nombre:1})
        .populate('persona',{nombre:1})
        if (!data) {
            res.status(404).send({
                message: "Error el registro no existe"
            })
        } else {
            res.status(200).json(data)
        }    
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let list = async (req, res, next) =>{
    let valor = req.query.valor;
    try {
        const data = await models.Venta.find({
            $or:[{'serie_comprobante': new RegExp(valor, 'i')}]//consulta en la base de datos teniendo en cuenta expreciones regulares
        })
        .populate('usuario',{nombre:1})
        .populate('persona',{nombre:1})
        .sort({'createAt': -1})//proceso de ordenamiento en base a la hora de creacion aqui se indica que se hara de forma descedente
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let activate = async (req, res, next) =>{
    const id = req.body._id;
    try {
        const data = await models.Venta.findByIdAndUpdate({_id:id},{estado:1})
        let detalles = data.detalle;
        detalles.map(function(x){
            controller.dismStock(x.id, x.cantidad)
        })
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let desactivate = async (req, res, next) =>{
    const id = req.body._id;
    try {
        const data = await models.Venta.findByIdAndUpdate({_id:id},{estado:0})
        let detalles = data.detalle;
        detalles.map(function(x){
            controller.aumentStock(x.id, x.cantidad)
        })
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let grafAnual = async (req, res, next) =>{
    try {
        const data = await models.Venta.aggregate([//metodo que genera una grafica.
            {
                $group:{
                    _id:{//agrupa las ventas por su mes y año para agregarlas en la graficz
                        mes: {$month: '$createAt'},
                        year: {$year: '$createAt'}
                    },
                    //estructura para organizar las ventas 
                    total: {$sum: '$total'},//suma el total de la venta
                    numero: {$sum: 1}//realiza la sumatoria de el mismo
                }
            },
            {
                $sort:{//organiza los registros de manera descendente.
                    "_id,.year": -1,
                    "_id.mes" : -1
                }
            }
        ]).limit(12)//limita las ventas que queremos vizualizar
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

let consultFecha = async (req, res, next) =>{
    let {valor, end} = req.query;
    try {
        const data = await models.Venta.find({
            'createAt': {"$gte": valor, "$lt": end}//parametros de consulta segun la hora de creacion.
            })
            .populate('usuario', {nombre:1})
            .populate('persona', {nombre:1})
            .sort({'createAt': -1})//organiza los datos de forma descendente
        res.status(200).json(data)
    } catch (e) {
        res.status(500).send({
            message: "Error en el proceso"
        })
        next(e)
    }
}

export default {
    add,
    query,
    list,
    activate,
    desactivate,
    grafAnual,
    consultFecha
}