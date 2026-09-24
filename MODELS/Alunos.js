const { MongoClient } = require("mongodb");

const Aluno = MongoClient.model("Aluno", {
    id: id,
    nome: String,
    dataNascimento: Date,
    qtdAulas: Number,
    telefone: Number,
    email: String,
    senha: String
})

module.exports = Aluno