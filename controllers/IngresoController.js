import models from '../models';
async function stockMas(idproducto,cantidad){
    let {stock} =await models.Producto.findOne({_id:idproducto});
    let nStock=parseInt(stock)+parseInt(cantidad);
    const reg = await models.Producto.findByIdAndUpdate({_id:idproducto},{stock:nStock})
}
async function stockMenos(idproducto,cantidad){
    let {stock} =await models.Producto.findOne({_id:idproducto});
    let nStock=parseInt(stock)-parseInt(cantidad);
    const reg = await models.Producto.findByIdAndUpdate({_id:idproducto},{stock:nStock})
}
export default {
    add: async (request, response, next) => {
        try {

            for (var i=0;i<request.body.detalles.length;i++ ){
                request.body.detalles[i].stock=request.body.detalles[i].cantidad;
            }
            const reg = await models.Ingreso.create(request.body);

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
            const reg = await models.Ingreso.findOne({_id:request.query._id})
                .populate('usuario',{nombre:1})
                .populate('persona',{nombre:1})
                .populate({
                    path: 'detalles.producto',
                    model: 'producto'
                });
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
            const reg = await models.Ingreso.findOne({codigo:request.query.codigo})
                .populate('usuario',{nombre:1})
                .populate('persona',{nombre:1})
                .populate({
                    path: 'detalles.producto',
                    model: 'producto'
                });
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
            const reg=await models.Ingreso.find({$or:[
                    {'num_comprobante': new RegExp(valor, 'i')},
                    {'serie_comprobante': new RegExp(valor, 'i')}
                ]})
                .populate('usuario',{nombre:1})
                .populate('persona',{nombre:1})
                .populate({
                    path: 'detalles.producto',
                    model: 'producto'
                })
                .sort({'createdAt':1});

            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error',
            });
            next(e);
        }
    },

    // update: async (request, response, next) => {
    //     try {
    //         const reg =await models.Ingreso.findByIdAndUpdate({_id:request.body._id},{
    //             nombre:request.body.nombre,
    //             descripcion:request.body.descripcion,
    //         });
    //         response.status(200).json(reg);
    //     } catch (e) {
    //         response.status(500).send({
    //             message: 'Ocurrio un error'
    //         });
    //         next(e);
    //     }
    // },
    // remove: async (request, response, next) => {
    //     try {
    //         const reg = await models.Ingreso.findByIdAndDelete({_id:request.body._id});
    //         response.status(200).json(reg);
    //     } catch (e) {
    //         response.status(500).send({
    //             message: 'Ocurrio un error'
    //         });
    //         next(e);
    //     }
    // },

    activate: async (request, response, next) => {
        try {
            const reg = await models.Ingreso.findByIdAndUpdate({_id:request.body._id},{estado:1});
            let detalles =reg.detalles;
            detalles.map((x)=>{
                stockMas(x._id,x.cantidad);
            });
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
            const reg = await models.Ingreso.findByIdAndUpdate({_id:request.body._id},{estado:0});
            let detalles =reg.detalles;
            detalles.map((x)=>{
                stockMenos(x._id,x.cantidad);
            });
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    grafico12Meses: async (request,response,next)=>{
        try{
            const reg = await models.Ingreso.aggregate([
                {
                    $group:{
                        _id:{
                            mes:{$month:"$createdAt"},
                            anio:{$year:"$createdAt"}
                        },
                        total:{$sum:"$total"},
                        numero:{$sum:1}
                    }
                },
                {
                    $sort:{
                        "_id.anio":-1,"_id.mes":-1
                    }
                }
            ]).limit(12);
            response.status(200).json(reg)
        }catch (e){
            response.status(500).send({
                message: 'Ocurrio un error'
            });
            next(e);
        }
    },
    consultaFechas: async (request, response, next) => {
        try {
            let start = request.query.start;
            let end = request.query.end;
            const reg=await models.Ingreso.find({"createdAt":{"$sgt":start,"$lt":end}})
                .populate('usuario',{nombre:1})
                .populate('persona',{nombre:1})
                .sort({'createdAt':1});
            response.status(200).json(reg);
        } catch (e) {
            response.status(500).send({
                message: 'Ocurrio un error',
            });
            next(e);
        }
    },

}