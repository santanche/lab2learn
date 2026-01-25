# Modelagem Conceitual de Refeições em um Restaurante
*Laboratório 2 de Bancos de Dados em 11/08/2023*

## Cenário

Um restaurante universitário disponibiliza um cardápio na forma de um conjunto de porções que o aluno pode escolher e colocar em uma bandeja. Por exemplo, no almoço do dia 23/05/2023 o restaurante disponibilizou as seguintes porções:
* arroz e feijão
* carne picada
* berinjela à milanesa
* salada com alface e tomate
* gelatina
* laranja

As porções estão dispostas em potes com quantidades fixas e os alunos as escolhem e colocam na bandeja. O aluno não pode colocar na bandeja dois potes do mesmo tipo de porção. Em alguns casos, o aluno tem que escolher entre duas porções, por exemplo: ou carne picada ou berinjela à milanesa.

## Perguntas

Elabore um modelo conceitual (ER e UML) capaz de responder as seguintes perguntas:

* Qual o cardápio de uma refeição (café, almoço ou jantar) em um dado dia?
* Quais os ingredientes disponíveis em uma porção do cardápio?
  * Considere que um ingrediente pode ser formado de outros ingredientes, por exemplo, para o prato de carne picada, foi usado: carne (lagarto), sal, óleo de soja e molho para carne. O molho da carne, por sua vez, é composto de: molho de tomate, manjericão e alho. O molho de tomado, por sua vez, é composto de: tomates, sal e açúcar.
* Quais os alimentos que os alunos mais consomem?
* Quais os alimentos que são mais rejeitados? (estão disponíveis mas os alunos não colocam na bandeja)
* Qual o perfil nutricional de um cardápio?
* Qual o perfil nutricional médio do consumo dos alunos em um mês?
* Qual o perfil nutricional de um dado aluno durante um ano?
* O cardápio de uma refeição do dia X está balanceado nutricionalmente?
* Como classificar os cardápios e/ou ingredientes?