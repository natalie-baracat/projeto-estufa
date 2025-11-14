import { testarConexao } from "./db.js"

import express from "express"
import cors from "cors"

import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./swagger.js"

// rotas
import userRotas from "./routes/userRotas.js"
import relatorioRotas from "./routes/relatoriosRotas.js"
import leiturasRotas from "./routes/leiturasRotas.js"
import sensoresRotas from "./routes/sensoresRotas.js"
import atuadoresRotas from "./routes/atuadoresRotas.js"
import MQTTsoloUmidadeRota from "./routes/MQTTsoloUmidadeRotas.js"
import MQTTcontrolecomandosRotas from "./routes/MQTTcontrolecomandosRotas.js"


const app = express()
testarConexao()

app.use(cors())
app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req, res) => {
    res.redirect('/api-docs')
})

/*~~~~~~~~~~~ ROTAS USUARIOS ~~~~~~~~~~~~~~~~~~~*/
app.use("/usuarios", userRotas)

/*~~~~~~~~~~~ ROTAS RELATORIOS ~~~~~~~~~~~~~~~~~*/
app.use("/relatorios", relatorioRotas)

/*~~~~~~~~~~~ ROTAS SENSORES ~~~~~~~~~~~~~~~~~~~*/
app.use("/sensores", sensoresRotas)

/*~~~~~~~~~~~ ROTAS ATUADORES ~~~~~~~~~~~~~~~~~*/
app.use("/atuadores", atuadoresRotas)

/*~~~~~~~~~~~ ROTAS LEITURAS ~~~~~~~~~~~~~~~~~*/
app.use("/leituras", leiturasRotas)

/*~~~~~~~~~~~ ROTAS MQTT ~~~~~~~~~~~~~~~~~*/
app.use("/mqtt", MQTTsoloUmidadeRota.lerDadosSensor)
app.use("/controle", MQTTcontrolecomandosRotas)


const porta = 3000
app.listen(porta, () => {
    console.log(`Api rodando em http://localhost:${porta}`)
})