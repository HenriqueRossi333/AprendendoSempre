const { MongoClient } = require("mongodb")
const Aluno = require("./Alunos")
const Professor = require("./Professor")
const Disciplina = require("./Disciplina")

const Pagamento = MongoClient.model("Pagamento", {
    id: id,
    idProfessor: Professor.id,
    idAluno: Aluno.id,
    idDisciplina: Disciplina.id,
    valor: Number,
    foiPago: String,
    dataVencimento: Date
})

module.exports = Pagamento