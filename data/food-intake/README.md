# U.S. EPA Food Commodity Intake Database (FCID)

| Table | File | Description |
| ----- | ---- | ----------- |
| FCID Recipe Database | [Recipes_WWEIA_FCID_0510.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Recipes_WWEIA_FCID_0510.csv) | U.S. EPA recipe database to translate WWEIA food consumption to consumption of agricultural food commodities |
| WWEIA Food Code Descriptions | [Food_Code_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Food_Code_Description.csv) | Text descriptions of WWEIA food codes |
| FCID Commodity Code Descriptions | [FCID_Code_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/FCID_Code_Description.csv) | Text descriptions of U.S. EPA FCID commodity codes |
| FCID Crop Group Descriptions | [FCID_Cropgroup_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/FCID_Cropgroup_Description.csv) | Text descriptions of U.S. EPA FCID crop groups |
| FCID Food Form Descriptions | [Food_Form_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Food_Form_Description.csv) | Text descriptions of U.S. EPA food form codes |
| FCID Cooked Status Descriptions | [Cooked_Status_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Cooked_Status_Description.csv) | Text descriptions of U.S. EPA cooking status codes |
| FCID Cooking Method Descriptions | [Cooking_Method_Description.csv](https://fcid.foodrisk.org/dbc/csv2014Q4/Cooking_Method_Description.csv) | Text descriptions of U.S. EPA cooking method codes |




| Food_Code |
| FCID_Code | 

Code of the food. Foreign key to the WWEIA Food Code Descriptions table.
Code of the ingredient (commodity). Foreign key to the FCID Commodity Code Descriptions table.
Modification code. Code of a modified version of the current food. Zero means unmodified.
Ingredient number. Sequential number ordering the ingredients.
Cooked status. Foreign key to the FCID Cooked Status Descriptions table.
Cooking method. Foreign key to the FCID Cooking Method Descriptions table.
Food form. Foreign key to the FCID Food Form Descriptions table.
Participation of this ingredient (commodity) in the recipe weight -- in percentual.

https://fcid.foodrisk.org/docs/WWEIA-FCID_0510_Background-Codebooks-ControlStats.pdf