import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import router from "./routes";
import bodyParser from "body-parser";


//conexion a la base de datos
mongoose.Promise=global.Promise;
const dbUrl='mongodb://localhost:27017/dbinventario';
mongoose.connect(dbUrl,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('se conecto a la base de datos')
});

const app=express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use("/storage/images/products",express.static(path.join(__dirname,'storage/images/products')));

app.use('/api',router);

app.set('port', process.env.PORT || 3000);

app.get('/hola',function (req,res){
    res.send("hola mundo");
});

app.listen(app.get('port'),()=>{
    console.log('server port ' + app.get('port'));
    console.log(path.join(__dirname,'storage/images/products '))
});
