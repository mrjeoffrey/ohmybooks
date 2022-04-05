DROP DATABASE IF EXISTS ohmybooks_db;

CREATE DATABASE ohmybooks_db;

USE ohmybooks_db;

CREATE TABLE books (
    id  INT NOT NULL,
    title VARCHAR(30),NOT NULL,
    description TEXT,
    isbn VARCHAR(30), NOT NULL,
    genre VARCHAR(30), NOT NULL,
    author VARCHAR(30), NOT NULL,
    publication VARCHAR(30), NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE book_genre (
    id INT NOT NULL,
    genre_id INT NOT NULL,
    title TEXT, 
    description TEXT,
    isbn VARCHAR(30) NOT NULL,
    author VARCHAR(30), NOT NULL,
    publication VARCHAR(30), NOT NULL,
    FOREIGN KEY (genre_id)
    REFERENCES books(id)
    ON DELETE SET NULL
);

