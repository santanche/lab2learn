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

É possível a representação de propriedades relacionadas a um nó utilizando-se chaves. O seguinte comando cria dois nós com a propriedade `name` cujos valores são `"Chocolate"` e `"Cenoura"`:

~~~cypher
CREATE ({name:"Chocolate"})

CREATE ({name:"Cenoura"})
~~~

Sentenças usadas para a criação de nós podem ser usadas para a sua seleção. A seguinte sentença seleciona e retorna o nó cujo `name` é `"Cenoura"`:

~~~cypher
MATCH (n {name:"Cenoura"})
RETURN n
~~~

## `DELETE`

Exclui um conjunto de nós e/ou arestas. O `DELETE` pode ser composto com o `MATCH` da mesma maneira que o `RETURN`. A seguinte sentença exclui todos os nós:

~~~cypher
MATCH (n)
DELETE n
~~~

## Rótulos

Nós e arestas similares podem ser classificados através de rótulos. Rótulos são caracterizados por dois pontos. Nos exemplos a seguir são criados nós rotulados como produto (`:Produto`) ou receita (`:Receita`):

~~~cypher
CREATE (:Produto {codigo_produto: "CHOCO", nome_produto: "Chocolate", custo_unitario: 3.0})
CREATE (:Produto {codigo_produto: "CENO", nome_produto: "Cenoura", custo_unitario: 1.5})
CREATE (:Produto {codigo_produto: "ACU", nome_produto: "Acucar", custo_unitario: 0.5})
CREATE (:Produto {codigo_produto: "SUCRA", nome_produto: "Sucralose", custo_unitario: 5.0})
CREATE (:Produto {codigo_produto: "FAR", nome_produto: "Farinha", custo_unitario: 1.0})
CREATE (:Produto {codigo_produto: "MAIZ", nome_produto: "Amido de Milho", custo_unitario: 1.5})
CREATE (:Produto {codigo_produto: "AMI", nome_produto: "Amido de Milho", custo_unitario: 1.5})

CREATE (:Receita {codigo_receita: "BOLOCE", nome_receita: "Bolo Cenoura", tipo_receita: "vegana", custo_total: 6.0})
CREATE (:Receita {codigo_receita: "BOLOCH", nome_receita: "Bolo Chocolate", tipo_receita: "regular", custo_total: 6.7})
CREATE (:Receita {codigo_receita: "BOLOCEL", nome_receita: "Bolo Cenoura Light", tipo_receita: "light", custo_total: 10.0})
~~~

Baseado no que você aprendeu até agora, deduza o que fazem os comandos a seguir:

~~~cypher
MATCH (n)
RETURN n

MATCH (r:Receita)
RETURN r
~~~

## Exercício

Escreva uma sentença em Cypher que crie um novo produto cujo código seja "`CACA`", nome "`Cacau`" e custo unitário `3.0`.

### Resolução
~~~cypher
(escreva aqui a resolução em Cypher)
~~~

## Relacionamentos

Um relacionamento é representado por uma seta direcionada. No meio da seta aparece um par de colchetes onde é definido o rótulo do relacionamento e onde podem ser definidos atributos. No exemplo a seguir são criados dois nós com um relacionamento rotulado como `:Ingrediente` entre eles:

~~~cypher
CREATE (:Produto {nome_produto:"Batata"})-[:Ingrediente]->(:Receita {nome_receita:"Pure de Batata"})
~~~

## Concatenando `MATCHs`

É possível se concatenar mais de um `MATCH`. Na setença a seguir é criada uma relação entre dois nós recuperados pelo `MATCH`, o medicamento `Dipyrone` e a patologia `Fever`:

~~~cypher
MATCH (p:Produto {codigo_produto:"CENO"})
MATCH (r:Receita {codigo_receita:"BOLOCE"})
CREATE (p)-[:Ingrediente]->(r)
~~~

## Exercício

Considerando que `Chocolate` e `Cacau` são o mesmo ingrediente com nomes diferentes, crie uma aresta com o rótulo `:Equivalente` que ligue os dois.

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

A Cláusula `WHERE` pode ser composta com as demais cláusulas para acrescentar-lhes condições que não podem ser atendidas diretamente no `MATCH`. Por exemplo, suponha que se deseje construir uma sentença ligar através de uma aresta rotulada como `:Equivalente` todas os produtos que têm o mesmo nome, o `WHERE` poderia ser usado para a associação de atributos de diferentes nós:

~~~cypher
MATCH (p1:Produto)
MATCH (p2:Produto)
WHERE p1.nome_produto=p2.nome_produto AND p1.codigo_produto <> p2.codigo_produto
CREATE (p1)-[:Equivalente]->(p2)
~~~

Veja o resultado:
~~~cypher
MATCH (n)
RETURN n
~~~

Note que a aresta `:Equivalente` aparece em ambas as direções porque a combinação dos nós em ambas as ordens atendem à condição.

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