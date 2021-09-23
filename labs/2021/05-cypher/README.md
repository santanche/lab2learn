# Marcadores e Taxonomia em Cypher
*Lab de Bancos de Dados em 17/09/2021*

Considere o modelo para `Marcadores` e `Taxonomia`:

![UML](marcadores-taxonomia-uml.png)

![Relacional](marcadores-taxonomia-er.png)

Considere os arquivos CSV disponíveis em https://github.com/santanche/lab2learn/tree/master/data/bookmarks sobre `Marcadores` e `Taxonomia`.

Entre na sandbox do Cypher (https://neo4j.com/sandbox-v2/?ref=hcard#) e execute os comandos (um bloco por vez).

~~~cypher
LOAD CSV WITH HEADERS FROM 'https://github.com/santanche/lab2learn/raw/master/data/bookmarks/taxonomia.csv' AS line
CREATE (:Categoria {id: line.categoria})

LOAD CSV WITH HEADERS FROM 'https://github.com/santanche/lab2learn/raw/master/data/bookmarks/taxonomia.csv' AS line
MATCH (cat:Categoria {id:line.categoria})
MATCH (sup:Categoria {id:line.superior})
CREATE (cat)-[:Superior]->(sup)

LOAD CSV WITH HEADERS FROM 'https://github.com/santanche/lab2learn/raw/master/data/bookmarks/marcadores.csv' AS line
MATCH (cat:Categoria {id:line.categoria})
CREATE (:Marcador {titulo:line.titulo,endereco:line.endereco,acessos:line.acessos})-[:Pertence]->(cat)

MATCH (m:Marcador)
MATCH (c:Categoria)
RETURN m, c
~~~

## Tarefa 1

Escreva em Cypher uma consulta que retorne os marcadores da categoria `Serviços`, sem considerar as categorias subordinadas.

## Tarefa 2

Escreva em Cypher uma consulta que retorne os marcadores da categoria `Serviços`, considerando as categorias subordinadas.

Veja template para submissão desta tarefa na pasta `/templates/2021/lab05`.
