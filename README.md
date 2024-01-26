# Desafio NodeJs (Gen)


## Tecnologias, Ferramentas e Conceitos Utilizados no Projeto
- [Node](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com)
- [NestJS](https://nestjs.com/)
- [JestJS](https://jestjs.io/)
- [JWT Authentication](https://jwt.io/introduction)
- [Typeorm](https://typeorm.io/)
- [PostgresSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Arquitetura Limpa](https://www.amazon.com.br/Arquitetura-Limpa-Artes%C3%A3o-Estrutura-Software/dp/8550804606)
- [Código Limpo](https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675)

> [!NOTE]
> Vale ressaltar que mais ferramentas foram utilizadas para diversos fins; as mesmas podem ser encontradas nas dependências do projeto (package.json). Outro ponto importante é que o **ExpressJS** foi utilizado como conector HTTP, a ferramente utilizada para construção do servidor foi **NestJS**.

## Documentação Técnica (POSTMAN)
- [Postman Documentação](https://documenter.getpostman.com/view/32200420/2s9YypGPce)

## Diagrama Entidade Relacionamento
<img width="504" alt="Screenshot 2024-01-26 at 22 15 11" src="https://github.com/lliass/gen-challenge/assets/50928658/c62bb54f-fb14-4f31-9167-b1476b2cfd99">

## Autenticação JWT
Os **end-points** públicos são responsáveis pela criação dos usuarios da aplicação, ou seja, pela criação do **token JWT** para acesso aos **end-points** **privados**.

Os **end-points** públicos são:

- Criação de usuário
```
curl --location 'http://localhost:3000/api/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "userdev",
    "password": "devpassword"
}'
```
- E o login na aplicação/criação do token JWT
```
curl --location 'http://localhost:3000/api/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "userdev",
    "password": "devpassword"
}'
```
> [!IMPORTANT]
> Como foi citado acima, apenas esses dois end-points são públicos, os demais end-points devem ser requisitados enviando um Bearer Token no header (Authorization) da requisicão.

## Testes com Jest
Temos dois pontos a serem analisados: **testes unitários** e **cobertura**. Para visualizá-los, basta executar os comandos abaixo.

- Testes Unitários
```
npm run test
```

- Cobertura de Testes
```
npm run test:cov
```

## Ambiente de Desenvolvimento (Para os Devs :smile:)
Para conseguir rodar o ambiente de desenvolvimento em uma máquina pessoal o processo é bem simples, apenas um comando deve ser executado, porém é necessário possuir as seguintes ferramentas/frameworks instaladas(os): [node](https://nodejs.org/en), [nestJS](https://nestjs.com/), [docker](https://www.docker.com/), [docker-compose](https://docs.docker.com/compose/).
> [!NOTE]
> Ao executar os comandos abaixo o Dump da base de dados será executado juntamente, ou seja, todas as tabelas e dados de testes já serão criados no conatainer do Postgres.

Comando para execução em um ambinte de desenvolvimento, caso esteja em um ambinete Unix(OS)/Linux:
```
make up
```
A segunda opção seria para usuários que estão em uma máquina Windows ou não tenham o "make" configurado globalmente na máquina:
```
docker-compose up -d
```

Comando para parar a execução:
```
make down
```
ou
```
docker-compose down --volumes --rmi all
```

- **URL base de desenvolvimento:**
> http://localhost:3000/api ou http://application:3000/api (url gerada pelo docker network)

> [!IMPORTANT]
> Apenas lembrando que para usar esses comandos a pessoa desenvolvedora deve estar na pasta raiz do projeto :wink:
