const mongoose = require("mongoose")
const Professor = require("./Professor")
const Aluno = require("./Alunos")
const Disciplina = require("./Disciplina")

const Aula = mongoose.model("Aula", {
    id: id,
    idProfessor: Professor.id,
    idAluno: Aluno.id,
    idDisciplina: Disciplina.id,
    observacoes: String,
    Inicio: String,
    Fim: String
})

module.exports = Aula