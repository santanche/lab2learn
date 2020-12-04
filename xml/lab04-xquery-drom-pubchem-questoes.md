# DRON - The Drug Ontology

A simplified version of DRON in XML can be found here:
[DRON in XML](/data/faers-2017-dron/dron.xml)

Each element `<drug>` represents a drug or drug classification (group). When a drug is part of a classification its `<drug>` element is subordinated to the classification. It produces a hierarchy as further illustrated.

Endereço do DRON para acesso via XQuery:

https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017-dron/dron.xml

# Questão 1

Liste todas as classificações que estão dois níveis abaixo da raiz

# Questão 2

Apresente todas as classificações de um componente a sua escolha (diferente de `Acetylsalicylic Acid`) que estejam hierarquicamente dois níveis acima. Note que no exemplo dado em sala foi considerado um nível hierárquico acima.

# Questão 3

Dado o dataset integrado criado via acesso a serviços no Jupyter. Este notebook tem os nomes (e sinônimos) de componentes recuperados do PubChem, em conjunto com o ChEBI do mesmo.

O dataset está disponível em:

https://github.com/santanche/lab2learn/blob/master/data/pubchem/pubchem-chebi-synonyms.xml

Deve ser recuperado em XQuery no endereço:

https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-chebi-synonyms.xml

## Questão 3.1

Liste todos os códigos ChEBI dos componentes disponíveis.

## Questão 3.2

Liste todos os códigos ChEBI e primeiro nome (sinônimo) de cada um dos componentes disponíveis.

## Questão 3.3

Para cada código ChEBI, liste os sinônimos e o nome que aparece para o mesmo componente no DRON (se existir). Para isso faça um JOIN com o DRON.