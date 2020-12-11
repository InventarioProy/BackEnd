import models from '../models';
import bcrypt from 'bcryptjs';

export default {
    add: async (request, response, next) => {
        try {
            const reg = await models.Persona.create(request.body);
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
            const reg = await models.Persona.findOne({_id:request.query._id});
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
            const reg=await models.Persona.find({$or:[
                    {'nombre': new RegExp(valor, 'i')},
                    {'ci': new RegExp(valor, 'i')},
                    {'email': new RegExp(valor, 'i')},
                    {'telefono': new RegExp(valor, 'i')},
                ]}).sort({'createdAt':1});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error',
            });
            next(e);
        }
    },
    listClientes: async (request, response, next) => {
        try {
            let valor = request.query.valor;
            const reg=await models.Persona.find({$or:[
                    {'nombre': new RegExp(valor, 'i')},
                    {'ci': new RegExp(valor, 'i')},
                    {'email': new RegExp(valor, 'i')},
                    {'telefono': new RegExp(valor, 'i')},
                ],'tipo_persona':'Cliente'},{createdAt: 0}).sort({'nombre':1});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error',
            });
            next(e);
        }
    },
    listProveedores: async (request, response, next) => {
        try {
            let valor = request.query.valor;
            const reg=await models.Persona.find({$or:[
                    {'nombre': new RegExp(valor, 'i')},
                    {'ci': new RegExp(valor, 'i')},
                    {'email': new RegExp(valor, 'i')},
                    {'telefono': new RegExp(valor, 'i')},
                ],'tipo_persona':'Proveedor'}).sort({'nombre':1});
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
            const reg =await models.Persona.findByIdAndUpdate({_id:request.body._id},{
                tipo_persona:request.body.tipo_persona,
                nombre:request.body.nombre,
                ci:request.body.ci,
                telefono:request.body.telefono,
                email:request.body.email,

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
            const reg = await models.Persona.findByIdAndDelete({_id:request.body._id});
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
            const reg = await models.Persona.findByIdAndUpdate({_id:request.body._id},{estado:1});
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
            const reg = await models.Persona.findByIdAndUpdate({_id:request.body._id},{estado:0});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
}