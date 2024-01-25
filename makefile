# Create developmenpt enviroment
up:
	docker-compose up -d

# Delete developmenpt enviroment
down:
	docker-compose down --volumes --rmi all

up-images:
	docker-compose build --no-cache