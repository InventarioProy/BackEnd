import mongoose, {Schema} from 'mongoose';
const personaSchema = new Schema({
    tipo_persona:{type:String,maxlength:30,required:true},
    nombre:{type:String, maxlength:50, required: true},
    ci:{type:String, maxlength:20, required: true},
    telefono:{type:String, maxlength:20},
    email:{type:String, maxlength:64},
    estado:{type:Number, maxlength:30,default:1},
    createdAt:{type:Date,default: Date.now()},
});
const Persona = mongoose.model('persona',personaSchema);
export default Persona;