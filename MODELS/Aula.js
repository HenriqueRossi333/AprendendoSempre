const { MongoClient } = require("mongodb");
const Professor = require("./Professor")
const Aluno = require("./Alunos")
const Disciplina = require("./Disciplina")

const Aula = MongoClient.model("Aula", {
    id: id,
    idProfessor: Professor.id,
    idAluno: Aluno.id,
    idDisciplina: Disciplina.id,
    observacoes: String,
    Inicio: String,
    Fim: String
})

module.exports = Aula