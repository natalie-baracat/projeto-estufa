import { BD } from "../db.js";

class sensoresController {
    static async novo(req, res) {
        /* OBS: vou reformular a tabela do banco de dados se necessario

        ADICIONAR CAMPO "ativo" NO BANCO DE DADOS !!!
            
        */
        const { nome, img_sensor, descricao, unidade, tipo, ativo } = req.body

        try {
            const query = `INSERT INTO sensores(nome, img_sensor, descricao, unidade, tipo, ativo) VALUES($1, $2, $3, $4, $5, $6)`
            const valores = [nome, img_sensor, descricao, unidade, tipo, ativo]
            const resposta = await BD.query(query, valores)

            res.status(201).json("sensor registrado com sucesso! Lembre-se de fazer as conexões eletrônicas corretas")

        } catch (error) {
            console.error("Erro ao criar sensor", error)
            res.status(500).json({
                message: "Erro ao criar sensor",
                error: error.message
            })
        }
    }
    
    // rota de leitura para mostrar os sensores
    static async listar(req, res) {
        try {
            const sensores = await BD.query(`
                SELECT s.nome, s.img_sensor, s.descricao, s.unidade, s.tipo, s.ativo, c.nome AS cultivo
                    FROM sensores AS s
                    INNER JOIN cultivo AS c 
                    ON s.id_cultivo = c.id_cultivo
                `)
            return res.status(200).json(sensores.rows)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar sensores — ", error: error.message
            })            
        }
    }

    // rota de atualizaçao INDIVIDUAL
    // funçao para atualizar os valores individualmente
    static async editar(req, res) {
        const { id_sensor } = req.params
        const { descricao, nome, img_sensor, tipo, unidade, ativo } = req.body

        try {
            // inicializa arrays para armazenar os campos (ex: id_cultivo, img_sensor) e valores (ex: $1, $2, ... $n) a serem atualizados
            const campos = []
            const valores = []

            // verificar quais campos foram fornecidos
            if (descricao !== undefined) {
                campos.push(`descricao = $${valores.length + 1}`)
                valores.push(descricao)
            }
            
            if (img_sensor !== undefined) {
                campos.push(`img_sensor = $${valores.length + 1}`)
                valores.push(img_sensor)
            }
            
            if (nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
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
                return res.status(404).json({message: "sensor não encontrado"})
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
    
            return res.status(200).json({message: "sensor desativado"})
            
        } catch (error) {
            console.error("Erro ao desativar sensor: ", error)
            return res.status(500).json({message: "Erro ao desativar sensor", error: error.message})            
        }
    }
}


export default sensoresController