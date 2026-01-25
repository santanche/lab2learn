# Exercícios com DRON e PubChem

## DRON - The Drug Ontology

Uma versão simplificada do DRON pode ser encontrada em:
[DRON in XML](/data/faers-2017-dron/dron.xml)

Cada elemento `<drug>` representa uma droga ou classificação de droga (grupo). Quando uma droga é parte de uma classificação, seu elemento `<drug>` é subordinado ao da classificação.

Endereço do DRON para acesso via XQuery:

https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017-dron/dron.xml

## PubChem

PubChem é a maior coleção de informações químicas do mundo livremente acessível. 

https://pubchem.ncbi.nlm.nih.gov/

Responda as questões abaixo a partir do DRON e PubChem:

# Questão 1

Liste o nome de todas as classificações que estão apenas dois níveis imediatamente abaixo da raiz.

## Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

# Questão 2

Apresente todas as classificações de um componente a sua escolha (diferente de `Acetylsalicylic Acid`) que estejam hierarquicamente dois níveis acima. Note que no exemplo dado em sala foi considerado um nível hierárquico acima.

## Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

# Questão 3

Dado o dataset integrado criado via acesso a serviços no Jupyter. Este notebook tem os nomes (e sinônimos) de componentes recuperados do PubChem, em conjunto com o ChEBI do mesmo.

O dataset está disponível em:

https://github.com/santanche/lab2learn/blob/master/data/pubchem/pubchem-chebi-synonyms.xml

Deve ser recuperado em XQuery no endereço:

https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-chebi-synonyms.xml

## Questão 3.1

Liste todos os códigos ChEBI dos componentes disponíveis.

### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

## Questão 3.2

Liste todos os códigos ChEBI e primeiro nome (sinônimo) de cada um dos componentes disponíveis.

### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~

## Questão 3.3

Para cada código ChEBI, liste os sinônimos e o nome que aparece para o mesmo componente no DRON (se existir). Para isso faça um JOIN com o DRON.

### Resolução
~~~xquery
(escreva aqui a resolução em XQuery)
~~~