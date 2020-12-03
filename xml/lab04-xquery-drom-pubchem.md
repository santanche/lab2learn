# PubChem

PubChem is the world's largest collection of freely accessible chemical information.

## Exploring

Go to PubChem: https://pubchem.ncbi.nlm.nih.gov/

Look for: `acetylsalicylic acid`

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