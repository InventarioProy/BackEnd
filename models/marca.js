import mongoose,{Schema} from  'mongoose';
const marcaSchema = new Schema({
    nombre:{type:String, maxlength:50, unicode:true, required:true},
    descripcion:{type:String,maxlength: 255},
    estado:{type:Number,default:1},
    createdAt:{type:Date,default: Date.now()}
});

const Marca = mongoose.model('marca',marcaSchema);
export default Marca;