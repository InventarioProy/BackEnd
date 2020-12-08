import mongoose, {Schema} from 'mongoose';
const ingresoSchema = new Schema({
    usuario:{type:Schema.ObjectId, ref:'usuario', required:true},
    persona:{type:Schema.ObjectId, ref:'persona', required:true},
    tipo_comprobante:{type:String,required:true},
    num_comprobante:{type:String,required:true},
    impuesto:{type:Number,required:true},
    total:{type:Number,required:true},
    detalles:[{
        producto:{type:Schema.ObjectId, ref:'producto', required:true},
        cantidad:{type:Number,required:true},
        stock:{type:Number,required:true},
        precio:{type:Number,required:true},
        fecha_vencimient:{type:Date}
    }],
    estado:{type:Number,default:1},
    createdAt:{type:Date,default: Date.now},
});
//un ingreso tiene muchos productos
const Ingreso = mongoose.model('ingreso',ingresoSchema);
export default Ingreso;