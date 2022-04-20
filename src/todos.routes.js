//Importando o express
const express = require("express")

//Criando um array com valores de teste
const allTodos = [{ nome: "aaaa", status: false }]

//Criando uma instância do express Router
const todosRoutes = express.Router()

//Importar o Prisma Client
const { PrismaClient } = require("@prisma/client")

//Criando uma instância do Prisma Client
const prisma = new PrismaClient()

// Create
todosRoutes.post("/todos", async (req, res) => {
    const { name } = req.body
    const todo = await prisma.todo.create({
        data: {
            name,
        }
    })

    // allTodos.push({ name, status: false })
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