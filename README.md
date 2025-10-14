<div align="center">

<h1> My Money </h1>
  
![React](https://img.shields.io/badge/-React-1e272e?style=for-the-badge&logo=react)&nbsp;
![Node.js](https://img.shields.io/badge/-Node.js-1e272e?style=for-the-badge&logo=node.js)&nbsp;
  
</div>

## Descrição

Aplicação para gestão financeira.

## Repositórios
O projeto está separado da seguinte forma:
- /api - Repositório da API.
- /ui - Repositorio da Interface.


## Requisitos
- Docker
- Docker Compose

## Como utilizar

A aplicação está utilizando o Docker para conteinerização e utilizando o Docker Compose para fazer a orquestração dos containers.

```bash
$ docker-compose up --build -d
```

Para rodar somente a API:

```bash
$ cd api
$ npm run dev
```

Para rodar somente a UI:

```bash
$ cd ui
$ npm run dev
```