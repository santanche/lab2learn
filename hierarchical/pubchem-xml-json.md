# PubChem

PubChem is the world's largest collection of freely accessible chemical information.

## Exploring

Go to PubChem: https://pubchem.ncbi.nlm.nih.gov/

Look for: `acetylsalicylic acid`

It is possible to do the same search on PubChem through an API. The details are here:

* Tutorial: https://pubchemdocs.ncbi.nlm.nih.gov/pug-rest-tutorial
* Docs: https://pubchemdocs.ncbi.nlm.nih.gov

Let us build an API request using the popular name aspirin:

* `XML`
  https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/aspirin/XML
* `JSON`
  https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/aspirin/JSON

Retrieving from its PubChem code (2244):

https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2244/XML

Retrieving other compounds:

* `Glucose`
  https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/glucose/JSON
* `Cellulose`
  https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/cellulose/JSON
* `Cellulase`
  https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/cellulase/JSON

Retrieving synonyms of Acetylsalicylic Acid:
https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2244/synonyms/XML

Retieving a substance related to Acetylsalicylic Acid whose code is 49854366. It is described here:

https://pubchem.ncbi.nlm.nih.gov/substance/49854366

It is possible to retrieve data from this substance with the REST request:

https://pubchem.ncbi.nlm.nih.gov/rest/pug/substance/sid/49854366/XML

Building customized queries putting together:
* `Aspirin` - CID: `2244`
* `Glucose` - CID: `5793`
* `Cellulose` - CID: `16211032`
* `Cellulase` - CID: `440950`

Showing the fields:
* `Title`
* `MolecularWeight`
* `MolecularFormula`
* `CanonicalSmiles`
* `HBondDonorCount`
* `HBondAcceptorCount`
* `InChIKey`
* `InChI`

https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/2244,5793,16211032,440950/property/Title,MolecularWeight,MolecularFormula,CanonicalSmiles,HBondDonorCount,HBondAcceptorCount,InChIKey,InChI/JSON

The possible fields are described at:

https://pubchemdocs.ncbi.nlm.nih.gov/pug-rest$_Toc494865567
