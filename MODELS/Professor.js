const { MongoClient } = require("mongodb");

const Professor = MongoClient.model("Professor", {
    id: id,
    nome: String,
    telefone: Number,
    disciplina: String,
    email: String,
    senha: String,
    valorHora: Number,
    status: "ATIVO"
})

module.exports = Professor