CREATE TABLE "User" (
   user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	email VARCHAR(100) NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL
);

CREATE TABLE "Destination" (
   destination_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
	destination_country VARCHAR(50) NOT NULL,
	destination_city VARCHAR(100) NOT NULL,
	--destination_longitude DOUBLE NOT NULL, // to be added after first demo
	--destination_latitude DOUBLE NOT NULL, // to be added after first demo
	is_public BOOLEAN
);

CREATE TABLE "BucketList" (
	--id INT PRIMARY KEY NOT NULL, // not needed as one user can have only one bucket list
   user_id INT REFERENCES "User"(user_id),
   destination_id INT REFERENCES "Destination"(destination_id)
);

INSERT INTO "User"(email, username, password) VALUES ('user1@gmail.com', 'user1', 'user1')
SELECT * FROM "User"

INSERT INTO "Destination" (destination_country, destination_city, is_public)
VALUES
('Romania', 'Bucharest', true),
('Romania', 'Cluj-Napoca', true),
('Japan', 'Tokyo', true),
('Germany', 'Munich', true),
('USA', 'Los Angeles', true)
SELECT * FROM "Destination"

INSERT INTO "BucketList" VALUES
(1, 1),
(1, 4)
SELECT * FROM "BucketList"
