//Importando o express
const express = require("express")

//Criando uma instância do express
const app = express()

//Definindo o tipo de uso para o servidor
app.use(express.json())

//Criando uma rota
app.get("/health", (req, res) => {
    return res.json("up")
})

//Definindo a porta do server
app.listen(3333, () => console.log("Server up in 3333"))