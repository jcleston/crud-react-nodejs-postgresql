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
  * [Instalação](#instalação)
    * [Express](#express)
    * [Nodemon](#nodemon)
    * [Cors](#cors)
  * [Executando o server](#executando-o-server)
  * [Montando a API](#montando-a-api)
<!--te-->
<br /><br />

## Instalação
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
```







