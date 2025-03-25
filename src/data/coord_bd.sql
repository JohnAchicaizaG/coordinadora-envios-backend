CREATE DATABASE  IF NOT EXISTS `task_manager` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `task_manager`;
-- MySQL dump 10.13  Distrib 8.0.41, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: task_manager
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_status_history`
--

DROP TABLE IF EXISTS `order_status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `status` enum('pending','in_transit','delivered') NOT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status_history`
--

LOCK TABLES `order_status_history` WRITE;
/*!40000 ALTER TABLE `order_status_history` DISABLE KEYS */;
INSERT INTO `order_status_history` VALUES (1,1,'in_transit','2025-03-23 13:30:08'),(2,2,'pending','2025-03-23 14:20:39'),(3,3,'pending','2025-03-23 14:51:43'),(4,4,'pending','2025-03-23 15:29:12'),(5,3,'in_transit','2025-03-23 16:10:02'),(6,5,'pending','2025-03-23 16:12:59'),(7,5,'in_transit','2025-03-23 16:14:07'),(8,6,'pending','2025-03-23 16:19:27'),(9,6,'in_transit','2025-03-23 16:19:43'),(10,7,'pending','2025-03-23 16:21:37'),(11,7,'in_transit','2025-03-23 16:21:50'),(12,8,'pending','2025-03-23 16:22:55'),(13,8,'in_transit','2025-03-23 16:23:10'),(14,9,'pending','2025-03-23 16:27:31'),(15,9,'in_transit','2025-03-23 16:27:53'),(16,10,'pending','2025-03-23 16:36:46'),(17,10,'in_transit','2025-03-23 16:37:14'),(18,11,'pending','2025-03-23 17:56:45'),(19,12,'pending','2025-03-23 18:06:16'),(20,13,'pending','2025-03-23 18:09:10'),(21,14,'pending','2025-03-23 18:10:47'),(22,14,'in_transit','2025-03-23 18:11:22'),(23,15,'pending','2025-03-23 18:18:39'),(24,15,'in_transit','2025-03-23 21:00:17'),(25,16,'pending','2025-03-23 21:05:05'),(26,16,'in_transit','2025-03-23 21:05:39'),(27,16,'in_transit','2025-03-24 00:30:32'),(28,12,'in_transit','2025-03-24 00:33:21'),(29,17,'pending','2025-03-24 15:09:07'),(30,17,'in_transit','2025-03-24 15:09:37'),(31,18,'pending','2025-03-24 15:10:33'),(32,18,'in_transit','2025-03-24 15:11:37'),(33,18,'in_transit','2025-03-24 15:35:04'),(34,18,'in_transit','2025-03-24 15:35:20'),(35,19,'pending','2025-03-24 16:49:18'),(36,19,'in_transit','2025-03-24 16:52:09'),(37,20,'pending','2025-03-24 21:23:04'),(38,20,'in_transit','2025-03-24 21:23:35'),(39,18,'delivered','2025-03-24 23:43:16'),(40,1,'delivered','2025-03-25 01:19:57'),(41,2,'delivered','2025-03-25 01:20:18'),(42,3,'delivered','2025-03-25 01:21:55'),(43,3,'delivered','2025-03-25 01:22:38'),(44,4,'delivered','2025-03-25 01:22:46'),(45,8,'delivered','2025-03-25 02:03:19'),(46,5,'delivered','2025-03-25 02:08:38'),(47,13,'in_transit','2025-03-25 02:11:28'),(48,21,'pending','2025-03-25 02:19:38'),(49,21,'in_transit','2025-03-25 02:20:49'),(50,21,'delivered','2025-03-25 02:24:30');
/*!40000 ALTER TABLE `order_status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `origin_address` varchar(255) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `dimensions` varchar(255) NOT NULL,
  `product_type` varchar(100) NOT NULL,
  `destination_address` varchar(255) NOT NULL,
  `route_id` int DEFAULT NULL,
  `transporter_id` int DEFAULT NULL,
  `status` enum('pending','in_transit','delivered') NOT NULL DEFAULT 'pending',
  `start_time` timestamp NULL DEFAULT NULL,
  `delivered_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `route_id` (`route_id`),
  KEY `transporter_id` (`transporter_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`transporter_id`) REFERENCES `transporters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,5,'Calle 45 #12-34, Bogota',2.50,'25x30x2 ','Camiseta personalizada','Cra 7 #45-20, Bogotá',5,2,'delivered','2025-03-22 15:10:02',NULL,'2025-03-23 13:30:08'),(2,5,'Carrera 7 #65-89, Medellin',2.50,'10x10x6','Reloj inteligente','Cra 7 #45-20, Bogotá',4,3,'delivered','2025-03-22 21:10:02',NULL,'2025-03-23 14:20:39'),(3,5,'Avenida 30 de Agosto #45-67, Pereira',2.50,'12x12x5','Audifonos bluetooth','Cra 7 #45-20, Bogotá',4,1,'delivered','2025-03-23 16:10:02',NULL,'2025-03-27 14:51:43'),(4,3,'Carrera 50 #20-15, Cali',10.00,'35x25x3','Zapatos deportivos','Manana 30 casas 344, pasto',2,4,'delivered','2025-03-24 16:37:14',NULL,'2025-03-23 15:29:12'),(5,5,'Calle 10 #8-55, Cartagena',5.20,'60x60x100','Lentes de sol','Cra 10 #20-30, Bogotá',1,4,'delivered','2025-03-23 16:14:07',NULL,'2025-03-23 16:12:59'),(6,5,'Carrera 15 #23-90, Barranquilla',5.20,'35x25x12','Perfume para hombre','Cra 10 #20-30, Bogotá',2,1,'in_transit','2025-03-23 16:19:43',NULL,'2025-03-26 16:19:27'),(7,5,'Calle 13 Sur #30-21, Envigado',5.20,'16x6x5','Consola de videojuegos','Cra 10 #20-30, Bogotá',1,7,'in_transit','2025-03-23 16:21:50',NULL,'2025-03-23 16:21:37'),(8,5,'Carrera 9 #14-78, Medellin',5.20,'8x5x15','Cuadro decorativo','Cra 10 #20-30, Bogotá',1,7,'delivered','2025-03-23 16:23:10',NULL,'2025-03-23 16:22:55'),(9,5,'Avenida Circunvalar #101-50, Bucaramanga',5.20,'7x5x14','Termo de acero inoxidable','Cra 10 #20-30, Bogotá',2,5,'in_transit','2025-03-23 16:27:53',NULL,'2025-03-23 16:27:31'),(10,5,'Calle 72 #21-18, Bogota',5.20,'30x25x10','Mochila impermeable ','Cra 10 #20-30, Bogotá',1,1,'in_transit','2025-03-23 16:37:14',NULL,'2025-03-23 16:36:46'),(11,3,'Carrera 33 #44-90, Manizales',15.00,'40x60x5','Parlante portatil ','Manana 30 casas 344, Pasto',2,2,'pending','2025-03-26 16:37:14',NULL,'2025-03-23 17:56:45'),(12,3,'Calle 5A #12-40, Cali',12.00,'8x8x28','Set de maquillaje','Manana 30 casas 344, pasto',2,1,'in_transit','2025-03-24 00:33:21',NULL,'2025-03-23 18:06:16'),(13,3,'Carrera 19 #36-29, Armenia',123.00,'35x45x15','Drone con camara ','Manana 30 casas 344, Pasto',5,5,'in_transit','2025-03-25 02:11:28',NULL,'2025-03-23 18:09:10'),(14,3,'Calle 22 #6-10, Barranquilla',20.00,'12x14x16','Camara de seguridad wifi ','Manana 30 casas 344, Cali',1,1,'in_transit','2025-03-23 18:11:22',NULL,'2025-03-23 18:10:47'),(15,3,'Avenida Boyaca #45-55, Bogota',2123.00,'20x10x10','Celular','Manana 30 casas 344, Cali',3,3,'in_transit','2025-03-23 21:00:17',NULL,'2025-03-23 18:18:39'),(16,8,'Calle 16A #7-66, Ibague',20.00,'25x25x100','Bicicleta','Manana 30 casas 344, Pasto',2,2,'delivered','2025-03-25 09:00:00','2025-03-25 11:15:00','2025-03-23 21:05:05'),(17,5,'Carrera 42 #24-70, Floridablanca',5.00,'12x10x10','Cubo Rubicks','Carrera 23 numero 20, pasto',1,4,'delivered','2025-03-26 08:30:00','2025-03-26 10:00:00','2025-03-24 15:09:07'),(18,5,'Calle 8 #25-32, Cartagena',35.00,'12x14x20','Teclado mecanico ','Calle 23 #42, Cali',2,6,'delivered','2025-03-24 15:35:20','2025-03-24 18:45:00','2025-03-24 15:10:33'),(19,5,'Carrera 20 #18-22, Neiva',1.00,'25x20x8','Cobija de microfibra','Manana 30 casas 344, pasto',4,6,'in_transit','2025-03-24 16:52:09',NULL,'2025-03-24 16:49:18'),(20,5,'Calle 12 #4-18, Medellin',123.00,'35x20x18','Teclado mecanico','Manana 30 casas 344, Pasto',4,5,'in_transit','2025-03-24 21:23:35',NULL,'2025-03-24 21:23:04'),(21,3,'Carrera 3 # 16 - 80 Lorenzo, Pasto',5.00,'40x30x15','Babuchas','Calle falsa 123 san victorino, bogota',1,6,'delivered','2025-03-25 02:20:49',NULL,'2025-03-25 02:19:38');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (1,'Medellin-Bogota','2025-03-23 16:08:47'),(2,'Cartagena-Bogota','2025-03-23 22:20:45'),(3,'Cali-Medellin','2025-03-24 13:46:56'),(4,'Pasto-Cali','2025-03-24 15:18:34'),(5,'Barranquilla-Ibague','2025-03-24 16:58:23'),(6,'Sincelejo-Valledupar','2025-03-25 02:41:59');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transporters`
--

DROP TABLE IF EXISTS `transporters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transporters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `available` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `capacity` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transporters`
--

LOCK TABLES `transporters` WRITE;
/*!40000 ALTER TABLE `transporters` DISABLE KEYS */;
INSERT INTO `transporters` VALUES (1,'Laura Mendoza',1,'2025-03-23 16:09:21',20),(2,'Carlos Herrera',1,'2025-03-23 22:14:10',80),(3,'Felipe Rios',1,'2025-03-24 13:24:42',200),(4,'Andrea Caceres',1,'2025-03-24 13:46:23',60),(5,'Jorge Zambrano',1,'2025-03-24 15:34:02',1000),(6,'Camila Torres',1,'2025-03-24 15:35:54',5),(7,'Mariana Duarte',1,'2025-03-24 15:37:05',100),(8,'Santiago Bravo',0,'2025-03-24 16:58:31',15),(9,'Antonios Meneses',1,'2025-03-25 02:42:20',5);
/*!40000 ALTER TABLE `transporters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user','logistics') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'logisticsadmin@coordinadora.com','$2b$10$/a5Q2aGtzHPwPTYAGPwg3u4EF0TIrPQf58jXBLUP2CzfaEr8nh5EW','logistics','2025-03-22 13:40:18'),(2,'admin@coordinadora.com','$2b$10$0f/hfg0jon.lBaPUqgd/oeDw5uXjW1evgLEh.AprDvxaaX/4/g./G','admin','2025-03-22 13:43:27'),(3,'user@coordinadora.com','$2b$10$mkUpJttafbVA9Z5h9c0sTeYeO5CxO2Ml7ZgDHJsqRvV3oQFfefQb2','user','2025-03-22 13:45:07'),(5,'testeruser3@example.com','$2b$10$aw0bvSWeFOdKu02ZVepeV.OTQ2Nnx/89sKhq9I5o3ady.Vj.cdPC2','user','2025-03-22 14:26:15'),(6,'testeradmin1@example.com','$2b$10$AQNBh6PIfese55PLGRqTMuWYk1F9zAqxgLQAyX85omq7Z0Kv8J5Ru','admin','2025-03-22 14:26:47'),(7,'user@example.com','$2b$10$wsswCp.EKTJyA8y4s6DV4.nGGpjuTkH5YMhq/rvTezSCNu1ziqwpu','user','2025-03-22 14:37:20'),(8,'coordadmin@example.com','$2b$10$.lZ1s5U1aYAwBkSJxFfv.OvNwiFUtQBIioy2/MHxKhJ8tDd57CFaG','admin','2025-03-22 19:56:53'),(9,'jachicaiza@outlook.com','$2b$10$fm1tQdB5LELhhvP9D2IOpe0FuUVdKCF8zeObnCEAi7yZk/eqaYkTi','admin','2025-03-24 01:46:04'),(10,'superadmin@gmail.com','$2b$10$9.Ms.kNAC69tyT7lTDVV3u01rOjbYaaV3FcmJ3dwMh5IY1KuxT0Iy','logistics','2025-03-24 13:47:23'),(11,'admin@fusetheme.com','$2b$10$w0yMVqjQ1SuYxGpeSy1uku2Ydfz20HeDn0li8FFHm1xjd50YKhZfy','user','2025-03-24 13:47:41'),(12,'john.chicaiza.0583@miremington.edu.co','$2b$10$TUSRSyiKhfLzrOOlhr993u8.CFY1sVWQsGxCKzRDeOmgQv7DSbxtu','admin','2025-03-24 13:48:03'),(13,'jajaja@outl.com','$2b$10$yhNQyYWGUwAssSHAzowRBOHKtCkYVTEMIvekhNjtgG8VF6pKF4GDq','logistics','2025-03-24 19:21:30');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-25  8:09:19
