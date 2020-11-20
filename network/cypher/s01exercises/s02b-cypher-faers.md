# Comandos Avançados em Cypher

Considere o arquivo CSV armazenado no endereço:
https://github.com/santanche/lab2learn/blob/master/data/faers-2017-dron/drug.csv

Ele é um arquivo que relaciona um conjunto de drogas combinando duas fontes de dados:
* [FAERS (FDA Adverse Event Reporting System)](https://open.fda.gov/data/faers/) - a relação de drogas vem desta fonte, onde são relatados efeitos adversos do uso de drogas.
* [DRON (The Drug Ontology)](https://bioportal.bioontology.org/ontologies/DRON) - o código de cada droga vem dessa fonte, onde as drogas são organizadas por categorias.

## `LOAD`

É possível se realizar a leitura de arquivos CSV diretamente dentro de uma base Neo4j utilizando-se a sentença `LOAD` composta com o `CREATE`.

O comando a seguir carrega o CSV e o coloca em um grafo Neo4j. Note que cada linha do arquivo CSV é colocado em uma instância de uma variável indicada (chamamos de `line`). As colunas (`code` e `name`) passam a ser um atributos dessa instância e podemos atribuí-los a propriedades do nó:

~~~cypher
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017/drug.csv' AS line
CREATE (:Drug {code: line.code, name: line.name})
~~~

## `CREATE INDEX`

Muitas operações serão realizadas usando-se o código da droga como chave, portanto, é interessante a criação de um índice sobre ele:

~~~cypher
CREATE INDEX ON :Drug(code)
~~~

Vale a pena olhar o resultado, mas recomendamos que você limite o número de nós a ser apresentados usando a cláusula `LIMIT`:

~~~cypher
MATCH (d)
RETURN d
LIMIT 50
~~~

As mesmas duas sequências podem ser feita com o arquivo de patologias:

~~~cypher
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017/pathology.csv' AS line
CREATE (:Pathology { code: line.code, name: line.name})
~~~

~~~cypher
CREATE INDEX ON :Pathology(code)
~~~

## `LOAD` com `MATCH`

Quando um arquivo CSV conecta dois outros arquivos, pode ser usado o MATCH para encontrar nós que já estão no grafo e ligá-los. Por exemplo, no código a seguir é lida uma tabela que indica drogas que foram usadas para tratar doenças. Para cada ocorrência, é criada uma aresta entre a droga e a respectiva doença:

~~~cypher
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017/drug-use.csv' AS line
MATCH (d:Drug {code: line.codedrug})
MATCH (p:Pathology {code: line.codepathology})
CREATE (d)-[:Treats {person: line.idperson}]->(p)
~~~

Veja o resultado:

~~~cypher
MATCH (d)-[:Treats]->(p)
RETURN d, p
LIMIT 50
~~~

## `MERGE`

No caso acima, não computamos o número de vezes que uma relação acontece. Portanto, iremos refazer as arestas de outra maneira, usando uma sentença `MERGE`.

Primeiro apagaremos as arestas feitas anteriormente:

~~~cypher
MATCH (d:Drug)-[t:Treats]->(p:Pathology)
DELETE t
~~~


Depois criaremos uma query para refazê-las usando o `MERGE`. Ela define um atributo peso (*weight*) na relação e incrementa um para cada relação encontrada:

~~~cypher
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017/drug-use.csv' AS line
MATCH (d:Drug {code: line.codedrug})
MATCH (p:Pathology {code: line.codepathology})
MERGE (d)-[t:Treats]->(p)
ON CREATE SET t.weight=1
ON MATCH SET t.weight=t.weight+1
~~~

Vamos inspecionar as relações que têm peso maior que cinquenta:

~~~cypher
MATCH (d)-[t:Treats]->(p)
WHERE t.weight > 50
RETURN d,p
~~~

… e aquelas com peso maior que vinte:

~~~cypher
MATCH (d)-[t:Treats]->(p)
WHERE t.weight > 20
RETURN d,p
~~~

## Projeção

A sentença anterior produziu um grafo bipartido, vamos aplicar uma projeção para ligar drogas que tratam a mesma patologia. A patologia é transformada em aresta.

~~~cypher
MATCH (d1:Drug)-[a]->(p:Pathology)<-[b]-(d2:Drug)
WHERE a.weight > 20 AND b.weight > 20
MERGE (d1)<-[r:Relates]->(d2)
ON CREATE SET r.weight=1
ON MATCH SET r.weight=r.weight+1
~~~

Visualizando o resultado:
~~~cypher
MATCH (d1:Drug)<-[:Relates]->(d2:Drug)
RETURN d1, d2
LIMIT 20
~~~

## Exercício

Faça a projeção em relação a Patologia, ou seja, conecte patologias que são tratadas pela mesma droga.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

# Trabalhando com Efeitos Colaterais

Considere o seguinte arquivo que indica um conjunto de pessoas (identificadas por código) e as drogas que elas usam:

[https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017/drug-use.csv]

Considere este outro arquivo que indica as mesmas pessoas e efeitos colaterais que elas experimentaram:

[https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017/sideeffect.csv]

## Exercício

Construa um grafo ligando os medicamentos aos efeitos colaterais (com pesos associados) a partir dos registros das pessoas, ou seja, se uma pessoa usa um medicamento e ela teve um efeito colateral, o medicamento deve ser ligado ao efeito colateral.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

## Exercício

Que tipo de análise interessante pode ser feita com esse grafo?

Proponha um tipo de análise e escreva uma sentença em Cypher que realize a análise.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~