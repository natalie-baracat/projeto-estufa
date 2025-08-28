import { BD } from "../db.js";

class sensoresController {    
    // rota de leitura
    static async listarTodos(req, res) {
        try {
            const sensores = await BD.query(`
                SELECT nome, ativo
                `)
            return res.status(200).json(sensores.rows)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar relatórios — ", error: error.message
            })            
        }
    }

    // rota de atualizaçao INDIVIDUAL
    // funçao para atualizar os valores individualmente
    static async editar(req, res) {
        const { id_sensor } = req.params
        const { id_cultivo, nome, img_sensor,} = req.body

        try {
            // inicializa arrays para armazenar os campos (ex: id_cultivo, img_sensor) e valores (ex: $1, $2, ... $n) a serem atualizados
            const campos = []
            const valores = []

            // verificar quais campos foram fornecidos
            if (id_cultivo !== undefined) {
                campos.push(`id_cultivo = $${valores.length + 1}`)
                valores.push(id_cultivo)
            }
            
            if (img_sensor !== undefined) {
                campos.push(`img_sensor = $${valores.length + 1}`)
                valores.push(img_sensor)
            }
            
            if (nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }

            if(campos.length === 0) {
                return res.status(400).json({message: "Nenhum campo adicionado para atualização"})
            }

            // adicionar o id ao final do array valores
            valores.push(id_sensor)

            // montamos a query dinamicamente
            const query = `UPDATE sensores
                            SET ${campos.join(", ")}
                            WHERE id_sensor = $${valores.length}
                            RETURNING *`

            // executando nossa query
            const sensor = await BD.query(query, valores)

            // verifica se o sensor foi atualizado
            if(sensor.rows.length === 0) {
                return res.status(404).json({message: "Relatório não encontrado"})
            }

            // se tudo der certo
            return res.status(200).json(sensor.rows[0])
            

        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static async desativar(req, res) {// rota de inativaçao
        const {id_sensor} = req.params

        try {
            const resultado = await BD.query (`
                UPDATE sensores
                SET ativo = FALSE
                WHERE id_sensor = $1
            `, [id_sensor])
    
            return res.status(200).json({message: "relatório desativado"})
            
        } catch (error) {
            console.error("Erro ao desativar relatório: ", error)
            return res.status(500).json({message: "Erro ao desativar relatório", error: error.message})            
        }
    }
}


export default sensoresController