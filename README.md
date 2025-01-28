# Projeto Next.js

Este projeto foi criado para testar conhecimentos em Next.js, testes automatizados, Context API e DevOps (deploy).

## Rodando o projeto

Primeiro, instale as dependências do projeto:

```bash
npm install
```

Nota: Recomenda-se a versão 20 do Node.js.

Em seguida, execute o servidor de desenvolvimento:

```bash
npm run dev
```

Este comando iniciará o front-end na porta http://localhost:3000 e o back-end mockado (json-server) na porta http://localhost:5000.

## Regras de Negócio

1. Na página inicial, na seção "mais procurados" estão listados os eventos com mais ingressos vendidos;

2. Ao clicar em comprar em qualquer card de evento, o usuário será direcionado para a página de compra;

3. Na listagem dos eventos na página "eventos", existem filtros que montam ma consulta por queryParam;

4. É possível filtrar ao clicar no botão "filtrar" ou também limpar os filtros, clicando no botão "limpar filtros";

5. Para adicionar um item ao carrinho, deve-se primeiro escolher o tipo do ingresso (VIP, Pista ou Meia) e a quantidade. Então clique em "selecionar" e depois "adicionar ao carrinho";

6. É possível adicionar até 3 tipos de ingresso com diferentes quantidades (máximo de 5) para o mesmo evento no mesmo carrinho;

7. É possível adicionar e remover itens do carrinho, bem como acessar o carrinho de qualquer lugar do E-Ventos;

8. Só é possível finalizar uma compra se o usuário estiver autenticado. Caso não autenticado, é mostrada uma mensagem no carrinho e o usuário pode ir para a página de autenticação;

9. Na página de autenticação, é possível logar ou se registrar, e uma vez logado, tem acesso a finalizar uma compra;

10. O carrinho e a autenticação são contextos e acessáveis de qualquer lugar do E-Ventos. O cache de ambos fica armazenado no sessionStorage.
