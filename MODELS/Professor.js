const { MongoClient } = require("mongodb");

const Professor = MongoClient.model("Professor", {
    id: id,
    nome: String,
    telefone: Number,
    email: String,
    senha: String,
    valorHora: Number,
    status: String
})

module.exports = Professor