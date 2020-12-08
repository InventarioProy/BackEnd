import models from '../models';
import bcrypt from 'bcryptjs';

export default {
    add: async (request, response, next) => {
        request.body.password = await bcrypt.hash(request.body.password,10)
        try {
            const reg = await models.Usuario.create(request.body);
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
            const reg = await models.Usuario.findOne({_id:request.query._id});
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
            const reg=await models.Usuario.find({$or:[
                    {'nombre': new RegExp(valor, 'i')},
                    {'email': new RegExp(valor, 'i')}
                ]},{createdAt: 0}).sort({'nombre':1});
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
            let pass=request.body.password;
            let reg0=await models.Usuario.findOne({_id:request.body._id});
            if (pass!==reg0.password) {
                request.body.password = await bcrypt.hash(request.body.password, 10);
            }

            const reg =await models.Usuario.findByIdAndUpdate({_id:request.body._id},{
                rol:request.body.rol,
                nombre:request.body.nombre,
                ci:request.body.ci,
                password:request.body.password,
                telefono:request.body.telefono,
                email:request.body.email,
                foto:request.body.foto,
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
            const reg = await models.Usuario.findByIdAndDelete({_id:request.body._id});
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
            const reg = await models.Usuario.findByIdAndUpdate({_id:request.body._id},{estado:1});
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
            const reg = await models.Usuario.findByIdAndUpdate({_id:request.body._id},{estado:0});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
}