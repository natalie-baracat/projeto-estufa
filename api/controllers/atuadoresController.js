import { BD } from "../db.js";

class atuadoresController {
    // rota de leitura para exbir as atuadores dos sensores vindas do MQTT
    static async listar(req, res) {
        try {
            // obs: testar e ver depois como conectar tambem a tabela de CULTIVOS. nao acho que esse seja o modo certo
            // !!!! obs2: MUDAR O NOME DA TABELA PARA ***atuadores_sensor*** senao nao vai funcionar !!!!!
            const atuadores = await BD.query(`
                SELECT atuadores_sensor.valor, atuadores_sensor.id_sensor, atuadores_sensor.data_hora_leitura, s.nome AS sensor, s.unidade, s.tipo, c.valor AS cultivo
                    FROM atuadores_sensor
                    INNER JOIN sensores AS s
                    INNER JOIN cultivo AS c 
                    ON atuadores_sensor.id_sensor = s.id_sensor
                    WHERE s.ativo = true
                    ORDER BY data_hora_leitura DESC
                `)
            return res.status(200).json(atuadores.rows)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar sensores — ", error: error.message
            })            
        }
    }

    // rota de atualizaçao INDIVIDUAL
    // funçao para atualizar os valores de forma manual
    // obs: colocar uma autenticaçao de usuario e permissao talvez?
    static async editar(req, res) {
        const { id_leitura } = req.params
        const { data_hora_leitura, valor, id_sensor, tipo, unidade, ativo } = req.body

        try {
            // inicializa arrays para armazenar os campos (ex: id_cultivo, id_sensor) e valores (ex: $1, $2, ... $n) a serem atualizados
            const campos = []
            const valores = []

            // verificar quais campos foram fornecidos
            if (data_hora_leitura !== undefined) {
                campos.push(`data_hora_leitura = $${valores.length + 1}`)
                valores.push(data_hora_leitura)
            }
            
            if (id_sensor !== undefined) {
                campos.push(`id_sensor = $${valores.length + 1}`)
                valores.push(id_sensor)
            }
            
            if (valor !== undefined) {
                campos.push(`valor = $${valores.length + 1}`)
                valores.push(valor)
            }
           
            if (unidade !== undefined) {
                campos.push(`unidade = $${valores.length + 1}`)
                valores.push(unidade)
            }
           
            if (ativo !== undefined) {
                campos.push(`ativo = $${valores.length + 1}`)
                valores.push(ativo)
            }

            if(campos.length === 0) {
                return res.status(400).json({message: "Nenhum campo adicionado para atualização"})
            }

            // adicionar o id ao final do array valores
            valores.push(id_leitura)

            // montamos a query dinamicamente
            const query = `UPDATE atuadores_sensor
                            SET ${campos.join(", ")}
                            WHERE id_leitura = $${valores.length}
                            RETURNING *`

            // executando nossa query
            const sensor = await BD.query(query, valores)

            // verifica se o sensor foi atualizado
            if(sensor.rows.length === 0) {
                return res.status(404).json({message: "sensor não encontrado"})
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