docker compose up
docker exec -it docker-foodb-db-manager-1 bash

mysql -u root -p foodb --local-infile
password: root

# Comentários
O parâmetro `--local-infile` tem que constar na chamada (cliente) e tem que ser configurado internamente (servidor), para permitir importação de arquivos.

O arquivo `my.conf` neste diretório deve ser copiado para o diretório `/etc/mysql/` dentro da imagem para permitir exportação:

~~~
docker cp ./my.cnf docker-foodb-db-manager-1:/etc/mysql/my.cnf
~~~

# Importação dentro do MySQL no Docker
1. entrar no processo docker: `docker exec -it docker-foodb-db-manager-1 bash`
2. entrar na pasta de importação `cd /import`
3. criar o banco de dados
~~~
mysql -u root -p
password: root
CREATE DATABASE foodb;
exit
~~~
4. chamada de importação (senha root):
~~~
mysql -p --local-infile foodb < foodb_server_dump_2020_4_21.sql > import-log.log
~~~