//Importando o express
const express = require("express")

//Criando uma instância do express Router
const todosRoutes = express.Router()

//Importar o Prisma Client
const { PrismaClient } = require("@prisma/client")
const req = require("express/lib/request")

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
    return res.status(201).json(todo)
})

// Read
todosRoutes.get("/todos", async (req, res) => {
    const todos = await prisma.todo.findMany()
    return res.status(200).json(todos)
})

// Update
todosRoutes.put("/todos", async (req, res) => {
    const { name, id, status } = req.body

    if (!id) {
        return res.status(400).json("Id obrigatório")
    }

    const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } })

    if (!todoAlreadyExist) {
        return res.status(404).json("Id não encontrado")
    }

    const todo = await prisma.todo.update({
        where: { id, },
        data: { name, status, },
    })
    return res.status(200).json(todo)
})

// Delete
todosRoutes.delete("/todos/:id", async (req, res) => {
    const { id } = req.params

    const intId = parseInt(id)

    if (!intId) {
        return res.status(400).json("Id obrigatório")
    }

    const todoAlreadyExist = await prisma.todo.findUnique({
        where: { id: intId },
    })

    if (!todoAlreadyExist) {
        return res.status(404).json("Id não encontrado")
    }

    await prisma.todo.delete({ where: { id: intId } })

    return res.status(200).send()
})

//Expotar rotas
module.exports = todosRoutes