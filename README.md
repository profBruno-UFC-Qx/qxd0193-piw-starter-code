# O que está implementado?


No backend nós temos o crud de usuário implementado. No entanto, para a versão atual, a exigência de autenticação para as rodas do CRUD estão desabilitadas, vide:
https://github.com/profBruno-UFC-Qx/qxd0193-piw-starter-code/blob/5ebc7b1b1548faca78408dbd78d61a843b5bc03a/backend/src/routes/userRoutes.ts#L10

No frontend, temos a tela inicial recuperando as informações de todos os usuários cadastrados e listando na tela.


# Possíveis dúvidas ou problema


## CORS

Para entender do que se trata esse problema eu sugiro a leitura deste [blog](https://medium.com/@highlanderfullstack/um-guia-para-cors-em-node-js-com-express-b576c71c50ea). Nesta [postagem](https://www.twilio.com/pt-br/blog/adicione-suporte-cors-sua-api-express-typescript) você encontrar uma explicação de como resolver esse problema usando TypeScript.

## OnMounted

No app.vue estamos usando o hook **OnMounted** se você quiser entender melhor o que é um hook e o funcionamento do **OnMounted** confira a [documentação oficial](https://vuejs.org/guide/essentials/lifecycle.html).
