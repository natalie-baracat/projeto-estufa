import { BD } from "../db.js";

class leiturasController {
    // rota de leitura para exbir as leituras dos sensores vindas do MQTT
    static async listar(req, res) {
        try {
            // obs: testar e ver depois como conectar tambem a tabela de CULTIVOS. nao acho que esse seja o modo certo
            // OBS2: testei, agora ta certo
            const leituras = await BD.query(`
                SELECT 
                    l.id_sensor, 
                    s.nome AS sensor, 
                    l.valor, 
                    s.unidade_medida, 
                    l.data_hora_leitura, 
                    c.nome AS cultivo
                FROM leituras_sensor l
                INNER JOIN sensores s 
                    ON l.id_sensor = s.id_sensor
                INNER JOIN cultivos c 
                    ON l.id_cultivo = c.id_cultivo
                WHERE s.ativo = true
                ORDER BY l.data_hora_leitura DESC;
                `)
            return res.status(200).json(leituras.rows)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar sensores — ", error: error.message
            })            
        }
    }

//     static async desativar(req, res) {// rota de inativaçao
//         const {id_leitura} = req.params

//         try {
//             const resultado = await BD.query (`
//                 UPDATE leituras_sensor
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


export default leiturasController