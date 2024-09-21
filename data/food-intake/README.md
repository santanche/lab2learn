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
|
├── people      <- participants and demographics
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
| Demographics | [Demographics_WWEIA_0510.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/WWEIA_Demo_0510.csv) | Demographic data of participants |
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

## Demographic Data

### Demographic Data (English)

| Field | Description | Details |
| ----- | ----------- | ------- |
| SEQN | Respondent ID | |
| SDDSRVYR | The two-year NHANES data release cycle number | |
| RIDSTATR | Interview/Examination Status | |
| RIDEXMON | Exam six month time period | |
| RIAGENDR | Gender | |
| RIDAGEYR | Age at the time of the screening interview,  in years | |
| RIDAGEMN | Age at the time of the household screening interview,  in months | |
| RIDEXPRG | Pregnancy Status at Exam | |
| RIDAGEEX | Age at the Mobile Examination Center (MEC) examination,  in months | |
| RIDRETH1 | Race/Ethnicity | |
| SDMVPSU | Masked Variance Pseudo-PSU | |
| SDMVSTRA | Masked Variance Pseudo-Stratum | |
| DMDHHSIZ | Total number of people in the household | |
| YEAR_SURVEY | NHANES-WWEIA Survey Cycle | Renamed from original NHANES: YEAR |
| BMXWT | Bodyweight,  in kilograms (kg) | |
| BMXHT | Standing Height (cm) | Target: 2 years -150 years. |
| BMXRECUM | Recumbent Length (cm) | Target: 0 MONTHS - 47 MONTHS. |
| BMXBMI | Body Mass Index (kg/m^2) | Target : 2 years-150 years. |
| BMXWT_IMPUTE | Imputed and non-imputed value for Bodyweight (kg) | Contains imputed and non-imputed value for Bodyweight (kg). Missing value of bodyweight BMXWT) is imputed by weighted average of BMXWT value from same sex, age and ethnicity. Non-missing value is the same as the non-missing value of BMXWT. |
| BMXHT_IMPUTE | Imputed and non-imputed values for height (cm) | Contains imputed and non-imputed values for height (cm). CDC does not report standing height for less than 2 years old. Recumbent length was used for less than 2 years old. Missing value of height is imputed by weighted average of height from same sex, age and ethnicity. |
| bmxbmi_impute | Imputed and non-imputed value for BMI | Contains imputed and non-imputed value for BMI. | Missing value of BMI is imputed by the following equation: = BMXWT_IMPUTE/(BMXHT_IMPUTE/100)^2; Unit: (kg/m2) |
| RHQ200 | {Are you/Is Surrogate Parent} now breast feeding a child? | |
| WTDRD1 | Dietary day one sample weight | |
| WT6_DAY1 | Dietary day one sample weight; 6-year weighting from 3 survey cycles | 2005-2010 (= WTDRD1 ÷ 3) |
| WTDR2D | Dietary two-day sample weight | |
| WT6_2DAY | Dietary two-day sample weight; 6-year weighting from 3 survey cycles | 2005-20010 (= WTDR2D ÷ 3) |

### Dados Demográficos (Portuguese)

| Campo | Descrição |
| ----- | --------- |
| SEQN | ID do entrevistado |
| SDDSRVYR | Número do ciclo de divulgação de dados do NHANES de dois anos |
| RIDSTATR | Status da entrevista/exame |
| RIDEXMON | Período de seis meses do exame |
| RIAGENDR | Sexo (1 = masculino; 2 = feminino) |
| RIDAGEYR | Idade no momento da entrevista de triagem,  em anos |
| RIDAGEMN | Idade no momento da entrevista de triagem domiciliar,  em meses |
| RIDEXPRG | Status da gravidez no exame |
| RIDAGEEX | Idade no exame do Mobile Examination Center (MEC), em meses |
| RIDRETH1 | Raça/Etnia |
| SDMVPSU | Pseudo-PSU de variância mascarada |
| SDMVSTRA | Pseudo-estrato de variância mascarada |
| DMDHHSIZ | Número total de pessoas no domicílio |
| YEAR_SURVEY | Ciclo da pesquisa NHANES-WWEIA; renomeado do original do NHANES: YEAR |
| BMXWT | Peso corporal, em quilogramas (kg) |
| BMXHT | Altura em pé (cm) |
| BMXRECUM | Comprimento reclinado (cm) |
| BMXBMI | Índice de massa corporal (kg/m^2) |
| BMXWT_IMPUTE | Valor imputado e não imputado para peso corporal (kg) |
| BMXHT_IMPUTE | Valores imputados e não imputados para altura (cm) |
| bmxbmi_impute | Valor imputado e não imputado para IMC |
| RHQ200 | {Você/Uma mãe substituta} está amamentando agora uma criança? |
| WTDRD1 | Peso da amostra do primeiro dia da dieta |
| WT6_DAY1 | Peso da amostra do primeiro dia da dieta; ponderação de 6 anos de 3 ciclos de pesquisa |
| WTDR2D | Peso da amostra de dois dias da dieta |
| WT6_2DAY | Peso da amostra de dois dias da dieta; ponderação de 6 anos de 3 ciclos de pesquisa |

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
