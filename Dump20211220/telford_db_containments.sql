CREATE DATABASE  IF NOT EXISTS `telford_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `telford_db`;
-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: telford_db
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `containments`
--

DROP TABLE IF EXISTS `containments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `containments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actions` text,
  `responsible` varchar(45) DEFAULT NULL,
  `when` varchar(255) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `analysis_tbl_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `containments`
--

LOCK TABLES `containments` WRITE;
/*!40000 ALTER TABLE `containments` DISABLE KEYS */;
INSERT INTO `containments` VALUES (1,'Check unit for load if with same defect attribute','R. Brutas','11/24/21','Done',6,'2021-11-24 09:52:44','2021-11-24 17:52:44'),(2,'testing','testing','testing','testing',17,'2021-11-24 09:55:43','2021-11-24 17:55:43'),(3,'CHECK THE REJECTED UNITS AT VISION','JB','12/17/21','DONE/INVALID',33,'2021-12-17 02:10:30','2021-12-17 10:10:30'),(4,'CHECK REJECTED UNITS AT VISION ','JB','12/17/21','DONE',35,'2021-12-17 02:29:11','2021-12-17 10:29:11'),(5,'n/a','n/a','n/a','n/a',40,'2021-12-17 02:50:37','2021-12-17 10:50:37'),(6,'Tighten inspection on mark.','FVI','12/17/21','Open',57,'2021-12-17 06:19:24','2021-12-17 14:19:24'),(7,'TIGHTEN INSPECTION ON MARK','FVI','12/17/21','OPEN',49,'2021-12-17 06:36:28','2021-12-17 14:36:28'),(8,'N/A','N/A','N/A','N/A',32,'2021-12-17 07:06:47','2021-12-17 15:06:47'),(9,'N/A','N/A','N/A','N/A',34,'2021-12-17 07:08:37','2021-12-17 15:08:37'),(10,'PERFORM 100% INSPECTION','LARA','12/17/21','DONE',38,'2021-12-17 07:15:45','2021-12-17 21:19:52'),(11,'N/A','N/A','N/A','N/A',41,'2021-12-17 07:20:42','2021-12-17 15:20:42'),(12,'N/A','N/A','N/A','N/A',59,'2021-12-17 07:23:49','2021-12-17 15:23:49'),(13,'Check the rejected unit at vision.','JB','12172021','Done',29,'2021-12-17 07:24:47','2021-12-17 15:24:47'),(14,'N/A','N/A','N/A','N/A',31,'2021-12-17 07:29:54','2021-12-17 15:29:54'),(15,'N/A','N/A','N/A','N/A',44,'2021-12-17 07:30:16','2021-12-17 15:30:16'),(16,'N/A','N/A','N/A','N/A',30,'2021-12-17 07:32:49','2021-12-17 15:32:49'),(17,'N/A','N/A','N/A','N/A',45,'2021-12-17 07:32:53','2021-12-17 15:32:53'),(18,'100% inspection prior move to next station.','14048','12172021','Done',46,'2021-12-17 07:37:41','2021-12-17 15:37:41'),(19,'N/A','N/A','N/A','N/A',27,'2021-12-17 07:50:43','2021-12-17 15:50:43'),(20,'Follow Rework Procedure.100% re inspection to FVI','13502','12/17/2021','done',39,'2021-12-17 08:33:41','2021-12-17 16:33:41'),(21,'n/a','n/a','n/a','n/a',42,'2021-12-17 08:35:18','2021-12-17 16:35:18'),(22,'Follow Rework Procedure','13502','12/17/2021','done',48,'2021-12-17 09:00:51','2021-12-17 17:00:51'),(23,'Tighten inspection on mark. Done 100% FVI inspection.','11421','12172021','Done',50,'2021-12-17 09:56:11','2021-12-17 17:56:11'),(24,'n/a','n/a','n/a','n/a',43,'2021-12-17 10:02:24','2021-12-17 18:02:24'),(25,'N/A','N/A','N/A','N/A',64,'2021-12-17 10:05:54','2021-12-17 18:05:54'),(26,'contain lots processed by the involved inspector','r. catulay','121721','done',26,'2021-12-17 10:09:27','2021-12-17 18:09:27'),(27,'yield off the missing units','13502','12/17/21','done',60,'2021-12-17 10:21:13','2021-12-18 16:24:43'),(28,'N/A','N/A','N/A','N/A',63,'2021-12-17 10:27:15','2021-12-17 18:27:15'),(29,'N/A','N/A','N/A','N/A',37,'2021-12-17 10:44:51','2021-12-17 18:44:51'),(30,'Contain all available sublots at Backend.','Rhona Bautista','12/17/21','Done',93,'2021-12-17 19:03:38','2021-12-18 03:03:38'),(31,'SEARCH THE MISSING UNITSRESULT:NO UNITS FOUNDLOT FOR 100% INSPECTION PRIOR MOVE TO NEXT STATION','Obsioma, Carla D.','12-16-21','DONE',61,'2021-12-17 19:27:53','2021-12-18 03:27:53'),(32,'with issuance of QDN #21-45241','Operator','12/17/2021','Done',47,'2021-12-17 22:31:37','2021-12-18 06:31:37'),(33,'PERFORM 100% INSPECTION ON ALL AFFECTED REEL','15111','12/19/2021','',157,'2021-12-19 01:45:04','2021-12-19 09:45:04');
/*!40000 ALTER TABLE `containments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-20 15:09:23
