# NHANES 2005-2006 processed data

# Reference values for NHANES for the 2005-2006 survey

* Extracted from data of the NHANES Web site (https://wwwn.cdc.gov/nchs/nhanes/).

## Importing normal ranges of values indicated in the NHANES documentation

The file `reference-ranges.csv` contains reference ranges from NHANES.

* For each variable it is indicated
  - applicable gender
  - age range (ageStart until ageEnd)

* The range is indicated in the form of mininum and maximum values considered normal.

## Importing data from the survey NHANES 2005-2006

* The file `combined-selected-variables.csv` contains a tuple for each individual, with a selected set of variables that are used do diagnose anemia, as mentioned in Figure 1. It was filtered only the individuals with values for all fields.

![evaluation of anemia](evaluation-of-anemia.gif "Figure 1")
*Figure 1*: Evaluation of anemia in the adult according to the mean corpuscular volume. CBC: complete blood count; MCV: mean corpuscular volume; RBCs: red blood cells; Fe: iron; TIBC: total iron-binding capacity (transferrin); LDH: lactate dehydrogenase [6].

## Codes and description of NHANES variables

* The file `reference-ranges-variables.csv` contains codes and description of the variables adopted in this study.
