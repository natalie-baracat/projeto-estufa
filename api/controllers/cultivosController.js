import { BD } from "../db.js";

class cultivosController {
    static async novo(req, res) {
        const id_usuario = req.usuario.id

        const { 
            nome, 
            variedade, 
            img_cultivo, 
            descricao, 
            data_criacao, 
            data_colheita,
            estagio_atual,
            dias_ciclo,
            tipo_local,
            substrato,
            tipo_solo,
            area_plantio,
            adubacao,
            umid_min,
            umid_max //adicionei isso, precisa criar no banco
         } = req.body

        try {
            const dataCriacaoTimestamp = data_criacao ? new Date(data_criacao).toISOString() : null;
            const dataColheitaTimestamp = data_colheita ? new Date(data_colheita).toISOString() : null;

            const query = `INSERT INTO cultivos(
                id_usuario,
                nome,
                variedade,
                img_cultivo,
                descricao,
                data_criacao,
                data_colheita,
                estagio_atual,
                dias_ciclo,
                tipo_local,
                substrato,
                tipo_solo,
                area_plantio,
                adubacao,
                umid_min,
                umid_max
                ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`
            const valores = [id_usuario, nome, variedade, img_cultivo, descricao, dataCriacaoTimestamp, dataColheitaTimestamp, estagio_atual, dias_ciclo, tipo_local, substrato, tipo_solo, area_plantio, adubacao, umid_min, umid_max]
            const resposta = await BD.query(query, valores)

            res.status(201).json("cultivo/plantio registrado com sucesso")

        } catch (error) {
            console.error("Erro ao criar cultivo/plantio", error)
            res.status(500).json({
                message: "Erro ao criar cultivo/plantio",
                error: error.message
            })
        }
    }
    
    // rota de leitura
    static async listarTodos(req, res) {
        try {
            const cultivos = await BD.query(`
                SELECT  
                    nome,
                    variedade,
                    img_cultivo,
                    descricao,
                    data_criacao,
                    data_colheita,
                    estagio_atual,
                    dias_ciclo,
                    tipo_local,
                    substrato,
                    tipo_solo,
                    area_plantio,
                    adubacao
                FROM cultivos
                `)
            return res.status(200).json(cultivos.rows)
        } catch (error) {
            res.status(500).json({message:
                "Erro ao listar cultivo/plantios — ", error: error.message
            })            
        }
    }

    // rota de atualizaçao INDIVIDUAL
    // funçao para atualizar os valores individualmente
    static async editar(req, res) {
        const { id_cultivo } = req.params
        // to requisitando o id do usuario que fez a ediçao tambem
        const { id_usuario, nome, variedade, img_cultivo, descricao, estagio_atual} = req.body

        try {
            // inicializa arrays para armazenar os campos (ex: id_cultivo, conteudo) e valores (ex: $1, $2, ... $n) a serem atualizados
            const campos = []
            const valores = []

            // verificar quais campos foram fornecidos
            if ( nome !== undefined) {
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }
            
            if (variedade !== undefined) {
                campos.push(`variedade = $${valores.length + 1}`)
                valores.push(variedade)
            }
            
            if (img_cultivo !== undefined) {
                campos.push(`img_cultivo = $${valores.length + 1}`)
                valores.push(img_cultivo)
            }
            
            if (descricao !== undefined) {
                campos.push(`descricao = $${valores.length + 1}`)
                valores.push(descricao)
            }
            
            if (estagio_atual !== undefined) {
                campos.push(`estagio_atual = $${valores.length + 1}`)
                valores.push(estagio_atual)
            }
           
            if (adubacao !== undefined) {
                campos.push(`adubacao = $${valores.length + 1}`)
                valores.push(adubacao)
            }

            if(campos.length === 0) {
                return res.status(400).json({message: "Nenhum campo adicionado para atualização"})
            }

            // adicionar o id ao final do array valores
            valores.push(id_cultivo)

            // montamos a query dinamicamente
            const query = `UPDATE cultivos
                            SET ${campos.join(", ")}
                            WHERE id_cultivo = $${valores.length}
                            RETURNING *`

            // executando nossa query
            const cultivo = await BD.query(query, valores)

            // verifica se o cultivo foi atualizado
            if(cultivo.rows.length === 0) {
                return res.status(404).json({message: "cultivo/plantio não encontrado"})
            }

            // se tudo der certo
            return res.status(200).json(cultivo.rows[0])
            

        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static async excluirCultivo(req, res) {// rota de inativaçao
        const {id_cultivo} = req.params

        try {
            const resultado = await BD.query (`
                UPDATE cultivos
                SET ativo = FALSE
                WHERE id_cultivo = $1
            `, [id_cultivo])
    
            return res.status(200).json({message: "cultivo/plantio excluído com sucesso"})
            
        } catch (error) {
            console.error("Erro ao excluir cultivo/plantio: ", error)
            return res.status(500).json({message: "Erro ao excluir cultivo/plantio", error: error.message})            
        }
    }
}


export default cultivosController