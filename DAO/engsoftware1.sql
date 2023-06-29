CREATE DATABASE engsoftware1;
create database engsoftware1;

USE engsoftware1;

CREATE TABLE produto(
    ID int AUTO_INCREMENT PRIMARY KEY,
    Price int,
    Estoque int,
    Nome varchar(50),
    Vendedor varchar(50),
);

CREATE TABLE usuario(
    CPF int,
    Nome varchar(50),
    Endereco varchar(50),
);