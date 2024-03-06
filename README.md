# Álbum de Fotografias

Este projeto foi gerado com o [Angular CLI](https://github.com/angular/angular-cli) na versão 10.2.4.

## Instalação

1 - Instalar o node 12.22.0.
2 - Recomendo usar o nvm para gerenciar as versões do node instaladas, para instalar o node com o nvm basta utilizar o comando `nvm install 12.22.0`.
3 - Instalar o angular cli utilizando o comando `npm i @angular/cli@10.2.4`.
5 - Fazer o clone do projeto através do comando `git clone https://github.com/matheusabreudev/album-fotos.git`.
6 - Abrir com sua IDE de preferência.
7 - Abrir o terminal na pasta raiz e executar o comando `npm i`.
8 - Utilizar o comando `ng serve` ou `ng s` para rodar o projeto em ambiente local.
8 - Após isso basta ir a url `https://localhost:4200/login`

## Instruções

1 - Na tela de login tem a função de cadastro, basta acessar via click e realizar o cadastro.
2 - Após realizar o cadastro basta acessar com o login e a senha cadastrada e navegar pelo album de fotografias.

## Executando testes unitários

Execute `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Regras aplicadas

1 - As páginas só podem ser acessadas se estiver logado, caso não esteja não é possível acessar via url.
2 - A página de albuns mostra todos os albuns com a thumbnail da primeira foto.
3 - Pode clicar em um album que o mesmo irá abrir e mostrar as 10 primeiras fotos do album.
4 - Tem um botão de voltar disponível caso queira escolher outro album.
5 - Tem um botão de logoff para deslogar do site e voltar a tela de login.
6 - Todos os campos do cadastro são necessários de serem preenchidos.
7 - Existe validação de usuário e email já cadastrados.
