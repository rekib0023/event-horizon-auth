all: run exec

run:
	docker run -d -p 3306:3306 --name mysql-docker-container -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=event_horizon_auth -e MYSQL_USER=admin -e MYSQL_PASSWORD=password mysql/mysql-server:latest

exec:
	docker exec -it mysql-docker-container bash -c "mysql -u root -p"