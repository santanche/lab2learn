# U.S. EPA Food Commodity Intake Database (FCID)
## [https://fcid.foodrisk.org/](https://fcid.foodrisk.org/)

* [Codebook](https://fcid.foodrisk.org/docs/WWEIA-FCID_0510_Background-Codebooks-ControlStats.pdf): 2005-2010 What We Eat In America – Food Commodity Intake Database (WWEIA-FCID 0510)
* [Databases](https://fcid.foodrisk.org/dbc/)

## Directory Structure

~~~
├── README.md   <- this document
│
├── basics      <- basic description tables
│
├── recipes     <- recipes related tables
│
├── consumption <- food consumption statistics tables
│
├── profile     <- tables summarizing data of other tables
│
└── grouped     <- data categorized and grouped for clustering analysis
~~~

## Summary

| Table | File | Description |
| ----- | ---- | ----------- |
| Crop Groups | [FCID_Cropgroup_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/FCID_Cropgroup_Description.csv) | Text descriptions of U.S. EPA FCID crop groups |
| Ingredients (Food Commodities) | [FCID_Code_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/FCID_Code_Description.csv) | Text descriptions of U.S. EPA FCID commodity codes |
| Recipes of Foods | [Food_Code_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Food_Code_Description.csv) | Text descriptions of WWEIA food codes |
| Cooked Status | [Cooked_Status_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Cooked_Status_Description.csv) | Text descriptions of U.S. EPA cooking status codes |
| Food Forms | [Food_Form_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Food_Form_Description.csv) | Text descriptions of U.S. EPA food form codes |
| Cooking Methods | [Cooking_Method_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Cooking_Method_Description.csv) | Text descriptions of U.S. EPA cooking method codes |
| **Recipes** | | |
| Recipes | [Recipes_WWEIA_FCID_0510.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Recipes_WWEIA_FCID_0510.csv) | U.S. EPA recipe database to translate WWEIA food consumption to consumption of agricultural food commodities |
| Recipes Partial | Recipes_WWEIA_FCID_0510-cropped.csv | Same table with less tuples (cropped) - 6,184 tuples |
| **Consumption** | | |
| Consumption | [Commodity_CSFFM_Intake_0510.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Commodity_CSFFM_Intake_0510.csv) | Commodity specific consumption by WWEIA respondent sequence number (SEQN), day code (DAYCODE), food form (FF), cooking method (CM), and cooked status (CS) |
| Consumption Partial | Commodity_CSFFM_Intake_0510-cropped.csv | Same table with less tuples (cropped) - 100,000 tuples |
| **Profile** | | |
| Food Commodity Profile | `profile/commodity-profile.csv` | Table created with consumption statistics from 62,160 people and participation in 7,154 recipes |

## [Esquema das Tabelas (Portuguese)](fcid-tables.pdf)

## Detailed Scheme

## Basics

### Grupos e Subgrupos de Cultura (Agrícolas)

> local: basics/FCID_Cropgroup_Description.csv
> remoto: [FCID_Cropgroup_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/FCID_Cropgroup_Description.csv)

Cada tupla é um grupo ou subgrupo. Quando o valor de `CGN` é igual a `CGL`, trata-se da descrição de um grupo, senão de um subgrupo.

| Campo | Descrição |
| --- | --- |
| CGN | código do grupo de cultura (agrícola) |
| CGL | código do subgrupo de cultura (agrícola) |
| Crop_Group_Description | descrição do grupo ou subgrupo de cultura |

### Ingredientes (Produtos Alimentares de Base)

> local: basics/FCID_Code_Description.csv
> remoto: [FCID_Code_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/FCID_Code_Description.csv)

Cada tupla é um produto alimentar de base usado em receitas.

| Campo | Descrição | Chave para a Tabela |
| --- | --- | --- |
| CGN | código do grupo de cultura (agrícola) | associado à tabela de Grupos e Subgrupos de Cultura |
| CG_Subgroup | código do subgrupo de cultura (agrícola) | associado à tabela de Grupos e Subgrupos de Cultura |
| FCID_Code | código do ingrediente | |
| FCID_Desc | descrição do ingrediente | |

## Alimentos feitos por Receitas

> local: basics/Food_Code_Description.csv
> remoto: [Food_Code_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Food_Code_Description.csv)

Cada tupla corresponde ao código e descrição de uma receita e o alimento resultante.

| Campo | Descrição |
| --- | --- |
| Food_Code | código de alimento resultante da receita |
| Food_Abbrev_Desc | descrição abreviada do alimento |
| Food_Desc | descrição detalhada do alimento |

## Estado de Cozimento do Ingrediente

> local: basics/Cooked_Status_Description.csv
> remoto: [Cooked_Status_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Cooked_Status_Description.csv)

Cada tupla é um estado de cozimento original do  ingrediente (produto alimentar) antes da preparação da receita.

| Campo | Descrição |
| --- | --- |
| Cooked_Status | código do estado de cozimento |
| count | |
| cooked_status_desc | descrição do estado de cozimento |

## Forma do Produto Alimentar

> local: basics/Food_Form_Description.csv
> remoto: [Food_Form_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Food_Form_Description.csv)

Cada tupla é uma forma do produto alimentar (ingrediente) ao ser usado na receita.

| Campo | Descrição |
| --- | --- |
| Food_Form | código da forma |
| count | |
| food_form_desc | descrição da forma |

## Método de Cozimento do Ingrediente na Receita

> local: basics/Cooking_Method_Description.csv
> remoto: [Cooking_Method_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Cooking_Method_Description.csv)

Cada tupla é um método de cozimento do ingrediente (produto alimentar) na receita.

| Campo | Descrição |
| --- | --- |
| Cooking_Method | código do método de cozimento |
| count | |
| cooking_method_desc | descrição do método de cozimento |

## Recipes

### Recipes (English)

| Field | Name | Description |
| ----- | ---- | ----------- |
| Food_Code | code of the food (recipe) | Foreign key to the WWEIA Food Code Descriptions table. |
| Mod_Code  | modified code | Code of a modified version of the current food. Zero means unmodified. |
| Ingredient_Num | ingredient number | sequential number ordering the ingredients. |
| FCID_Code | code of the commodity (ingredient) | Foreign key to the FCID Commodity Code Descriptions table. |
| Cooked_Status | cooked status | Foreign key to the FCID Cooked Status Descriptions table. |
| Food_Form | food form | Foreign key to the FCID Food Form Descriptions table. |
| Cooking_Method | cooking method | Foreign key to the FCID Cooking Method Descriptions table. |
| Commodity_Weight | commodity (ingredient) weight | participation of this ingredient (commodity) in the recipe weight -- in percentual. |

![Recipe Table](recipe-table.png)

### Receitas - Composição (Portuguese)

> local:
> * recipes/Recipes_WWEIA_FCID_0510.csv
> * recipes/Recipes_WWEIA_FCID_0510-cropped.csv (parcial)
>
> remoto: [Recipes_WWEIA_FCID_0510.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Recipes_WWEIA_FCID_0510.csv)

Cada tupla é um item que é parte de uma receita. Cada receita - todas as tuplas com o mesmo `Food_code`.

| Campo | Descrição | Chave para a Tabela |
| --- | --- | --- |
| Food_Code | código da receita | Alimentos feitos por Receitas |
| Mod_Code | código de receita modificada (0 = sem modificação) | |
| Ingredient_Num | número do ingrediente dentro da receita | |
| FCID_Code | código do ingrediente | Ingredientes (Produtos Alimentares) |
| Cooked_Status | estado e cozimento original do ingrediente | Estado de Cozimento do Produto |
| Food_Form | forma alimentar | Forma do Produto Alimentar |
| Cooking_Method | método de cozimento do ingrediente na receita | Método de Cozimento do Produto na Receita |
| Commodity_Weight | participação (em percentual) do ingrediente no peso da receita | |

## Consumption

### Consumption (English)

| Field | Description | Code |
| ----- | ----------- | ---- |
| SEQN  | respondent id  | |
| DRABF | indicates whether the (infant) respondent was breast-fed on either of the two recall days. | 1 = yes; 2 = no |
| DAYCODE | food diary: Day 1 or Day 2 | 1 = day 1; 2 = day 2 |
| FCID_Code | commodity code | |
| Cooked_Status | cooked status | |
| Food_Form | food form | |
| Cooking_Method | cooking method | |
| Intake | intake, in grams | |
| Intake_BW | intake,  in grams per kilogram body weight (g/kg bw) | |

### Consumo (Portuguese)

> local:
> * consumption/Commodity_CSFFM_Intake_0510-cropped.zip
> * consumption/Commodity_CSFFM_Intake_0510-cropped.csv (parcial)
>
> remoto: [Commodity_CSFFM_Intake_0510.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Commodity_CSFFM_Intake_0510.csv)

Cada tupla é um produto alimentar (ingrediente) ingerido por uma pessoa em um dia. Todas as tuplas com mesmo `SEQN` são ingestões da mesma pessoa no dia 1 ou 2 (`DAYCODE`).

| Campo | Descrição | Chave para a Tabela ou Valor |
| --- | --- | --- |
| SEQN  | id do entrevistado | |
| DRABF | indica se o entrevistado (bebê) foi amamentado em qualquer um dos dois dias de retorno | 1 = sim; 2 = não |
| DAYCODE | Dia do diário alimentar. | 1 = dia 1; 2= dia 2 |
| FCID_Code | código do produto alimentar (usado como ingrediente) | Ingredientes (Produtos Alimentares) |
| Cooked_Status | estado e cozimento original do ingrediente | Estado de Cozimento do Produto |
| Food_Form | forma alimentar | Forma do Produto Alimentar |
| Cooking_Method | método de cozimento do ingrediente na receita | Método de Cozimento do Produto na Receita |
| Intake | ingestão. em gramas | |
| Intake_BW | ingestão. em gramas por quilograma de peso corporal (g/kg pc) | |

## Profile

### Food Commodity Profile (English)

| Field | Description |
| ----- | ----------- |
| FCID_Code | code of the food commodity |
| FCID_Desc | description of the food commodity |
| CGN | group of food commodity |
| CG_Subgroup | subgroup of the food commodity |
| Popularity | number of people (among 62,160) who consumed the food |
| Intake_Sum | total consumption of food by 62,160 people in grams |
| Intake_AVG | average consumption of food in grams |
| Intake_BW_AVG | average consumption of food x person's weight |
| Recipes | number of recipes (among the 7,154) that used the product as an ingredient |

### Perfil do Produtos Alimentares (Portuguese)

Tabela criada com estatísticas de consumo de 62.160 pessoas e participação em 7.154 receitas. Cada tupla é o perfil de um produto alimentar (usado como ingrediente nas receitas).

| Campo | Descrição | Chave para a Tabela |
| --- | --- | --- |
| FCID_Code | código do produto alimentar (food commodity) | Ingredientes (Produtos Alimentares) |
| FCID_Desc | descrição do produto alimentar | |
| CGN | grupo a que pertence este produto | Grupos e Subgrupos de Cultura |
| CG_SUBGROUP | subgrupo a que pertence este produto | Grupos e Subgrupos de Cultura |
| Popularity | número de pessoas (dentre as 62.160) que consumiram o alimento | |
| Intake_Sum | total consumido do alimento pelas 62.160 pessoas em gramas | |
| Intake_AVG | média de consumo do alimento em gramas | |
| Intake_BW_AVG | média de consumo do alimento x peso da pessoa | |
| Recipes | número de receitas (dentre as 7.154) que têm o produto como ingrediente | |
