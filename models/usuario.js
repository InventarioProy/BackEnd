import mongoose, {Schema} from 'mongoose';
const usuarioSchema = new Schema({
    rol:{type:String,maxlength:30,required:true},
    nombre:{type:String, maxlength:50, required: true},
    ci:{type:String, maxlength:20, required: true},
    password:{type:String, maxlength:64, required: true},
    telefono:{type:String, maxlength:20, required: true},
    email:{type:String, maxlength:64, required: true},
    foto:{type:String, maxlength:100, default:'url foto de perfil'},
    estado:{type:Number, maxlength:30,default:1},
    ultimo_login:{type:Date},
    createdAt:{type:Date,default: Date.now()},
});
const Usuario = mongoose.model('usuario',usuarioSchema);
export default Usuario;