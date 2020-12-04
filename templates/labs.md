# Template para Entrega dos Laboratórios Individuais

# Estrutura de Arquivos e Pastas

A seguir é apresentada a estrutura de pastas esperada para entrega de laboratórios:

~~~
├── README.md  <- apresentação do aluno
│
├── lab01      <- primeiro lab
│
├── lab02      <- segundo lab
│
├── lab03     <- terceiro lab
│
├── lab04     <- quarto lab
│
├── lab05     <- quinto lab
│
└── lab06    <- sexto lab
~~~

Na raiz deve haver um arquivo de nome `README.md` contendo a apresentação do aluno, como detalhado na seção seguinte.

## `labXX`

Arquivos e diretórios referentes à entrega de um laboratório específico. Cada diretório terá sua configuração detalhada abaixo.

# Modelo para Apresentação do Aluno e Laboratórios

Este vídeo mostra como usar o Github e o Markdown para criar as suas submissões:

[![Fundamentos de Markdown - Criando documentos e sites no Github](http://img.youtube.com/vi/fDyGs18_ITQ/0.jpg)](https://youtu.be/fDyGs18_ITQ)

Este é um guia de como produzir documentação em Markdown. Para entender como criar documentos em Markdown no Github, veja o material/vídeo:
[Guia de Uso do Markdown](https://github.com/mc-unicamp/oficinas/tree/master/docs).

Vide detalhes sobre o Markdown em: [Mastering Markdown](https://guides.github.com/features/mastering-markdown/).

E mais especificamente sobre tabelas em: [Organizing information with tables](https://help.github.com/en/articles/organizing-information-with-tables)

Segue abaixo o modelo de como devem ser documentadas as entregas.
> Tudo o que aparecer neste modo de citação se refere algo que deve ser substituído pelo indicado. No modelo são colocados exemplos ilustrativos, que serão substituídos pelos da sua apresentação.

Para a construção dos diagramas, devem ser usados modelos disponíveis em: [Diagramas de Classes, Interfaces e Componentes](https://docs.google.com/presentation/d/1ML3WrnDtzh-4wqLmdXN9au1TBIwEqo7TIbMLNOYSMAI/edit?usp=sharing)
# Modelo para Apresentação do Aluno

# Aluno
* `<nome completo>`

# Modelo para Apresentação do Lab01 - API Acesso

Estrutura de pastas:

~~~
├── README.md  <- arquivo apresentando a tarefa
│
├── images     <- arquivo de imagem da tarefa
│
└── notebook   <- arquivos do notebook
~~~

## Tarefa 1 sobre APIs de acesso

> Coloque um link para o arquivo do notebook com a resolução da primeira tarefa (dois acessos). Ele estará dentro da pasta `notebook`.

## Tarefa 2 sobre Engenharia Reversa
> Coloque a imagem do PNG do seu diagrama como ilustrado abaixo (a imagem estará na pasta `image`):
> 
> ![Diagrama de Orquestração](images/diagrama-livre.png)

# Modelo para Apresentação do Lab02 - Modelos Lógicos

Estrutura de pastas:

~~~
├── README.md  <- arquivo apresentando a tarefa
│
└── notebook   <- arquivos do notebook
~~~

## Tarefa sobre Acesso a DBPedia e MeSH

> Coloque um link para o arquivo do notebook com a resolução da tarefa. Ele estará dentro da pasta `notebook`.

# Modelo para Apresentação do Lab03 - Modelo Lógico de Tabelas com Orange/Kaggle

Estrutura de pastas:

~~~
├── README.md  <- arquivo apresentando a tarefa
│
├── images     <- imagem da captura de tela do lab
│
└── orange     <- arquivo do Orange
~~~

## Tarefa sobre Análise de Dados usando o Orange

> Coloque a imagem do PNG da captura de tela do seu projeto Orange conforme ilustrado abaixo (a imagem estará na pasta `image`):
> 
> ![Captura Orange](images/captura-orange.png)

> Coloque um link para o arquivo do Orange com a resolução da tarefa. Ele estará dentro da pasta `orange`.

# Modelo para Apresentação do Lab04 - NHANES/SQL

Estrutura de pastas:

~~~
├── README.md  <- arquivo apresentando a tarefa
│
└── notebook   <- arquivos do notebook
~~~

## Tarefa de sentenças SQL para dados do Nutrition Examination Survey 

> Coloque um link para o arquivo do notebook com a resolução da tarefa. Ele estará dentro da pasta `notebook`.

# Modelo para Apresentação do Lab05 - SQL e Regras de Associação

Estrutura de pastas:

~~~
├── README.md  <- arquivo apresentando a tarefa
│
└── notebook   <- arquivos do notebook
~~~

## Tarefa de sentenças SQL / Regras de Associação para o FDA Adverse Event Reporting System (FAERS)

> Coloque um link para o arquivo do notebook com a resolução da tarefa. Ele estará dentro da pasta `notebook`.


# Modelo para Apresentação do Lab06 - Cypher e FAERS

Estrutura de pastas:

~~~
├── README.md  <- arquivo apresentando a tarefa
~~~

## Tarefa de Cypher e o FDA Adverse Event Reporting System (FAERS)

## Exercício 1

Escreva uma sentença em Cypher que crie o medicamento de nome `Metamizole`, código no DrugBank `DB04817`.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

## Exercício 2

Considerando que a `Dipyrone` e `Metamizole` são o mesmo medicamento com nomes diferentes, crie uma aresta com o rótulo `:SameAs` que ligue os dois.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

## Exercício 3

Use o `DELETE` para excluir o relacionamento que você criou (apenas ele).

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

## Exercício 4

Faça a projeção em relação a Patologia, ou seja, conecte patologias que são tratadas pela mesma droga.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

## Exercício 5

Construa um grafo ligando os medicamentos aos efeitos colaterais (com pesos associados) a partir dos registros das pessoas, ou seja, se uma pessoa usa um medicamento e ela teve um efeito colateral, o medicamento deve ser ligado ao efeito colateral.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

## Exercício 6

Que tipo de análise interessante pode ser feita com esse grafo?

Proponha um tipo de análise e escreva uma sentença em Cypher que realize a análise.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

# Modelo para Apresentação do Lab07 - Análise de Redes

Estrutura de pastas:

~~~
├── README.md  <- arquivo apresentando a tarefa
│
└── notebook   <- arquivos do notebook
~~~

## Tarefa de análises feitas no Cypher

## Exercício 1

Calcule o Pagerank do exemplo da Wikipedia em Cypher:

~~~cypher
(escreva aqui a resolução em Cypher)
~~~

> Coloque aqui a imagem resultante conforme o exemplo (não obrigatório, mas sugerido - imagem produzida pelo CytoScape ou Gephi).

![PageRank](images/pagerank-cytoscape.png)

~~~cypher
(escreva aqui a resolução em Cypher)
~~~

## Exercício 2

Departing from a Drug-Drug graph created in a previous lab, whose relationship determines drugs taken together, apply a community detection in it to see the results:

~~~cypher
(escreva aqui a resolução em Cypher)
~~~

> Coloque aqui a imagem resultante conforme o exemplo (não obrigatório, mas sugerido - imagem produzida pelo CytoScape ou Gephi).

![Comunidade](images/comunidade-cytoscape.png)

# Modelo para Apresentação do Lab08 - PubChem e DRON com XQuery/XPath

Estrutura de pastas:

~~~
├── README.md  <- arquivo apresentando a tarefa
~~~

## Tarefas com Publicações

## Questão 1
Construa uma comando SELECT que retorne dados equivalentes a este XPath
~~~xquery
//individuo[idade>20]/@nome
~~~

### Resolução
~~~xquery
(escreva aqui a resolução em XPath)
~~~

## Questão 2
Qual a outra maneira de escrever esta query sem o where?

~~~xquery
let $fichariodoc := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/xml/fichario.xml')
 
for $i in ($fichariodoc//individuo)
where $i[idade>17]
return {data($i/@nome)}
~~~
### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

## Questão 3
Escreva uma consulta SQL equivalente ao XQuery:
~~~xquery
let $fichariodoc := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/xml/fichario.xml')

for $i in ($fichariodoc//individuo)
where $i[idade>17]
return {data($i/@nome)}
~~~

### Resolução
~~~sql
(escreva aqui a resolução em SQL)
~~~

## Questão 4
Retorne quantas publicações são posteriores ao ano de 2011.

### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

## Questão 5
Retorne a categoria cujo `<label>` em inglês seja 'e-Science Domain'.

### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

## Questão 6
Retorne as publicações associadas à categoria cujo `<label>` em inglês seja 'e-Science Domain'. A associação entre o label e a key da categoria deve ser feita na consulta.

### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

## Tarefas com DRON e PubChem

## Questão 1

Liste o nome de todas as classificações que estão apenas dois níveis imediatamente abaixo da raiz.

### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

## Questão 2

Apresente todas as classificações de um componente a sua escolha (diferente de `Acetylsalicylic Acid`) que estejam hierarquicamente dois níveis acima. Note que no exemplo dado em sala foi considerado um nível hierárquico acima.

### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

## Questão 3

### Questão 3.1

Liste todos os códigos ChEBI dos componentes disponíveis.

#### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

### Questão 3.2

Liste todos os códigos ChEBI e primeiro nome (sinônimo) de cada um dos componentes disponíveis.

#### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

### Questão 3.3

Para cada código ChEBI, liste os sinônimos e o nome que aparece para o mesmo componente no DRON (se existir). Para isso faça um JOIN com o DRON.

#### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~