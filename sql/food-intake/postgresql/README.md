# PostgreSQL
https://www.postgresql.org

# PostgreSQL Docker

Image: https://hub.docker.com/_/postgres

The `docker-compose.yml` has the instructions for "docker compose":

* It departs from the Postgres Docker image.
* It is meant to be a local configuration of the docker image and must be adapted to the deployment server.
* In the `ports` section, it redirects the default Postgres port (`5432`) to another one (`5421`), avoiding port collision in case you have a PostgreSQL installed on your machine (optional).
* It maps two internal (docker machine) folders to external (host machine) ones.
  * The default internal docker database folder (`/var/lib/postgresql/data`) is mapped to the external: `/home/user/data/pgsql/docker`.
  * The internal home directory (`/home`) is mapped to the external: `/home/user/data/pgsql/impexp`. This directory is meant to manage files imported/exported.
  * You must adjust the external directory to your machine folder structure.
* The `restart` clause considers the local dev environment (it does not restart whenever you turn the machine on). In the server configuration, we suggest replacing it with `restart: always`.

To run:
~~~
docker compose up
~~~

# Interaction

~~~
docker exec -it docker-food-intake-db-1 bash
psql -U postgres food_intake
~~~

# PostgreSQL on Ubuntu

These are Ubuntu instructions. They may vary on Windows and Mac.

## Install Ubuntu

Installation instructions:
https://www.postgresql.org/download/linux/ubuntu/

The simplest approach probably will not install the latest version:
~~~
apt install postgresql
~~~

To install the latest one, follow the instructions of "manually configure the Apt repository".

## pgAdmin
https://www.pgadmin.org/

Detailed instructions to install pgAdmin via apt:
https://www.pgadmin.org/download/pgadmin-4-apt/

## Changing the Password

~~~
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
~~~

## Server Management

The three following commands start, stop, and show the status of the server at Ubuntu, respectively:

~~~
sudo systemctl start postgresql
sudo systemctl stop postgresql
sudo systemctl status postgresql
~~~

Reference: https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html

## Repository Location

To change the database location at Ubuntu:
https://www.digitalocean.com/community/tutorials/how-to-move-a-postgresql-data-directory-to-a-new-location-on-ubuntu-20-04
