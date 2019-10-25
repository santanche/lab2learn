# Neo4j e Cypher

Entre no Sandbox do Cypher: https://neo4j.com/

Há uma opção de se usar o Neo4j online através de um sandbox em: https://neo4j.com/sandbox-v2/

Crie uma conta e abra um `Blank Sandbox`. Abaixo segue um tutorial a ser executado nesse sandbox.

## `CREATE`

Cria um nó e/ou aresta.

Um par de parênteses representa um nó. O seguinte comando cria um nó:
~~~cypher
CREATE ()
~~~

## Composição de sentenças
Em Cypher sentenças podem ser compostas de diferentes maneiras.

## `MATCH`

Seleciona aqueles nós que atendem à expressão.

## `RETURN`

Pode se compor ao `MATCH` e retorna os valores por ele selecionados.

A sentença a seguir seleciona todos os nós e os retorna, a partir da associação com a variável `n`.

~~~cypher
MATCH (n)
RETURN n
~~~

## Propriedades

É possível a representação de propriedades relacionadas a um nó utilizando-se chaves. O seguinte comando cria dois nós com a propriedade `name` cujos valores são `"Acetylsalicylic Acid"` e `"Dipyrone"`:

~~~cypher
CREATE ({name:"Acetylsalicylic Acid"})

CREATE ({name:"Dipyrone"})
~~~

Sentenças usadas para a criação de nós podem ser usadas para a sua seleção. A seguinte sentença seleciona e retorna o nó cujo `name` é `"Dipyrone"`:

~~~cypher
MATCH (n {name:"Dipyrone"})
RETURN n
~~~

## `DELETE`

Exclui um conjunto de nós e/ou arestas. O `DELETE` pode ser composto com o `MATCH` da mesma maneira que o `RETURN`. A seguinte sentença exclui todos os nós:

~~~cypher
MATCH (n)
DELETE n
~~~

## Rótulos

Nós e arestas similares podem ser classificados através de rótulos. Rótulos são caracterizados por dois pontos. Nos exemplos a seguir são criados nós rotulados como droga (`:Drug`) ou patologia (`:Pathology`):

~~~cypher
CREATE (:Drug {drugbank: "DB00945", name:"Aspirin"})

CREATE (:Drug {drugbank: "DB00945", name:"Acetylsalicylic Acid"})

CREATE (:Drug {drugbank: "DB04817", name:"Dipyrone"})

CREATE (:Pathology {name:"Headache"})
~~~

Note que também foi acrescentada uma propriedade `drugbank` com o código do medicamento neste repositório (DrugBank: https://www.drugbank.ca).

Baseado no que você aprendeu até agora, deduza o que fazem os comandos a seguir:

~~~cypher
MATCH (n)
RETURN n

MATCH (d:Drug)
RETURN d
~~~

## Exercício

Escreva uma sentença em Cypher que crie o medicamento de nome `Metamizole`, código no DrugBank `DB04817`.

### Resolução

~~~cypher
CREATE (:Drug {drugbank: "DB04817", name:"Metamizole"})
~~~

## Relacionamentos

Um relacionamento é representado por uma seta direcionada. No meio da seta aparece um par de colchetes onde é definido o rótulo do relacionamento e onde podem ser definidos atributos. No exemplo a seguir são criados dois nós com um relacionamento rotulado como `:Treats` entre eles:

~~~cypher
CREATE (:Drug {name:"Paracetamol"})-[:Treats]->(:Pathology {name:"Fever"})
~~~

## Concatenando `MATCHs`

É possível se concatenar mais de um `MATCH`. Na setença a seguir é criada uma relação entre dois nós recuperados pelo `MATCH`, o medicamento `Dipyrone` e a patologia `Fever`:

~~~cypher
MATCH (d:Drug {name:"Dipyrone"})
MATCH (p:Pathology {name:"Fever"})
CREATE (d)-[:Treats]->(p)
~~~

## Exercício

Considerando que a `Dipyrone` e `Metamizole` são o mesmo medicamento com nomes diferentes, crie uma aresta com o rótulo `:SameAs` que ligue os dois.

### Resolução

~~~cypher
MATCH (d1:Drug {name:"Dipyrone"})
MATCH (d2:Drug {name:"Metamizole"})
CREATE (d1)-[:SameAs]->(d2)
~~~

## Exercício

Use o `DELETE` para excluir o relacionamento que você criou (apenas ele).

### Resolução

~~~cypher
MATCH (:Drug {name:"Dipyrone"})-[sa:SameAs]->(:Drug {name:"Metamizole"})
DELETE sa
~~~

## `WHERE`

A Cláusula `WHERE` pode ser composta com as demais cláusulas para acrescentar-lhes condições que não podem ser atendidas diretamente no `MATCH`. Por exemplo, suponha que se deseje construir uma sentença ligar através de uma aresta rotulada como `:SameAs` todas as drogas que têm o mesmo código `drugbank`, o `WHERE` poderia ser usado para a associação de atributos de diferentes nós:

~~~cypher
MATCH (d1:Drug)
MATCH (d2:Drug)
WHERE d1.drugbank = d2.drugbank AND d1.name <> d2.name
CREATE (d1)-[:SameAs]->(d2)
~~~

Veja o resultado:
~~~cypher
MATCH (n)
RETURN n
~~~

Note que a aresta `:SameAs` aparece em ambas as direções porque a combinação dos nós em ambas as ordens atendem à condição.

## Limpando a Base

Vamos agora limpar a base para iniciarmos um novo ciclo de queries. Inicialmente, devem ser removidas todas as arestas:

~~~cypher
MATCH (n1)-[e]->(n2)
DELETE e
~~~

Em seguida todos os nós:

~~~cypher
MATCH (n)
DELETE n
~~~

Note que removemos primeiro as arestas porque um nó não se deixará remover se tiver arestas a ele ligadas.

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
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017-dron/drug.csv' AS line
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

## Hierarquia DRON

O arquivo https://github.com/santanche/lab2learn/blob/master/data/faers-2017-dron/drughierarchy.csv estabelece uma relação de hierarquia entre drogas e categorias de drogas. Cada vez que uma droga ou categoria de droga é subordinada a outra, há um registro indicando a droga (`codedrug`) e a categoria a que ela está subordinada (`parent`).

Por essa razão o arquivo de drogas visto anteriormente também tem categorias de drogas cadastradas.

### Exercício

Escreva uma query Cypher que leia esse arquivo CSV e crie conexões representando essas relações de subordinação, ou seja, cada tupla irá gerar uma aresta rotulada como `:Parent` ligando a droga ou categoria àquela que ela é subordinada. Use a referência sem formato para o arquivo https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017-dron/drughierarchy.csv

Você pode usar o `MATCH` composto com o `LOAD` e o `CREATE`.

### Resolução

~~~cypher
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017-dron/drughierarchy.csv' AS line
MATCH (d:Drug {code: line.codedrug})
MATCH (p:Drug {code: line.parent})
CREATE (d)-[:Parent]->(p)
~~~

## Exercício

Escreva um código que a categoria "CHEMICAL ENTITY" e todas as drogas subordinadas.

## Funções de Agregação

Funções como `COUNT`, `SUM`, `AVG`, `MIN` e `MAX` podem agregar o resultado retornado pelo `RETURN`. 

A query a seguir retorna o número de drogas:

~~~cypher
MATCH (d:Drug)
RETURN COUNT(d)
~~~

## Exercício

Escreva um código que conte quantas drogas estão subordinadas à "CHEMICAL ENTITY".





LOAD CSV WITH HEADERS FROM 'https://github.com/santanche/lab2learn/raw/master/data/faers-2017/pathology.csv' AS line
CREATE (:Pathology { code: line.code, name: line.name})

CREATE INDEX ON :Pathology(code)

LOAD CSV WITH HEADERS FROM 'https://github.com/santanche/lab2learn/raw/master/data/faers-2017/drug-use.csv' AS line
MATCH (d:Drug {code: line.codedrug})
MATCH (p:Pathology {code: line.codepathology})
CREATE (d)-[:Treats {person: line.idperson}]->(p)

MATCH (d)-[:Treats]->(p)
RETURN d, p
LIMIT 50

MATCH (d:Drug)-[t:Treats]->(p:Pathology)
DELETE t

LOAD CSV WITH HEADERS FROM 'https://github.com/santanche/lab2learn/raw/master/data/faers-2017/drug-use.csv' AS line
MATCH (d:Drug {code: line.codedrug})
MATCH (p:Pathology {code: line.codepathology})
MERGE (d)-[t:Treats]->(p)
ON CREATE SET t.weight=1
ON MATCH SET t.weight=t.weight+1

MATCH (d)-[t:Treats]->(p)
WHERE t.weight > 50
RETURN d,p

MATCH (d)-[t:Treats]->(p)
WHERE t.weight > 20
RETURN d,p

MATCH (d1:Drug)-[a]->(p:Pathology)<-[b]-(d2:Drug)
WHERE a.weight > 20 AND b.weight > 20
MERGE (d1)<-[r:Relates]->(d2)
ON CREATE SET r.weight=1
ON MATCH SET r.weight=r.weight+1
~~~