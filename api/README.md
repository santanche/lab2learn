# World Health Organization Data
*Laboratório Bancos de Dados 18/09/2020*

## Global Health Observatory

* [Data query API](https://apps.who.int/gho/data/node.resources.api)
* [GHO OData API ](https://www.who.int/data/gho/info/gho-odata-api)

Exemplos de API: [https://www.who.int/data/gho/info/athena-api-examples](https://www.who.int/data/gho/info/athena-api-examples).

Para se determinar o tipo de informação para acesso veja a [lista de dimensões e códigos](https://apps.who.int/gho/athena/api/GHO). Utilize o código disponível no campo `<Code label="">`. Por exemplo, no campo `<Code Label="WHOSIS_000001">` é possível encontrar o código `WHOSIS_000001` que indica `Life expectancy at birth (years)`.

Depois de estabelecida a informação, podem ser configurados parâmetros, com o sufixo `?` depois da URL. Os parâmetros são separados por `&`.

Os códigos dos países são encontrados em: [https://apps.who.int/gho/athena/api/COUNTRY](https://apps.who.int/gho/athena/api/COUNTRY).

Outro fonte promissora é dão as [Fontes de Dados do HealthData](https://healthdata.gov/search/type/dataset) que estão disponíveis nos formatos JSON, CSV, RDF e XML.

Veja código em Python em [data-api-python.ipynb](data-api-python.ipynb).