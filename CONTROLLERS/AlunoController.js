const Aluno = require("../MODELS/Alunos")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const novoAluno = async (req, res) => {
    const {
        nome,
        dataNascimento,
        telefone,
        email,
        senha,
        repitaSenha
    } = req.body

    if (!nome || !dataNascimento || !telefone || !email || !senha || !repitaSenha) {
        return res.status(400).json({
            Mensagem: "Todos os campos são obrigatórios!"
        })
    }

    const validaEmail = await Aluno.find({ email: email })

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

    const NovoAluno = new Aluno({
        nome,
        dataNascimento,
        telefone,
        email,
        senha: senhaHash
    })

    try {
        await NovoAluno.save()

        return res.status(201).json({
            Sucesso: NovoAluno
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            Mensagem: "Aconteceu um erro não esperado!"
        })
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) {
        return res.status(400).json({
            Mensagem: "Todos os campos são obrigatórios!"
        })
    }

    const validausuario = await Aluno.findOne({
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
            id: Aluno.id
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

const listarAlunos = async (req, res) => {
    const listaTodos = await Aluno.findAll()

    if (!listaTodos) {
        return res.status(404).json({
            Mensagem: "Nenhum aluno cadastrado ainda!"
        })
    } else {
        return res.status(200).json({
            Alunos: listaTodos
        })
    }
}

const alterarEmail = async (req, res) => {
    const id = req.params.id

    const buscaUsuario = await User.findById(id, '-senha')

    if (!buscaUsuario) {
        return res.status(404).json({
            MENSAGEM: "Usuário não encontrado!"
        })
    }

    const { emailAntigo, emailNovo } = req.body

    const validaEmail = await Aluno.findOne({
        email: emailAntigo
    })

    if (!validaEmail) {
        return res.status(404).json({
            Mensagem: "Nenhum email encontrado!"
        })
    } else {
        try {
            const novoEmail = await Aluno.updateOne({
                id: validaEmail.id
            }, { $set: { email: emailNovo } })

            return res.status(200).json({
                Mensagem: "Email alterado com sucesso!",
                email: novoEmail
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                Mensagem: "Erro no sistema!"
            })
        }
    }
}

module.exports = {
    novoAluno,
    login,
    listarAlunos,
    alterarEmail
}