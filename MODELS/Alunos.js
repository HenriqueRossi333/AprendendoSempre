const mongoose = require("mongoose");

const Aluno = mongoose.model("Aluno", {
    id: Number,
    nome: String,
    dataNascimento: Date,
    qtdAulas: Number,
    telefone: String,
    email: String,
    senha: String
});

module.exports = Aluno;