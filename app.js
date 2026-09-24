require("dotenv").config();

const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

// Informações
const port = process.env.PORT;
const usuario = process.env.DB_USER;
const senha = process.env.DB_PASS;

// Conexão com o MongoDB
const uri = `mongodb+srv://${usuario}:${senha}@cluster0.gdowrw2.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri);

client.connect()
    .then(() => {
        console.log("Conectado ao banco!");

        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    })
    .catch((error) => {
        console.log("Não foi possível conectar ao banco!");
        console.log(error);
    });

//FUNCIONALIDADES DOS ALUNOS

const Aluno = require("./CONTROLLERS/AlunoController")
app.post("/novo/aluno", Aluno.novoAluno)
app.post("/aluno/login", Aluno.login)
app.path("/aluno/altera-email/:id", Aluno.alterarEmail)
app.path("/aluno/altera-snha/:id", Aluno.alterarEmail)

//FUNCIONALIDADES DOS ALUNOS

const Professor = require("./CONTROLLERS/ProfessorController")
app.post("/professor/novo", Professor.novoProfessor)
app.post("/professor/login", Professor.loginProfessor)
app.post("/professor/:id/nova-aula", Professor.marcarAula)