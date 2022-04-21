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
    const todos = await prisma.todo.findMany({
        orderBy: [
            {
                id: 'asc'
            }
        ]
    })
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
Para instalar versões mais recentes, utilizaremos o nvm:
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

## Montando o Front-End
Codificar o arquivo App.js
```shell
import logo from './logo.svg';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
// import { get } from '../../back-end/src/todos.routes';

function App() {

  //Criando um componente
  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button
                onClick={() => modifiStatusTodo(todo)}
                className='checkbox'
                style={{ backgroundColor: todo.status ? '#1C91CD' : 'white' }}></button>
              <p>{todo.id} - {todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={'#1C91CD'}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={'#1C91CD'}></AiOutlineDelete>
              </button>
            </div>
          )
        })}
      </div>
    )
  }


  async function handleWithNewButton() {
    setInputVisility(!inputVisbility)
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo)
    setInputVisility(true)
  }

  async function getTodos() {
    const res = await axios.get('http://localhost:3333/todos')
    setTodos(res.data)
  }

  async function editTodo() {
    const res = await axios.put('http://localhost:3333/todos', {
      id: selectedTodo.id,
      name: inputValue
    })
    setSelectedTodo()
    setInputVisility(false)
    getTodos()
    setInputValue('')
  }

  async function createTodo() {
    const res = await axios.post('http://localhost:3333/todos', { name: inputValue })
    getTodos()
    setInputVisility(!inputVisbility)
    setInputValue('')
  }

  async function deleteTodo(todo) {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`)
    getTodos()
  }

  async function modifiStatusTodo(todo) {
    const res = await axios.put('http://localhost:3333/todos', {
      id: todo.id,
      status: !todo.status
    })
    getTodos()
  }

  //Criando os estados
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [inputVisbility, setInputVisility] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState()

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="App">
      <header className="container">

        <div className='header'>
          <h1>Crud</h1>
        </div>

        {/* Invocando o compnente */}
        <Todos todos={todos}></Todos>

        <input
          value={inputValue}
          style={{ display: inputVisbility ? 'block' : 'none' }}
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
          className='inputName'
        ></input>
        <button onClick={inputVisbility ? selectedTodo ? editTodo : createTodo : handleWithNewButton} className='newTaskButton'>
          {inputVisbility ? 'Cadastrar' : '+ Novo registro'}
        </button>
      </header>
    </div>
  );
}

export default App;

```

<h4 align="right">

[Voltar para o Menu Geral](#menu-geral)
</h4>

Codificar o arquivo App.css
```shell
button {
  border: none;
}

.App {
  text-align: center;
}

.container {
  background-color: #C4CAD0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.todos {
  background-color: white;
  width: 508px;
  height: 383px;
  overflow-y: scroll;
}

.todo {
  margin-top: 1rem;
  margin-bottom: -1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.todo p {
  min-width: 200px;
  max-width: 200px;
  text-align: start;

  font-size: 1rem;
  font-weight: bold;
  color: #64697b;
}
.checkbox {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;

  border: 2px solid #64697b;
  box-shadow: none;
  margin: 10px;
}
.header {
  background-color: #1C91CD;
  width: 508px;
  height: 60px;
  box-shadow: 0px 0px 21px -7px rgba(0, 0, 0, 0.3);
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 0.8rem;
}
.newTaskButton {
  border: none;
  background-color: #1C91CD;
  width: 160px;
  height: 50px;
  border-radius: 24px;
  margin-top: 20px;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
}
.inputName {
  margin-top: 10px;
  text-align: center;
  border: none;
  height: 50px;
  width: 200px;
  box-shadow: 0px 0px 21px -7px rgba(0, 0, 0, 0.3);
}
input:focus {
  outline: none;
}

```

<h4 align="right">

[Voltar para o Menu Geral](#menu-geral)
</h4>


## Autor
<img src="https://avatars.githubusercontent.com/u/13952621?v=4" width="100px;" alt=""/>
<br />
<sub><b><a href="https://www.linkedin.com/in/janescleston/" title="LinkedIn">Janes Cleston</a></b></sub> 🚀

Feito com ❤️ por Janes Cleston 👋🏽
<br /><br />

## Minhas Skills
<a href="https://pt.wikipedia.org/wiki/Linux"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" width="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://pt.wikipedia.org/wiki/HTML5"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" width="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://pt.wikipedia.org/wiki/CSS3"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" width="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" width="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://www.php.net/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" width="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://www.mysql.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain-wordmark.svg" width="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://www.postgresql.org/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" width="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://github.com/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg" width="50"/></a>
<br /><br />

## Estou aprendendo
<a href="https://pt-br.reactjs.org/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" width="50"/></a>&nbsp;&nbsp;&nbsp;
<a href="https://nodejs.org/en/"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" width="50"/></a>
<br /><br />

## Contatos
<div>
<a href="https://www.linkedin.com/in/janescleston/" target="blank"><img src="https://img.shields.io/badge/-Janes Cleston-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
<a href="https://www.instagram.com/jcleston/" target="blank"><img src="https://img.shields.io/badge/-Jcleston-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white"></a>
<a href = "mailto:janes.cleston.silva@gmail.com"><img src="https://img.shields.io/badge/janes.cleston.silva@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
<a href="https://jcleston.github.io/github-page/" target="_blank"><img alt="Website" src="https://img.shields.io/website?style=for-the-badge&url=https%3A%2F%2Fjcleston.github.io%2Fgithub-page%2F"></a>
</div>
<br /><br />