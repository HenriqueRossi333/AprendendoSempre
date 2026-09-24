const { MongoClient } = require("mongodb");

const Disciplina = MongoClient.model("Disciplina", {
    id: id,
    nome: String,
    descricao: String,
    Status: "ATIVA"
})

module.exports = Disciplina