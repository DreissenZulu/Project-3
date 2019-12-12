DROP DATABASE IF EXISTS InFactDB;
CREATE database InFactDB;
USE InFactDB;

CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    bio VARCHAR(1000),
    city VARCHAR(100),
    country VARCHAR(100)
);

CREATE TABLE savedjobs(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    jobtitle VARCHAR(1000),
    userid VARCHAR(100)
);

CREATE TABLE links(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userid INT,
    link1 VARCHAR (100),
    link2 VARCHAR (100),
    link3 VARCHAR (100)
);

CREATE TABLE comments(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	comment_text VARCHAR (100),
    poster_id INT,
    commenton_id INT
);

CREATE TABLE replies(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	reply_text VARCHAR (100),
    comment_id INT,
    reply_poster_id INT
);






