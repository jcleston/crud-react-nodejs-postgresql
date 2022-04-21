<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/jcleston/modulo1">  
  <a href="https://github.com/jcleston/modulo1/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/jcleston/modulo1">
  </a>
   <a href="https://github.com/jcleston/modulo1/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/jcleston/modulo1?style=social">
  </a>
  <a href="https://www.linkedin.com/in/janescleston/">
    <img alt="Feito por Janes Cleston" src="https://img.shields.io/badge/feito%20por-Janes%20Cleston-%237519C1">
  </a>
</p>

# crud-react-nodejs-postgresql
Crud completo com ReactJs + NodeJs + PostgreSQL 🚀

## Menu Geral
<!--ts-->
* [Back-End](#back-end)
  * [Instalação Back-End](#instalação-back-end)
    * [Express](#express)
    * [Nodemon](#nodemon)
    * [Cors](#cors)
    * [Prisma](#prisma)
    * [Docker](#docker)
  * [Executando o server](#executando-o-server)
  * [Montando a API](#montando-a-api)
  * [Configurando o Banco de Dados](#configurando-o-banco-de-dados)
* [Front-End](#front-end)
  * [Instalação Front-End](#instalação-front-end)
    * [Axios](#axios)
    * [Icons React](#icons-react)
  * [Execução do React](#execução-do-react)

  
<!--te-->
<br /><br />

## Back-End

## Instalação Back-End
Para iniciar o desenvolvimento, dentro da raiz do projeto, é necessário efetuar os seguintes comandos:
```shell
$ npm init
```
Escolher nome do projeto: crud
Yes ou next para todos


## Express
```shell
$ npm install express
```

## Nodemon
```shell
$ sudo npm install -g nodemon
```

## Cors
```shell
$ npm install cors
```

## Prisma
Para instalar o Prisma
```shell
$ npm install prisma
```

Para instalar o Prisma Client
```shell
$ npm install @prisma/client
```

Para rodar o Prisma
```shell
$ npx prisma init
```

Para atualizar migrate
```shell
$ npx prisma migrate dev nome_nova_migrate 
```

## Docker
Instalação OPCIONAL<br />
Acesse a página: https://download.docker.com/linux/ubuntu/dists/bionic/pool/stable/amd64/ <br />
Baixe o arquivo: https://download.docker.com/linux/ubuntu/dists/bionic/pool/stable/amd64/docker-ce-cli_18.09.0~3-0~ubuntu-bionic_amd64.deb
```shell
$ sudo dpkg -i /path/to/docker-ce-cli_18.09.0_3-0_ubuntu-bionic_amd64.deb 
```

Verificanco a versão instalada
```shell
$ docker -v
```

Desinstalação
```shell
$ sudo apt-get remove docker docker-engine docker.io containerd runc
$ sudo rm -rf /var/lib/docker
$ sudo rm -rf /var/lib/containerd
```
Documentação oficial no link: <a href="https://docs.docker.com/engine/install/ubuntu/">docs.docker.com</a>

<br />
## Executando o server

<p>* Criar diretório src</p>
<p>* Criar o arquivo server.js dentro do diretório src</p>
<p>* Adicionar nos scripts do arquivo package.json a seguinte linha:</p>

```shell
"dev": "nodemon src/server.js"
```
<p>Executar o serviço digitando no terminal a seguinte instrução:</p>

```shell
$ npm run dev
```
<h4 align="right">

[Voltar para o Menu Geral](#menu-geral)
</h4>

## Montando a API

Codificar o arquivo server.js
```shell
//Importando o express
const express = require("express")

//Importar rotas
const todosRoutes = require("./todos.routes")

//Criando uma instância do express
const app = express()

//Definindo o tipo de uso para o servidor
app.use(express.json())

//Definindo o uso das rotas
app.use(todosRoutes)

//Criando uma rota
app.get("/health", (req, res) => {
    return res.json("up")
})

//Definindo a porta do server
app.listen(3333, () => console.log("Server up in 3333"))
```

Codificar o arquivo todos.routes.js
```shell
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
```

<h4 align="right">

[Voltar para o Menu Geral](#menu-geral)
</h4>

## Configurando o Banco de Dados
Após a instalação do Prisma, temos que configurar o arquivo schema.prisma da seguinte forma:

```shell
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = "postgresql://usuario:senha@host:porta/banco"
}

//Montando a model/tabela
model Todo {
  id     Int     @id @default(autoincrement())
  status Boolean
  name   String
}
```

Para executar o migrate devemos rodar a instrução:
```shell
$ npx prisma migrate dev Todo
```

Para visualizar os dados do migrate utilizando o Prisma Studio devemos rodar a instrução:
```shell
$ npx prisma studio
```

<h4 align="right">

[Voltar para o Menu Geral](#menu-geral)
</h4>

## Front End

## Instalação Front-End
Para iniciar o desenvolvimento, dentro da raiz do projeto, é necessário efetuar os seguintes comandos:
```shell
$ npx create-react-app crud
```
Obs: A opção create-react-app só está disponível à partir da versão 14.0.0 no node, para resolver o problema de Permissão siga os passos a seguir:

```shell
//Removendo as dependências antigas
$ sudo apt-get remove nodejs
$ sudo apt-get remove npm
//Verificando se foi removido
$ which nodejs
$ which node
```
//Para instalar versões mais recentes, utilizaremos o nvm:
```shell
//Instalando o nvm
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

//Utilizando o nvm
$ source ~/.bashrc

//Verificando a lista de versões disponíveis
$ nvm list-remote

//Instalando a versão do node escolhida
$ nvm install v14.0.0

//Verificando a instalação
$ nvm list

//Selecionando a versão que deseja usar
$ nvm use v14.0.0
```

Para utilizar o creat-react-app devemos executar na raiz do projeto o comando:
```shell
$ source ~/.bashrc
# $ npm init
$ npx create-react-app my-app
```

Tutorial no link: <a href="https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt">www.digitalocean.com</a>

<h4 align="right">

[Voltar para o Menu Geral](#menu-geral)
</h4>

## Axios
Utilizaremos o axios para fazer as requisições para o back-end
```shell
$ npm install axios
```

## Icons React
Utilizaremos os icones do react
```shell
npm install react-icons --save 
```


<h4 align="right">

[Voltar para o Menu Geral](#menu-geral)
</h4>

## Execução do React
Dentro do diretório raiz do projeto execute:
```shell
$ npm start
```
Obs: será iniciado o navegador com a página inicial do React