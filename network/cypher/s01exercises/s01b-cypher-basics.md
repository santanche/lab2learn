# Neo4j e Cypher - Conceitos Básicos

Entre no Sandbox do Cypher: https://neo4j.com/

Há uma opção de se usar o Neo4j online através de um sandbox em: https://neo4j.com/sandbox/

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
(escreva aqui a resolução em Cypher)
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
(escreva aqui a resolução em Cypher)
~~~

## Exercício

Use o `DELETE` para excluir o relacionamento que você criou (apenas ele).

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
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