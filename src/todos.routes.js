//Importando o express
const express = require("express")

//Criando um array com valores de teste
const allTodos = [{ nome: "aaaa", status: false }]

//Criando uma instância do express Router
const todosRoutes = express.Router()

// Create
todosRoutes.post("/todos", (req, res) => {
    const { name } = req.body
    allTodos.push({ name, status: false })
    return res.status(201).json(allTodos)
})

// Read
todosRoutes.get("/todos", (req, res) => {
    return res.status(200).json(allTodos)
})

// U
// D

//Expotar rotas
module.exports = todosRoutes