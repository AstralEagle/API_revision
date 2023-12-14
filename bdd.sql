-- Création de la base de données TPAPI
CREATE DATABASE TPAPI;

-- Utilisation de la base de données TPAPI
USE TPAPI;

-- Création de la table products
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Création de la table users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(191) NOT NULL UNIQUE,
    pwd VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertion de données d'exemple dans la table products
INSERT INTO products (title, price, description) VALUES
('Clavier Mécanique Gaming', 59.99, 'Clavier mécanique RGB pour les joueurs'),
('Souris Gamer Sans Fil', 29.99, 'Souris sans fil avec capteur de haute précision'),
('Casque Audio Bluetooth', 89.99, 'Casque Bluetooth avec réduction de bruit active'),
('Carte Graphique GTX 1050 Ti', 199.99, 'Carte graphique pour jeux et graphismes 3D'),
('Disque Dur Externe 1To', 49.99, 'Disque dur externe portable de 1 To USB 3.0'),
('Routeur WiFi Haute Vitesse', 99.99, 'Routeur WiFi pour une connexion Internet rapide et stable'),
('Écran PC LED 24 pouces', 129.99, 'Écran LED Full HD avec un temps de réponse rapide'),
('RAM DDR4 16GB', 79.99, 'Mémoire vive DDR4 pour les ordinateurs de bureau'),
('SSD Interne 500GB', 69.99, 'Disque SSD interne pour un démarrage et des performances rapides'),
('Webcam HD avec Microphone', 39.99, 'Webcam HD pour les appels vidéo et les conférences');