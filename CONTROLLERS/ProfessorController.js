const Professor = require("../MODELS/Professor")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const novoProfessor = async (req, res)=>{
    const {
        nome,
        telefone,
        valorHora,
        disciplina,
        email,
        senha,
        repitaSenha
    } = req.body

    if(!nome || !valorHora || !telefone || !email || !senha || !repitaSenha || !disciplina){
        return res.status(400).json({
            Mensagem: "Todos os campos são obrigatórios!"
        })
    }

    const validaEmail = await Professor.find({email:email})

    if(validaEmail){
        return res.status(400).json({
            Mensagem:"Este email já está em uso!"
        })
    }

    if(senha !== repitaSenha){
        return res.status(400).json({
            Mensagem: "As senhas devem ser iguais!"
        })
    }

    const salt = bcrypt.genSalt(15)
    const senhaHash = await bcrypt.hash(senha, salt)

    const novoProfessor = new Professor({
        nome,
        telefone,
        valorHora,
        disciplina,
        email,
        senha: senhaHash,
    })

    try{
        await novoProfessor.save()

        return res.status(201).json({
            Sucesso: novoProfessor
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            Mensagem: "Aconteceu um erro não esperado!"
        })
    }
}

const loginProfessor = async(req, res)=>{
    const {email, senha} = req.body
    
    if (!email || !senha){
        return res.status(400).json({
            Mensagem: "Todos os campos são obrigatórios!"
        })
    }

    const validausuario = await Professor.findOne({
        email: email
    })
    const validasenha = await bcrypt.compare(senha, validausuario.senha)

    if(! validasenha || !validausuario){
        return res.status(400).json({
            Mensagem: "Informações incorretas"
        })
    }

    try{
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: validausuario.id
        }, secret)

        return res.status(200).json({
            Mensagem: "Login efetuado com sucesso!",
            Token: token
        })
    }catch(error){
        return res.status(500).json({
            Mensagem: "Houve um erro inexperado!"
        })
    }
}

module.exports = {
    novoProfessor,
    loginProfessor
}