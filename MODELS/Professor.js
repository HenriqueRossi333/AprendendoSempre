const mongoose = require("mongoose")

const Professor = mongoose.model("Professor", {
    id: Number,
    nome: String,
    telefone: Number,
    disciplina: String,
    email: String,
    senha: String,
    valorHora: Number,
    status: "ATIVO"
})

module.exports = Professor