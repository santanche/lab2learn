# PubChem

PubChem is the world's largest collection of freely accessible chemical information.

## Exploring

Go to PubChem: https://pubchem.ncbi.nlm.nih.gov/

Look for: `acetylsalicylic acid`

It is possible to do the same search on PubChem through an API. The details are here:

https://pubchemdocs.ncbi.nlm.nih.gov/pug-rest-tutorial

Let us build an API request using the popular name aspirin:

https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/aspirin

It will return an XML. Since Zorba did not accept to fetch the data straight from the result, the file was downloaded and is available here:

https://github.com/santanche/lab2learn/blob/master/data/pubchem/pubchem-acetylsalicylic-acid.xml

Headers were adapted for Zorba.

# Basics

The following queries will be tested on http://try.zorba.io/

Fetching the XML file:

~~~xquery
let $aspirin := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-acetylsalicylic-acid.xml')
return $aspirin
~~~


Synonyms of aspirin:
~~~xquery
let $aspirin := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-acetylsalicylic-acid.xml')
return $aspirin//PC-Substance_synonyms_E
~~~

How many synonyms?

~~~xquery
let $aspirin := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-acetylsalicylic-acid.xml')
return count($aspirin//PC-Substance_synonyms_E)
~~~

One per line:

~~~xquery
let $aspirin := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-acetylsalicylic-acid.xml')
for $a in ($aspirin//PC-Substance_synonyms_E)
return {$a/text(), '&#xa;'}
~~~




~~~xquery
let $pubchem := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-aspirin-similar-structure.xml')
return {$pubchem}
~~~

~~~xquery
~~~

~~~xquery
~~~


# DRON - The Drug Ontology

A simplified version of DRON in XML can be found here:
[DRON in XML](/data/faers-2017-dron/dron.xml)

Each element `<drug>` represents a drug or drug classification (group). When a drug is part of a classification its `<drug>` element is subordinated to the classification. It produces a hierarchy as further illustrated.

## Exploring

Go to the Ontology Search related to DRON Ontology: https://www.ebi.ac.uk/ols/ontologies/dron

Look for: `acetylsalicylic acid`

The tree view will look like this:

![acetylsalicylic acid tree view](ontology-search-acetylsalicylic-acid)

# Basics

The following queries will be tested on http://try.zorba.io/

Fetching the XML file:

~~~xquery
let $dron := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017-dron/dron.xml')
return $dron
~~~


All (parent) classifications related to `Acetylsalicylic Acid`.

~~~xquery
let $dron := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017-dron/dron.xml')
for $d in ($dron//drug[drug//@name="ACETYLSALICYLIC ACID"])
let $parent := $d/@name
group by $parent
order by $parent
return {data($parent), '&#xa;'}
~~~

~~~xquery
let $pubchem := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-chebi.xml')
for $p in ($pubchem//RegistryID)
return substring($p/text(), 7)
~~~

~~~xquery
let $pubchem := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/pubchem/pubchem-chebi.xml')
let $dron := doc('https://raw.githubusercontent.com/santanche/lab2learn/master/data/faers-2017-dron/dron.xml')
for $p in ($pubchem//RegistryID),
    $d in ($dron//drug)
where concat('http://purl.obolibrary.org/obo/CHEBI_',substring($p/text(), 7)) = $d/@id
let $gr := $d/@name
group by $gr
order by $gr
return {data($gr), '&#xa;'}
~~~
