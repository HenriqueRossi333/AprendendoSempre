const mongoose = require("mongoose")

const Disciplina = mongoose.model("Disciplina", {
    id: id,
    nome: String,
    descricao: String,
    Status: "ATIVA"
})

module.exports = Disciplina