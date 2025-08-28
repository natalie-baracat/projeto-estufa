import { BD } from "../db.js";

class relatorioController {
    static async novoRelatorio(req, res) {

        const { id_cultivo, data_relatorio, conteudo, id_usuario } = req.body

        try {
            const query = `INSERT INTO relatorios(id_cultivo, data_relatorio, titulo, conteudo, id_usuario) VALUES($1, $2, $3, $4)`
            const valores = [id_cultivo, data_relatorio, titulo, conteudo, id_usuario]
            const resposta = await BD.query(query, valores)

            res.status(201).json("Relatório registrado com sucesso")

        } catch (error) {
            console.error("Erro ao criar relatório", error)
            res.status(500).json({
                message: "Erro ao criar relatório",
                error: error.message
            })
        }
    }
    
    // rota de leitura
    static async listarTodos(req, res) {
        try {
            const relatorios = await BD.query(`
                SELECT u.id_usuario, u.nome, u.sobrenome, r.id_usuario, r.titulo, r.conteudo, r.data_relatorio, r.id_cultivo, c.nome AS cultivo
                    FROM relatorios AS r
                    JOIN usuarios AS u ON u.id_usuario = r.id_usuario
                    JOIN cultivos AS c ON c.id_cultivo = r.id_cultivo
                `)
            return res.status(200).json(relatorios.rows)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar relatórios — ", error: error.message
            })            
        }
    }

    // rota de atualizaçao INDIVIDUAL
    // funçao para atualizar os valores individualmente
    static async editarRelatório(req, res) {
        const { id_relatorio } = req.params
        const { id_cultivo, conteudo, titulo} = req.body

        try {
            // inicializa arrays para armazenar os campos (ex: id_cultivo, conteudo) e valores (ex: $1, $2, ... $n) a serem atualizados
            const campos = []
            const valores = []

            // verificar quais campos foram fornecidos
            if (id_cultivo !== undefined) {
                campos.push(`id_cultivo = $${valores.length + 1}`)
                valores.push(id_cultivo)
            }
            
            if (conteudo !== undefined) {
                campos.push(`conteudo = $${valores.length + 1}`)
                valores.push(conteudo)
            }
            
            if (titulo !== undefined) {
                campos.push(`titulo = $${valores.length + 1}`)
                valores.push(titulo)
            }

            if(campos.length === 0) {
                return res.status(400).json({message: "Nenhum campo adicionado para atualização"})
            }

            // adicionar o id ao final do array valores
            valores.push(id_relatorio)

            // montamos a query dinamicamente
            const query = `UPDATE relatorios
                            SET ${campos.join(", ")}
                            WHERE id_relatorio = $${valores.length}
                            RETURNING *`

            // executando nossa query
            const relatorio = await BD.query(query, valores)

            // verifica se o relatorio foi atualizado
            if(relatorio.rows.length === 0) {
                return res.status(404).json({message: "Relatório não encontrado"})
            }

            // se tudo der certo
            return res.status(200).json(relatorio.rows[0])
            

        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static async excluirRelatorio(req, res) {// rota de inativaçao
        const {id_relatorio} = req.params

        try {
            const resultado = await BD.query (`
                UPDATE relatorios
                SET ativo = FALSE
                WHERE id_relatorio = $1
            `, [id_relatorio])
    
            return res.status(200).json({message: "Relatório excluído com sucesso"})
            
        } catch (error) {
            console.error("Erro ao excluir relatório: ", error)
            return res.status(500).json({message: "Erro ao excluir relatório", error: error.message})            
        }
    }
}


export default relatorioController