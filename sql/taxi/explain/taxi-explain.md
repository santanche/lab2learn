~~~sql
CREATE TABLE cliente(
  id integer,
  nome VARCHAR(80),
  PRIMARY KEY(id)
);

CREATE TABLE cliente_particular(
  id integer,
  cpf VARCHAR(14),
  PRIMARY KEY(id),
  FOREIGN KEY(id) REFERENCES cliente(id)
);

CREATE TABLE cliente_empresa(
  id integer,
  cnpj VARCHAR(18),
  PRIMARY KEY(id),
  FOREIGN KEY(id) REFERENCES cliente(id)
);

CREATE TABLE taxi (
  placa VARCHAR(7),
  marca VARCHAR(30),
  modelo VARCHAR(30),
  anofab INTEGER,
  PRIMARY KEY(placa)
);

CREATE TABLE corrida (
  cliid integer,
  placa VARCHAR(7),
  dataPedido DATE,
  PRIMARY KEY(cliid, placa, dataPedido),
  FOREIGN KEY(cliid) REFERENCES cliente(id),
  FOREIGN KEY(placa) REFERENCES taxi(placa)
);
~~~

~~~sql
INSERT INTO cliente VALUES
(1755, 'Doriana'), (93, 'Dino'),    (1532,'Asdrubal'),
(1780,'Quincas'),  (97,'Proj'),     (255, 'Marcela'),
(653, 'Lucas'),    (876, 'Renato'), (921, 'Paula'),
(345, 'Mariana'),  (456, 'Carlos'), (789, 'Ana');

INSERT INTO cliente_particular VALUES
(1755, 'CPF1'),(1532,'CPF2'),(1780,'CPF3'),
(255, 'CPF4'), (653, 'CPF5'), (921, 'CPF6');

INSERT INTO cliente_empresa VALUES
(93, 'CNPJ91'), (97, 'CNPJ92'), (345, 'CNPJ93'),
(456, 'CNPJ94'), (789, 'CNPJ95'), (876, 'CNPJ96');

INSERT INTO taxi VALUES
('DAE6534','Ford','Fiesta',1999),
('DKL4598','Volkswagen','Gol',2001),
('DKL7878','Ford','Fiesta', 2001),
('JDM8776','Volkswagen','Santana',2002),
('JJM3692','Chevrolet','Corsa',1999),
('KLM1234','Fiat','Palio',2003),
('QWE4567','Renault','Clio',2005),
('DFG7890','Toyota','Corolla',2008),
('KJH2345','Honda','Civic',2010),
('KKK6569','Mitsubishi','Lancer',2014);

INSERT INTO corrida VALUES
(1755, 'DAE6534', '2003-02-15'), (97,  'JDM8776', '2003-02-18'),
(255, 'DFG7890',  '2003-02-20'), (653, 'QWE4567', '2003-02-22'),
(921, 'KLM1234',  '2003-02-25'), (345, 'JJM3692', '2003-03-01'),
(456, 'DKL7878',  '2003-03-03'), (789, 'DKL4598', '2003-03-05'),
(876, 'KJH2345',  '2003-03-08');
~~~

~~~sql
EXPLAIN
SELECT * FROM CLIENTE;
~~~

~~~sql
EXPLAIN ANALYZE
SELECT * FROM CLIENTE;
~~~

~~~sql
EXPLAIN ANALYZE
SELECT * FROM CLIENTE NATURAL JOIN CLIENTE_EMPRESA;
~~~

~~~sql
EXPLAIN ANALYZE
SELECT * FROM CLIENTE NATURAL JOIN CORRIDA;
~~~

~~~sql
EXPLAIN ANALYZE
SELECT * FROM CLIENTE NATURAL JOIN TAXI;
~~~

~~~sql
EXPLAIN ANALYZE
SELECT nome FROM cliente;
~~~

~~~sql
SELECT a.nome FROM cliente a
WHERE a.nome IN
  (SELECT b.nome FROM cliente b);
~~~
