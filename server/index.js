import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import {DB_USERNAME, DB_PASSWORD} from './Consts.js';
import db from './dbConfig.js';
import EvaluareLivrabil from './entities/EvaluareLivrabil.js';
import Livrabil from './entities/Livrabil.js';
import Proiect from './entities/Proiect.js';
import Student from './entities/Student.js';
import sequelize from 'sequelize'

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
app.use(express.json());

let conn;

mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
.then(connection => {
    conn = connection;
    return connection.query("CREATE DATABASE IF NOT EXISTS ProiectTW");
})
.then(() => {
    return conn.end();
})
.catch((err) => {
    console.warn(err.stack);
})

// crearea relatiilor dintre tabele

// Proiect cu Student: relatie 1 la n 
Proiect.hasMany(Student, {as: "Studenti", foreignKey: "ProiectId"});
Student.belongsTo(Proiect, {foreignKey: "ProiectId"});

// Proiect cu Livrabil: relatie 1 la n
Proiect.hasMany(Livrabil, {as: "Livrabile", foreignKey: "ProiectId"});
Livrabil.belongsTo(Proiect, {foreignKey: "ProiectId"});

// // Student si EvaluareLivrabil: relatie de many to many
// Student.belongsToMany(Livrabil, {through: "EvaluareLivrabil", as: "Evaluari", foreignKey: "StudentId"});
// Livrabil.belongsToMany(Student, {through: "EvaluareLivrabil", as: "Note", foreignKey: "LivrabilId"});

// Student si EvaluareLivrabil: relatie 1 la n
Student.hasMany(EvaluareLivrabil, {as: "Evaluari", foreignKey: "StudentId"})
EvaluareLivrabil.belongsTo(Student, {foreignKey: "StudentId"})

// Livrabil si EvaluareLivrabil: relatie 1 la n
Livrabil.hasMany(EvaluareLivrabil, {as: "Note", foreignKey: "LivrabilId"})
EvaluareLivrabil.belongsTo(Livrabil, {foreignKey: "LivrabilId"})

db.sync(); // crearea tabelelor si a legaturilor

// ----------------------------- Begin Logic -----------------------------

async function getProjects(){
    return await Proiect.findAll({include: ["Studenti", "Livrabile"]});
}

async function getProjectById(id){
    return await Proiect.findByPk(id, {include: ["Studenti", "Livrabile"]});
}

async function createProject(proiect){
    return await Proiect.create(proiect, 
        {include: [
            {model: Livrabil, as: "Livrabile"},
            {model: Student, as: "Studenti"}
        ]}
        );
}

async function getStudents(){
    return await Student.findAll({include: ["Evaluari"]});
}

async function getStudentById(id){
    return await Student.findByPk(id, {include: ["Evaluari"]});
}

async function createStudent(student){
    return await Student.create(student, {include: [{model: EvaluareLivrabil, as: "Evaluari"}]});
}

async function getLivrabile(){
    return await Livrabil.findAll({include: ["Note"]});
}

async function getLivrabilById(id){
    return await Livrabil.findByPk(id, {include: ["Note"]});
}

async function createLivrabil(livrabil){
    return await Livrabil.create(livrabil, {include: [{model: EvaluareLivrabil, as: "Note"}]});
}

async function getEvaluari(){
    return await EvaluareLivrabil.findAll();
}

async function getEvaluareById(id){
    return await EvaluareLivrabil.findByPk(id);
}

async function createEvaluare(evaluare){
    return await EvaluareLivrabil.create(evaluare);
}

async function deleteProiect(id){
    let deleteEntity = await getProjectById(id);

    if(!deleteEntity){
        console.log("There isn't a project with this id");
        return;
    }

    return await deleteEntity.destroy();
}

async function deleteStudent(id){
    let deleteEntity = await getStudentById(id);

    if(!deleteEntity){
        console.log("There isn't a student with this id");
        return;
    }

    return await deleteEntity.destroy();
}


// ----------------------------- End Logic -------------------------------


// ----------------------------- Begin routes ---------------------------

router.route('/proiect').get(async (req, res) => {
    return res.json(await getProjects());
})

router.route('/proiect/:id').get(async (req, res) => {
    let proiect = await getProjectById(req.params.id)
    let listaProiecte=[]
    listaProiecte.push(proiect)
    return res.json({listaProiecte:listaProiecte});
})

router.route('/proiect').post(async (req, res) => {
    return res.send(201).json(await createProject(req.body));
})

router.route('/student').get(async (req, res) => {
    return res.json(await getStudents());
})

router.route('/student/:id').get(async (req, res) => {
    return res.json(await getStudentById(req.params.id));
})

router.route('/student').post(async (req, res) => {
    return res.send(201).json(await createStudent(req.body));
})


router.route('/livrabil').get(async (req, res) => {
    return res.json(await getLivrabile());
})

router.route('/livrabil/:id').get(async (req, res) => {
    return res.json(await getLivrabilById(req.params.id));
})

router.route('/livrabil').post(async (req, res) => {
    console.log(req.body);
    return res.send(201).json(await createLivrabil(req.body));
})

router.route('/livrabil').put(async(req,res)=> {
    const livrabil = await Livrabil.findByPk(req.body.idLivrabil);
    console.log("pl")
    console.log(livrabil);
    if (livrabil) {
        const livrabilUpdatat = await livrabil.update({LivrabilId:livrabil.LivrabilId, LivrabilName: livrabil.LivrabilName, LivrabilDeadline: livrabil.LivrabilDeadline,
        ProiectId: req.body.ProiectId,LivrabilLink:req.body.LivrabilLink});
        if(livrabilUpdatat){
            res.status(200).json({message:"Actualizat!"});
        }
        else{
            res.status(404).json({ message: "Nu exista livrabilul cautat!" });
        }
    }
})

router.route('/evaluare').get(async (req, res) => {
    return res.json(await getEvaluari());
})

router.route('/evaluare/:id').get(async (req, res) => {
    return res.json(await getEvaluareById(req.params.id));
})

router.route('/evaluare').post(async (req, res) => {
    return res.send(201).json(await createEvaluare(req.body));
})


router.route('/proiect/:id').delete(async(req, res) =>{
    try{
     return res.json(await deleteProiect(req.params.id))
    }
    catch(e){
        console.log(e.message)
    }
 })

router.route('/student/:id').delete(async(req, res) =>{
    try{
     return res.json(await deleteStudent(req.params.id))
    }
    catch(e){
        console.log(e.message)
    }
 })

 router.route('/login/:id').post(async (req, res) => {
     try{
     let passwordTransmisa = req.body.password;
     let studentCautat=await Student.findOne({where:{StudentId:req.params.id}})
     let passwordBD = (studentCautat).dataValues.StudentPassword;

     if (passwordTransmisa === passwordBD) {
         return res.status(201).json({
             "logInStatus" : true,
             "idProiect":studentCautat.ProiectId,
             "idStudent":studentCautat.StudentId
         });
         
     }
     else
        return res.status(401).json({
            "logInStatus": false
        });
    }
    catch(err){
        console.warn(err)
    }
     
})

router.route('/getLivrabilPtEvaluare').post(async (req,res)=>{
    try{
        let celelalteProiecte= await Proiect.findAll({
            where:{
                ProiectId:{
                    [sequelize.Op.not]:req.body.ProiectId
                }
            }
        });
        let indiceProiectRandom = Math.floor(Math.random()*celelalteProiecte.length);
        let livrabile = await Livrabil.findAll({
            where:{
                ProiectId:celelalteProiecte[indiceProiectRandom].dataValues.ProiectId
            }
        });
        if(livrabile[0].dataValues!=null){
            let indiceLivrabilRandom = Math.floor(Math.random()*livrabile.length);

            return res.json({livrabil:livrabile[indiceLivrabilRandom].dataValues});
        }
    }
    catch(err){
        console.warn(err)
    }
})

router.route('/evaluareLivrabil').post(async(req,res)=>{
try
{    let studentId=req.body.studentId;
    let nota = req.body.nota;
    let livrabilId=req.body.livrabilId;
    console.log(livrabilId)

    let evaluare = await EvaluareLivrabil.create({"StudentId":studentId,"EvaluareLivrabilNota":nota,"LivrabilId":livrabilId});
    console.log(evaluare)
    if(evaluare){
        return res.json({message:"Creat!"});
    }
}
catch(error) {
    console.error(error)
}

})


// ----------------------------- End routes -----------------------------



let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);