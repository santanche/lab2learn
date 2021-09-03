# National Health and Nutrition Examination Survey
[https://wwwn.cdc.gov/nchs/nhanes/](https://wwwn.cdc.gov/nchs/nhanes/)

## NHANES datasets from 2013-2014

This dataset was extracted from [NHANES 2013-2014](https://wwwn.cdc.gov/nchs/nhanes/continuousnhanes/default.aspx?BeginYear=2013). The following tables are available:

### `demographic-person.csv`

Persons who participated in the survey.

| field | description | domain |
|-------|-------------|--------|
| `id` | id of a participant | number |
| `gender` | gender of the participant | `1` - male; `2` - female |
| `age` | age of the participant | number |

### `medications-drug.csv`

Drugs catalog.

| field | description | domain |
|-------|-------------|--------|
| `code` | code of the drug | string |
| `name` | name of the drug | string |

### `medications-use.csv`

Records drugs used by participants in the survey and how many days they are continuously using the drug.

| field | description | domain |
|-------|-------------|--------|
| `person_id` | id of a participant in the survey | number |
| `drug_code` | code of a drug in the catalog | string |
| `days_use` | number of days of use |
