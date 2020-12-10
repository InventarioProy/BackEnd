import models from '../models';
import fs from 'fs';
var ObjectId = require('mongodb').ObjectID;

export default {
    stock:async (request, response, next) => {
        try {
            const reg = await models.Ingreso.aggregate([
                {
                    $unwind :"$detalles"
                },
                {
                    $group:
                        {
                            _id: "$detalles.producto",
                            "stock": { $sum: "$detalles.stock" }
                        }
                },
                ]);
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error '+e
            });
            next(e);
        }
    },
    stockFecha:async (request, response, next) => {
        try {
            const reg = await models.Ingreso.
            aggregate([
                {
                    $unwind :"$detalles"
                },
                {$match: { 'detalles.producto' : ObjectId(request.query._id)} },
                {$match:  { 'detalles.stock': { $gt: 0 } }},
                {$match:  { 'detalles.fecha_vencimient': { $ne: null } }},
                {$group:{
                        _id:"$detalles.fecha_vencimient",
                        "stock": { $sum: "$detalles.stock" },
                    }
                }

                ]);
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error '+e
            });
            next(e);
        }
    },
    add: async (request, response, next) => {
        try {
            var image = request.body.imagen;
            var data = image.replace(/^data:image\/\w+;base64,/, '');

            var NombreImagen="Storage/images/products/" +request.body.codigo+'.jpg';
            fs.writeFile(NombreImagen, data, 'base64', (err)=>{
                console.log(err)
            });
            request.body.imagen=NombreImagen;
            const reg = await models.Producto.create(request.body);
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    query: async (request, response, next) => {
        try {

            const reg = await models.Producto.findOne({_id:request.query._id})
                .populate('categoria',{nombre:1}).populate('marca',{nombre:1});

            if (!request){
                response.status(404).send({
                    message: 'El registro no existe'
                });
            }else{
                response.status(200).json(reg);
            }

        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    queryCodigo: async (request, response, next) => {
        try {

            const reg = await models.Producto.findOne({codigo:request.query.codigo})
                .populate('categoria',{nombre:1}).populate('marca',{nombre:1});

            if (!request){
                response.status(404).send({
                    message: 'El registro no existe'
                });
            }else{
                response.status(200).json(reg);
            }

        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    list: async (request, response, next) => {
        try {
            let valor = request.query.valor;

            const reg=await models.Producto.find({$or:[
                    {'codigo': new RegExp(valor, 'i')},
                    {'descripcion': new RegExp(valor, 'i')}
                ]},{createdAt: 0}).sort({'nombre':1})
                .populate('categoria',{nombre:1})
                .populate('marca',{nombre:1});//lo que se filtre de categoria, que campos se mostrara

            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error',
            });
            next(e);
        }
    },

    update: async (request, response, next) => {
        try {
            const reg =await models.Producto.findByIdAndUpdate({_id:request.body._id},{
                categoria:request.body.categoria,
                marca:request.body.marca,
                nombre:request.body.nombre,
                codigo:request.body.codigo,
                descripcion:request.body.descripcion,
                imagen:request.body.imagen,
                stock:request.body.stock,
                precio_compra:request.body.precio_compra,
                precio_venta:request.body.precio_venta,

            });
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    remove: async (request, response, next) => {
        try {
            const reg = await models.Producto.findByIdAndDelete({_id:request.body._id});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    activate: async (request, response, next) => {
        try {
            const reg = await models.Producto.findByIdAndUpdate({_id:request.body._id},{estado:1});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    deactivate: async (request, response, next) => {
        try {
            const reg = await models.Producto.findByIdAndUpdate({_id:request.body._id},{estado:0});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
}