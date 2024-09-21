DROP TABLE IF EXISTS Crop_Group;
DROP TABLE IF EXISTS Crop_Group_VegAni;
DROP TABLE IF EXISTS FCID_Description;
DROP TABLE IF EXISTS Food_Description;
DROP TABLE IF EXISTS Recipes;
DROP TABLE IF EXISTS Demographics;
DROP TABLE IF EXISTS Intake;

CREATE TABLE Crop_Group (
  CGN VARCHAR(2),
  CGL VARCHAR(6),
  Crop_Group_Description VARCHAR(80),
  PRIMARY KEY (CGL)
);

COPY Crop_Group(CGN, CGL, Crop_Group_Description)
FROM '/home/basics/FCID_Cropgroup_Description.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE Crop_Group_VegAni (
  CGN VARCHAR(2),
  CGL VARCHAR(6),
  Crop_Group_Description VARCHAR(80),
  Veg_Animal CHAR(1),
  PRIMARY KEY (CGL)
);

COPY Crop_Group_VegAni(CGN, CGL, Crop_Group_Description, Veg_Animal)
FROM '/home/basics/FCID_Cropgroup_Description-veg.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE FCID_Description (
  CGN VARCHAR(2),
  CG_Subgroup VARCHAR(6),
  FCID_Code VARCHAR(10),
  FCID_Desc VARCHAR(55),
  PRIMARY KEY (FCID_Code)
);

COPY FCID_Description(cgn, CG_Subgroup, FCID_Code, FCID_Desc)
FROM '/home/basics/FCID_Code_Description.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE Food_Description (
  Food_Code VARCHAR(8),
  Food_Abbrev_Desc VARCHAR(55),
  Food_Desc VARCHAR(105)
);

COPY Food_Description(Food_Code, Food_Abbrev_Desc, Food_Desc)
FROM '/home/basics/Food_Code_Description.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE Recipes (
  Food_Code VARCHAR(8),
  Mod_Code VARCHAR(8),
  Ingredient_Num SMALLINT,
  FCID_Code VARCHAR(10),
  Cooked_Status SMALLINT,
  Food_Form SMALLINT,
  Cooking_Method SMALLINT,
  Commodity_Weight DECIMAL(5, 2),
  CSFII_9498_IND SMALLINT,
  WWEIA_9904_IND SMALLINT,
  WWEIA_0510_IND SMALLINT,
  PRIMARY KEY(Food_Code, Mod_Code, Ingredient_Num),
  FOREIGN KEY(FCID_Code)
    REFERENCES FCID_Description(FCID_Code)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

COPY Recipes(Food_Code, Mod_Code, Ingredient_Num, FCID_Code, Cooked_Status, Food_Form, Cooking_Method,
             Commodity_Weight, CSFII_9498_IND, WWEIA_9904_IND, WWEIA_0510_IND)
FROM '/home/recipes/Recipes_WWEIA_FCID_0510.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE Demographics (
  SeqN INTEGER NOT NULL,
  SDDSRVYR SMALLINT,
  RIDSTATR SMALLINT,
  RIDEXMON SMALLINT,
  RIAGENDR SMALLINT,
  RIDAGEYR SMALLINT,
  RIDAGEMN SMALLINT,
  RIDEXPRG SMALLINT,
  RIDAGEEX SMALLINT,
  RIDRETH1 SMALLINT,
  SDMVPSU SMALLINT,
  SDMVSTRA SMALLINT,
  DMDHHSIZ SMALLINT,
  YEAR_SURVEY VARCHAR(9),
  BMXWT DECIMAL(4,1),
  BMXHT DECIMAL(4,1),
  BMXRECUM DECIMAL(4,1),
  BMXBMI DECIMAL(5,2),
  BMXWT_IMPUTE DECIMAL(4,1),
  BMXHT_IMPUTE DECIMAL(4,1),
  bmxbmi_impute DECIMAL(5,2),
  RHQ200 SMALLINT,
  WTDRD1 DECIMAL(13,7),
  WT6_DAY1 DECIMAL(13,7),
  WTDR2D DECIMAL(13,7),
  WT6_2DAY DECIMAL(13,7),
  PRIMARY KEY(SeqN)
);

COPY Demographics(SEQN, SDDSRVYR, RIDSTATR, RIDEXMON, RIAGENDR, RIDAGEYR, RIDAGEMN, RIDEXPRG,
                  RIDAGEEX, RIDRETH1, SDMVPSU, SDMVSTRA, DMDHHSIZ, YEAR_SURVEY, BMXWT, BMXHT, BMXRECUM,
                  BMXBMI, BMXWT_IMPUTE, BMXHT_IMPUTE, bmxbmi_impute, RHQ200, WTDRD1, WT6_DAY1,
                  WTDR2D, WT6_2DAY)
FROM '/home/people/WWEIA_Demo_0510.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE Intake (
  SeqN INTEGER NOT NULL,
  DayCode SMALLINT NOT NULL,
  DraBF SMALLINT,
  FCID_Code VARCHAR(10),
  Cooked_Status SMALLINT,
  Food_Form SMALLINT,
  Cooking_Method SMALLINT,
  Intake DECIMAL(13,7),
  Intake_BW DECIMAL(13,10),
  PRIMARY KEY(SeqN, DayCode, FCID_Code, Cooked_Status, Food_Form, Cooking_Method),
  FOREIGN KEY(FCID_Code)
    REFERENCES FCID_Description(FCID_Code)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

COPY Intake(SEQN, DAYCODE, DRABF, FCID_Code, Cooked_Status, Food_Form, Cooking_Method, Intake,Intake_BW)
FROM '/home/consumption/Commodity_CSFFM_Intake_0510.csv'
DELIMITER ','
CSV HEADER;