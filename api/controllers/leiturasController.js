import { BD } from "../db.js";

class leiturasController {
    // LISTAR leituras da VIEW completa
    static async listar(req, res) {
        try {
            const resultado = await BD.query(`
                SELECT 
                    id_leitura,
                    id_sensor,
                    sensor,
                    valor,
                    unidade_medida,
                    data_hora_leitura,
                    cultivo
                FROM vw_leituras_completas
                ORDER BY data_hora_leitura DESC;
            `);

            return res.status(200).json(resultado.rows);

        } catch (error) {
            console.error("Erro ao listar leituras: ", error);
            return res.status(500).json({
                message: "Erro ao listar leituras",
                error: error.message
            });
        }
    }

    static async salvarLeituraSolo(dado) {
        try {
            const query = `
                INSERT INTO leituras_solo (valor, faixa)
                VALUES ($1, $2)
            `;
            await BD.query(query, [dado.valor, dado.faixa]);

        } catch (error) {
            console.error("Erro ao salvar leitura solo:", error);
        }
    }

}

export default leiturasController;
