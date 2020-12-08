import models from '../models';

export default {
    add: async (request, response, next) => {
        try {
            const reg = await models.Marca.create(request.body);
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
            const reg = await models.Marca.findOne({_id:request.query._id});
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
            const reg=await models.Marca.find({$or:[
                    {'nombre': new RegExp(valor, 'i')},
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
            const reg =await models.Marca.findByIdAndUpdate({_id:request.body._id},{
                nombre:request.body.nombre,
                descripcion:request.body.descripcion,
                estado:request.body.estado,
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
            const reg = await models.Marca.findByIdAndDelete({_id:request.body._id});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },

}