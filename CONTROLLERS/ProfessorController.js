const Professor = require("../MODELS/Professor")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const novoProfessor = async (req, res) => {
    const {
        nome,
        telefone,
        valorHora,
        disciplina,
        email,
        senha,
        repitaSenha
    } = req.body

    if (!nome || !valorHora || !telefone || !email || !senha || !repitaSenha || !disciplina) {
        return res.status(400).json({
            Mensagem: "Todos os campos são obrigatórios!"
        })
    }

    const validaEmail = await Professor.find({ email: email })

    if (validaEmail) {
        return res.status(400).json({
            Mensagem: "Este email já está em uso!"
        })
    }

    if (senha !== repitaSenha) {
        return res.status(400).json({
            Mensagem: "As senhas devem ser iguais!"
        })
    }

    const salt = bcrypt.genSalt(15)
    const senhaHash = await bcrypt.hash(senha, salt)

    const Disciplina = require("./Disciplina")
    const novoProfessor = new Professor({
        nome,
        telefone,
        valorHora,
        disciplina: Disciplina.id,
        email,
        senha: senhaHash,
    })

    try {
        await novoProfessor.save()

        return res.status(201).json({
            Sucesso: novoProfessor
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Mensagem: "Aconteceu um erro não esperado!"
        })
    }
}

const loginProfessor = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({
            Mensagem: "Todos os campos são obrigatórios!"
        })
    }

    const validausuario = await Professor.findOne({
        email: email
    })
    const validasenha = await bcrypt.compare(senha, validausuario.senha)

    if (!validasenha || !validausuario) {
        return res.status(400).json({
            Mensagem: "Informações incorretas"
        })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: validausuario.id
        }, secret)

        return res.status(200).json({
            Mensagem: "Login efetuado com sucesso!",
            Token: token
        })
    } catch (error) {
        return res.status(500).json({
            Mensagem: "Houve um erro inexperado!"
        })
    }
}

const marcarAula = async (req, res) => {
    const id = req.params.id
    const Professor = require("./Professor")
    const Aluno = require("./Alunos")
    const Disciplina = require("./Disciplina")

    const validaProfessor = await Professor.findOne({
        id
    })

    if(!validaProfessor){
        return res.status(400).json({
            mensagem: "Perfil de professor não encontrado!"
        })
    }

    const {qtdAulas, inicio, observacoes, emailAluno} = req.body

    if(!qtdAulas || !inicio || !observacoes || !emailAluno){
        return res.status(400).json({
            Mensagem: "Todas as informações devem ser preenchidas!"
        })
    }

    const validaEmailAluno = await Aluno.findOne({
        email: emailAluno
    })

    if(!validaEmailAluno){
        return res.status(404).json({
            Mensagem: "Nenhum aluno com esse email foi encontrado!"
        })
    }

    const novaAula = new Aula({
        idProfessor: id,
        idAluno: validaEmailAluno.id,
        idDisciplina: validaProfessor.idDisciplina,
        observacoes,
        Inicio: inicio,
        qtdAulas
    })

    try{
        await novaAula.save()

        return res.status(201).json({
            Sucesso: novaAula
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            mensagem: "Erro no sistema!"
        })
    }
}

module.exports = {
    novoProfessor,
    loginProfessor,
    marcarAula
}