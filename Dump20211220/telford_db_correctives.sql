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
-- Table structure for table `correctives`
--

DROP TABLE IF EXISTS `correctives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `correctives` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actions` text,
  `responsible` varchar(45) DEFAULT NULL,
  `when` varchar(255) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `analysis_tbl_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_containments_analysis_tbl1_idx` (`analysis_tbl_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `correctives`
--

LOCK TABLES `correctives` WRITE;
/*!40000 ALTER TABLE `correctives` DISABLE KEYS */;
INSERT INTO `correctives` VALUES (1,'N/A','N/A','N/A','N/A',6,'2021-11-24 09:52:44','2021-11-24 17:52:44'),(2,'CALL PE TO REVERT BACK PARAMETERTIGHTEN INSPECTION FOCUSING ON MARK','15135','12/17/21','Done',33,'2021-12-17 02:10:30','2021-12-17 17:45:00'),(3,'tighten inspection focusing on mark','13339','12/17/21','Done',35,'2021-12-17 02:29:11','2021-12-17 18:01:27'),(4,'N/A','N/A','N/A','N/A',57,'2021-12-17 06:19:24','2021-12-17 14:19:24'),(5,'N/A','N/A','N/A','N/A',49,'2021-12-17 06:36:28','2021-12-17 14:36:28'),(6,'RESET-UP TAPING MODULE','1213','12/17/21','DONE',32,'2021-12-17 07:06:47','2021-12-17 15:06:47'),(7,'ADJUST INPUT FLIPPER HEIGHT','1213','12/17/21','DONE',34,'2021-12-17 07:08:37','2021-12-17 15:08:37'),(8,'FINETUNE PP3 MODULE,ADJUST VACUUM SETTINGS(PURGE AND VACUUM SENSITIVITY VALUE)','DARWIN','12/17/21','DONE',38,'2021-12-17 07:15:45','2021-12-17 15:15:45'),(9,'ENSURE PROPER RETEACHED AND ALIGNMENT OF PRECISOR TO TRACK.','1003','12/17/21','DONE',41,'2021-12-17 07:20:42','2021-12-17 15:52:19'),(10,'ENSURE PROPER ALIGNMENT OF CARRIER TAPE TO EMPTY POCKET SENSOR 1.','1003','12/17/21','DONE',59,'2021-12-17 07:23:49','2021-12-17 15:23:49'),(11,'Call PE to revert back parameter.','13347','12172021','Done',29,'2021-12-17 07:24:47','2021-12-17 15:24:47'),(12,'N/A','N/A','N/A','N/A',31,'2021-12-17 07:29:54','2021-12-17 15:29:54'),(13,'N/A','N/A','N/A','N/A',44,'2021-12-17 07:30:16','2021-12-17 15:30:16'),(14,'N/A','N/A','N/A','N/A',30,'2021-12-17 07:32:49','2021-12-17 15:32:49'),(15,'aligned output assy/aligned sing3 roller,adjusted roller height','11373','12/17/21','done',45,'2021-12-17 07:32:53','2021-12-17 15:32:53'),(16,'Revert back.','JB','12172021','Done',46,'2021-12-17 07:37:41','2021-12-17 15:37:41'),(17,'N/A','N/A','N/A','N/A',27,'2021-12-17 07:50:43','2021-12-17 15:50:43'),(18,'ENSURED TIGHTEN PROPER LOCK SCREW OF FRONT AND REAR SEALING ASSEMBLY','1051/LIPTAC','12/17/21','DONE',39,'2021-12-17 08:04:14','2021-12-17 16:04:14'),(19,'ENSURED TIGHTEN PROPER LOCK SCREW OF OUTPUT TUBE ASSEMBLY AND SING. 3 ASSEMBLY AND SENSOR','1051','12/17/21','DONE',42,'2021-12-17 08:06:37','2021-12-17 16:06:37'),(20,'Ensured that the carrier tape home sensor is properly aligned','1058','12/17/21','Done',48,'2021-12-17 08:09:06','2021-12-17 16:09:06'),(21,'Revert back once done. ','B. Agdon','12172021','Done',40,'2021-12-17 08:24:33','2021-12-17 16:24:33'),(22,'insure proper aligned in-put tube entrance and finetune air jet presure at in-put track','irvin','12/17/21','done',60,'2021-12-17 09:06:46','2021-12-17 17:06:46'),(23,'Revert back after processing.','Keith','12172021','Done',50,'2021-12-17 09:56:11','2021-12-17 17:56:11'),(24,'highlight issue to ADGT','1202','121721','done',43,'2021-12-17 10:02:24','2021-12-17 18:02:24'),(25,'N/A','N/A','N/A','N/A',64,'2021-12-17 10:06:42','2021-12-17 18:06:42'),(26,'counsel involved inspector regarding her issuediscuss to all PDIP inspector to be vigilant during inspection especially where lots undergone manual activity ','monanancy','121721','done',26,'2021-12-17 10:09:27','2021-12-17 18:09:27'),(27,'Ensure that taper module is properly aligned.','10846','12172021','Done',63,'2021-12-17 10:27:15','2021-12-17 18:27:15'),(28,'N/A','N/A','N/A','N/A',37,'2021-12-17 10:44:51','2021-12-17 18:44:51'),(29,'Highlight issue to ADGT PE for proper corrective action.','Wimsey Baybay','12/18/21','Done',93,'2021-12-17 19:03:38','2021-12-18 03:03:38'),(30,'ENSURE THAT OUTPUT ASSEMBLY ALIGNED AND TIGHTEN','Mercado, Ariel D.','12-17-21','DONE',61,'2021-12-17 19:03:42','2021-12-18 03:30:04'),(31,'TIGHTEN INPUT ENTRANCE SENSOR LOCK SCREW','1060','12.18','DONE',47,'2021-12-17 22:26:31','2021-12-18 06:26:31');
/*!40000 ALTER TABLE `correctives` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-20 15:09:25
