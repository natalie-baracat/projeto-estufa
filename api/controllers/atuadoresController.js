import { BD } from "../db.js";

class atuadoresController {
    // rota de leitura para exbir os atuadores dos sensores vindas do MQTT
    static async listar(req, res) {
        try {
            // obs: testar e ver depois como conectar tambem a tabela de CULTIVOS. nao acho que esse seja o modo certo
            // !!!! obs2: MUDAR O NOME DA TABELA PARA ***atuadores_sensor*** senao nao vai funcionar !!!!!
            const atuadores = await BD.query(`
                SELECT 
                    atuadores_sensor.nome,
                    atuadores_sensor.status,
                    atuadores_sensor.descricao,
                    atuadores_sensor.porta_controle,
                    atuadores_sensor.tipo,
                    c.nome AS cultivo
                    FROM atuadores_sensor
                    JOIN cultivos AS c ON atuadores_sensor.id_cultivo = c.id_cultivo
                   
                `)
            return res.status(200).json(atuadores.rows)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar atuadores — ", error: error.message
            })            
        }
    }

    // rota de atualizaçao INDIVIDUAL
    // funçao para atualizar os valores de forma manual
    // obs: colocar uma autenticaçao de usuario e permissao talvez?
    static async editar(req, res) {
        const { id_atuador } = req.params
        const { status, nome, descricao, porta_controle, tipo } = req.body

        try {
            // inicializa arrays para armazenar os campos (ex: id_cultivo, id_sensor) e valores (ex: $1, $2, ... $n) a serem atualizados
            const campos = []
            const valores = []

            // verificar quais campos foram fornecidos
            if (status !== undefined) {
                campos.push(`status = $${valores.length + 1}`)
                valores.push(status)
            }
            
            if (nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }
            
            if (descricao !== undefined) {
                campos.push(`descricao = $${valores.length + 1}`)
                valores.push(descricao)
            }
           
            if (porta_controle !== undefined) {
                campos.push(`porta_controle = $${valores.length + 1}`)
                valores.push(porta_controle)
            }
        
            if(campos.length === 0) {
                return res.status(400).json({message: "Nenhum campo adicionado para atualização"})
            }

            // adicionar o id ao final do array valores
            valores.push(id_atuador)

            // montamos a query dinamicamente
            const query = `UPDATE atuadores_sensor
                            SET ${campos.join(", ")}
                            WHERE id_atuador = $${valores.length}
                            RETURNING *`

            // executando nossa query
            const sensor = await BD.query(query, valores)

            // verifica se o sensor foi atualizado
            if(sensor.rows.length === 0) {
                return res.status(404).json({message: "Atuador não encontrado"})
            }

            // se tudo der certo
            return res.status(200).json(sensor.rows[0])
            

        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

//     static async desativar(req, res) {// rota de inativaçao
//         const {id_leitura} = req.params

//         try {
//             const resultado = await BD.query (`
//                 UPDATE atuadores_sensor
//                 SET ativo = FALSE
//                 WHERE id_leitura = $1
//             `, [id_leitura])
    
//             return res.status(200).json({message: "sensor desativado"})
            
//         } catch (error) {
//             console.error("Erro ao desativar sensor: ", error)
//             return res.status(500).json({message: "Erro ao desativar sensor", error: error.message})            
//         }
//     }
}


export default atuadoresController