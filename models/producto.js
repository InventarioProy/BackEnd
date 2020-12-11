import mongoose,{Schema} from  'mongoose';
const productoSchema = new Schema({
    categoria:{ type: Schema.ObjectId, ref:'categoria'},
    marca:{ type: Schema.ObjectId, ref:'marca'},
    nombre:{type:String},
    codigo:{type:String},
    descripcion:{type:String},
    imagen:{type:String,default:'esto es una imagen'},
    stock_min:{type:Number},
    precio_compra:  {type:Number },
    precio_venta:{type:Number },
    estado:{type:Number,default:1},
    createdAt:{type:Date,default: Date.now()}
});

const Producto = mongoose.model('producto',productoSchema);
export default Producto;