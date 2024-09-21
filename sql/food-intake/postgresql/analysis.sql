DROP VIEW IF EXISTS Intake_Subgroups;

CREATE VIEW Intake_Subgroups AS
SELECT I.SEQN, F.CG_Subgroup, SUM(I.Intake) AS Intake
FROM Intake I, FCID_Description F
WHERE I.FCID_Code = F.FCID_Code
GROUP BY I.SEQN, F.CG_Subgroup
ORDER BY I.SEQN, F.CG_Subgroup;

COPY (SELECT * FROM Intake_Subgroups)
TO '/home/grouped/intake-subgroups.csv'
DELIMITER ','
CSV HEADER;

---

docker exec -it docker-food-intake-db-1 bash
psql -U postgres food_intake
\copy (SELECT * FROM Intake_Subgroups) TO '/home/grouped/intake-subgroups.csv' DELIMITER ',' CSV HEADER;

---

DROP VIEW IF EXISTS Intake_BW_Subgroups;

CREATE VIEW Intake_BW_Subgroups AS
SELECT I.SEQN, F.CG_Subgroup, SUM(I.Intake_BW) AS Intake_BW
FROM Intake I, FCID_Description F
WHERE I.FCID_Code = F.FCID_Code
GROUP BY I.SEQN, F.CG_Subgroup
ORDER BY I.SEQN, F.CG_Subgroup;

---

docker exec -it docker-food-intake-db-1 bash
psql -U postgres food_intake
\copy (SELECT * FROM Intake_BW_Subgroups) TO '/home/grouped/intake-bw-subgroups.csv' DELIMITER ',' CSV HEADER;

---

DROP VIEW IF EXISTS Intake_BW_VegAni;

CREATE VIEW Intake_BW_VegAni AS
SELECT I.SEQN, V.Veg_Animal, SUM(I.Intake_BW) AS Intake_BW
FROM Intake I, FCID_Description F, Crop_Group_VegAni V
WHERE I.FCID_Code = F.FCID_Code AND F.CG_Subgroup = V.CGL
GROUP BY I.SEQN, V.Veg_Animal
ORDER BY I.SEQN, V.Veg_Animal;

---

docker exec -it docker-food-intake-db-1 bash
psql -U postgres food_intake
\copy (SELECT * FROM Intake_BW_VegAni) TO '/home/grouped/intake-bw-vegani.csv' DELIMITER ',' CSV HEADER;

---

DROP VIEW IF EXISTS Intake_Age_Product;

CREATE VIEW Intake_Age_Product AS
SELECT D.RIDAGEYR Age, I.FCID_Code, AVG(Intake_BW) Avg_Intake_BW
FROM Intake I, Demographics D
WHERE I.SeqN = D.SeqN
GROUP BY D.RIDAGEYR, I.FCID_Code;

SELECT Age, Avg_Intake_BW
FROM Intake_Age_Product
WHERE FCID_Code = '103296000';

\copy (SELECT Age, Avg_Intake_BW FROM Intake_Age_Product WHERE FCID_Code = '103296000') TO '/home/grouped/potato-by-age.csv' DELIMITER ',' CSV HEADER;

DROP VIEW IF EXISTS Intake_Age_Person;

CREATE VIEW Intake_Age_Person AS
SELECT I.FCID_Code, D.RIDAGEYR Age, I.Intake_BW
FROM Intake I, Demographics D
WHERE I.SeqN = D.SeqN
ORDER BY I.FCID_Code, Age;

---

docker exec -it docker-food-intake-db-1 bash
psql -U postgres food_intake
\copy (SELECT * FROM Intake_Age_Person) TO '/home/grouped/product-intake.csv' DELIMITER ',' CSV HEADER;
\copy (SELECT * FROM Intake_Age_Person WHERE FCID_Code = '103296000') TO '/home/grouped/potato-intake.csv' DELIMITER ',' CSV HEADER;

---