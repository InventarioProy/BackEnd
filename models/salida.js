import mongoose, {Schema} from 'mongoose';
const salidaSchema = new Schema({
    usuario:{type:Schema.ObjectId, ref:'usuario', required:true},
    persona:{type:Schema.ObjectId, ref:'persona', required:true},
    tipo_comprobante:{type:String,required:true},
    num_comprobante:{type:String,required:true},
    impuesto:{type:Number,required:true},
    total:{type:Number,required:true},
    detalles:[{
        _id:{type:String,required:true},
        producto:{type:String,required:true},
        cantidad:{type:Number,required:true},
        precio:{type:Number,required:true},
        descuento:{type:Number,required:true}
    }],
    estado:{type:Number,default:1},
    createdAt:{type:Date,default: Date.now},
});
//una salida tiene muchos productos
const Salida = mongoose.model('salida',salidaSchema);
export default Salida;