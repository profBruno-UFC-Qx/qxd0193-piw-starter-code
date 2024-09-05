# O que está implementado?


No backend nós temos o crud de usuário implementado. No entanto, para a versão atual, a exigência de autenticação para as rodas do CRUD estão desabilitadas, vide:
https://github.com/profBruno-UFC-Qx/qxd0193-piw-starter-code/blob/5ebc7b1b1548faca78408dbd78d61a843b5bc03a/backend/src/routes/userRoutes.ts#L10

No frontend, temos as seguintes rotas:
https://github.com/profBruno-UFC-Qx/qxd0193-piw-starter-code/blob/908fae6c694276b1d75fc7ccd9e2864758333913/frontend/src/router/index.ts#L7

- `\`: Tela inicial recuperando e mostrando as informações de todos os usuários cadastrados. 
- `\users\:id`: Tela responsável por mostrar as informações de um usuário
- `\login`: Tela com o formulário de login da aplicação

A aplicação é capaz de listar todos usuários,
**remover** um usuário e **editar** um usuário.


# Possíveis dúvidas ou problema

## Axios
O Axios está instalado e configurado para recuperar as informações do backend.
https://github.com/profBruno-UFC-Qx/qxd0193-piw-starter-code/blob/ab195472185e5d27e375df5380ac82c270b14110/frontend/src/api/index.ts#L3

## CORS

Para entender do que se trata esse problema eu sugiro a leitura deste [blog](https://medium.com/@highlanderfullstack/um-guia-para-cors-em-node-js-com-express-b576c71c50ea). Nesta [postagem](https://www.twilio.com/pt-br/blog/adicione-suporte-cors-sua-api-express-typescript) você encontrar uma explicação de como resolver esse problema usando TypeScript.

https://github.com/profBruno-UFC-Qx/qxd0193-piw-starter-code/blob/908fae6c694276b1d75fc7ccd9e2864758333913/backend/src/index.ts#L14

## Tratamento de erro e feedback ao usuário

Quando fazermos um requisição HTTP precisamos tratar os possíveis erros que podem acontecer. Além disso, precisamos fazer o usuário perceber que algo está acontecendo na aplicação, enquanto ela a aguarda uma possível resposta. 

Implementamos isso nessa aplicação por meio de blocos `try/catch/finally` vide:
https://github.com/profBruno-UFC-Qx/qxd0193-piw-starter-code/blob/908fae6c694276b1d75fc7ccd9e2864758333913/frontend/src/pages/PublicHome.vue#L14
