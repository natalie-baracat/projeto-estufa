import { BD } from "../db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const SECRET_KEY = "chavesupersecreta"

class userController {
    static async novo(req, res) {
        const { nome, sobrenome, usuario, telefone, email, senha, id_cargo } = req.body

        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        try {

            // outro jeito: 
            const query = `INSERT INTO usuarios(nome, sobrenome, usuario, email, telefone, senha, id_cargo) VALUES($1, $2, $3, $4, $5, $6, $7)`
            const valores = [nome, sobrenome, usuario, email, telefone, senhaCriptografada, id_cargo]
            const resposta = await BD.query(query, valores)

            res.status(201).json("Usuário cadastrado com sucesso")


        } catch (error) {
            console.error("Erro ao criar usuário", error)
            res.status(500).json({
                message: "Erro ao criar usuário",
                error: error.message
            })
        }
    }

    // rota de login
    static async login(req, res){
        const { email, senha } = req.body

        try {
            // validaçao
            const resultado = await BD.query(`
                SELECT *
                FROM usuarios
                WHERE email = $1 AND ativo = true`, 
                [email]
            )

            if (resultado.rows === 0) {
                return res.status(401).json({message: "Email inválido"})
            }

            const usuario = resultado.rows[0]
            const senhaValida = await bcrypt.compare(senha, usuario.senha)

            if (!senhaValida) {
                return res.status(401).json({message: "Senha incorreta"})
            }

            // geracao de um novo token (JWT) para o usuario
            const token = jwt.sign(
                // payload
                {
                    id: usuario.id_usuario, 
                    nome: usuario.nome, 
                    sobrenome: usuario.sobrenome, 
                    email: usuario.email
                },
                // chave
                SECRET_KEY
                // tempo ate ser expirado
                // {
                //     expiresIn: "1h"
                // }
            )

            return res.status(200).json(
                { 
                    token, 
                    id_usuario: usuario.id_usuario, 
                    nome: usuario.nome, 
                    sobrenome: usuario.sobrenome, 
                    email: usuario.email,
                }
            )

        } catch (error) {
            console.error("Erro ao realizar login: ", error)
            return res.status(500).json({message: "Erro ao fazer login", error: error.message})
        }
    }

    // rota de leitura
    static async listar(req, res) {
        try {
            const usuarios = await BD.query(`
                SELECT u.id_usuario, u.nome, u.sobrenome, c.nome AS cargo, u.usuario, u.email, u.telefone, u.img_perfil
                    FROM usuarios AS u
                    JOIN cargos AS c ON c.id_cargo = u.id_cargo 
                        WHERE ativo = true
                `)
            return res.status(200).json(usuarios.rows)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar usuários — ", error: error.message
            })            
        }
    }

    // rota de atualizaçao INDIVIDUAL
    // funçao para atualizar os valores individualmente
    static async editar(req, res) {
        const { id } = req.params
        const { nome, sobrenome, usuario, telefone, email, senha, id_cargo, img_perfil } = req.body

        try {
            // inicializa arrays para armazenar os campos (ex: nome, email) e valores (ex: $1, $2, ... $n) a serem atualizados
            const campos = []
            const valores = []

            // verificar quais campos foram fornecidos
            if (nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }
            
            if (sobrenome !== undefined) {
                campos.push(`sobrenome = $${valores.length + 1}`)
                valores.push(sobrenome)
            }
            
            if (email !== undefined) {
                campos.push(`email = $${valores.length + 1}`)
                valores.push(email)
            }

            if (senha !== undefined) {
                campos.push(`senha = $${valores.length + 1}`)
                valores.push(senha)
            }
            
            if (id_cargo !== undefined) {
                campos.push(`id_cargo = $${valores.length + 1}`)
                valores.push(id_cargo)
            }
            
            if (telefone !== undefined) {
                campos.push(`telefone = $${valores.length + 1}`)
                valores.push(telefone)
            }
            
            if (usuario !== undefined) {
                campos.push(`usuario = $${valores.length + 1}`)
                valores.push(usuario)
            }
            
            if (img_perfil !== undefined) {
                campos.push(`img_perfil = $${valores.length + 1}`)
                valores.push(img_perfil)
            }

            if(campos.length === 0) {
                return res.status(400).json({message: "Nenhum campo adicionado para atualização"})
            }

            // adicionar o id ao final do array valores
            valores.push(id)

            // montamos a query dinamicamente
            const query = `UPDATE usuarios
                            SET ${campos.join(", ")}
                            WHERE id_usuario = $${valores.length}
                            RETURNING *`

            // executando nossa query
            const usuarioQuery = await BD.query(query, valores)

            // verifica se o usuario foi atualizado
            if(usuarioQuery.rows.length === 0) {
                return res.status(404).json({message: "Usuário não encontrado"})
            }

            // se tudo der certo
            return res.status(200).json(usuarioQuery.rows[0])
            
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    // consulta por id
    // static async consultaPorId(req, res) {
    //     const { id } = req.params
    //     try {
    //         const usuario = await BD.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id])
    //         return res.status(200).json(usuario.rows)
    //     } catch (error) {
    //         res.status(500).json({message: "Erro ao consultar usuário", error: error.message})
    //     }
    // }

    static async desativar(req, res) {// rota de inativaçao
        const {id} = req.params

        try {
            const resultado = await BD.query (`
                UPDATE usuarios
                SET ativo = FALSE
                WHERE id_usuario = $1
            `, [id])
    
            return res.status(200).json({message: "Usuário desativado"})
            
        } catch (error) {
            console.error("Erro ao desativar usuário: ", error)
            return res.status(500).json({message: "Erro ao desativar usuário", error: error.message})            
        }
    }
}

// funçao middleware para proteger rotas privadas
export function autenticarToken(req, res, next) {
    // extrair o cabecalho (header) da requisiçao do token
    const token = req.headers["authorization"] // Bearer<token>
    console.log(token)
    // verificar se o token foi fornecido na requisicao
    if (!token) return res.status(403).json({mensagem: "Token não fornecido"}) // nao preciso abrir {} no if se houver apenas uma linha de comando
    console.log("Passou do if")
    // verificar se o token é valido — jwt.verify que valida se o token é legitimo
    jwt.verify(token.split(" ")[1], SECRET_KEY, (err, usuario) => {
        // se der erro
        if (err) return res.status(403).json({mensagem: "Token inválido"}) 

        // se o token for valido, adiciona os dados do usuario (decodificados no token), tornando essas informaçoes disponiveis nas rotas que precisam da autenticaçao
        
        req.usuario = usuario
        next()
    })
    console.log("Passou do jwt")
    
}

export default userController