import pkg from "pg"
import dotenv from "dotenv"

const { Pool } = pkg
dotenv.config()


// const BD = new Pool({
//     connectionString: "postgres://postgres.cxtkkyqppdbygezfsffn:YEOurkKTFZdIYV62@aws-0-us-east-1.pooler.supabase.com:5432/postgres",
//     ssl: {
//         rejectUnauthorized: false
//     },

//     // gpt :
//     // max: 5, // Reduza o número máximo de conexões se o erro persistir
//     // idleTimeoutMillis: 15000, // Reduzindo tempo inativo para 15 segundos
//     // connectionTimeoutMillis: 5000 // Tempo máximo para tentar conectar antes de erro
// })

const BD = new Pool ({
    user: "postgres",
    host: "localhost",
    password: "admin",
    database: "bd_projeto_senai",
    port: 5432

})

const testarConexao = async () => {
    try {
        const client = await BD.connect() // tenta estabelecer a conexao com o banco de dados
        console.log("✔ Conexão com o banco de dados estabelecida");
        client.release() // libera o cliente
    } catch (error) {
        console.error("Erro ao conectar banco de dados — ", error.message)
    }
}

export {BD, testarConexao}