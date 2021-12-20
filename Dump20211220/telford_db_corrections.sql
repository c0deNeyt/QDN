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
-- Table structure for table `corrections`
--

DROP TABLE IF EXISTS `corrections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `corrections` (
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corrections`
--

LOCK TABLES `corrections` WRITE;
/*!40000 ALTER TABLE `corrections` DISABLE KEYS */;
INSERT INTO `corrections` VALUES (1,'Optimize light set and adjust pad parameter to compensate pad width failure','R. Brutas','11/24/21','Done',6,'2021-11-24 09:52:44','2021-11-24 17:52:44'),(2,'MARK SCORE ADJUSTMENT(75 TO 60)','JB','12/17/21','DONE',33,'2021-12-17 02:10:30','2021-12-17 10:10:30'),(3,'MARK SCORE ADJUSTMENT(75-60)','jb','12/17/21','done',35,'2021-12-17 02:29:11','2021-12-17 10:29:11'),(4,'Temporary add extra mark template','B. Agdon','12172021','Done',40,'2021-12-17 02:50:37','2021-12-17 10:50:37'),(5,'Adjust mark score from 75 to 40.Add extra template.','Keith','12/17/21','Done',57,'2021-12-17 06:19:24','2021-12-17 14:19:24'),(6,'ADD EXTRA TEMPLATE. REVERT BACK AFTER LOT PROCESSING.','KEITH','12/17/21','DONE',49,'2021-12-17 06:36:28','2021-12-17 14:36:28'),(7,'ALIGNED SEALING SHOE ASSEMBLY','1213','12/17/21','DONE',32,'2021-12-17 07:06:47','2021-12-17 15:06:47'),(8,'ALIGNED INPUT TUBE ENTRANCE','1213','12/17/21','DONE',34,'2021-12-17 07:08:37','2021-12-17 15:08:37'),(9,'TEACHED PP3 TRAY PICKING AND TAPE PLACING POSITION','DARWIN','12/17/21','DONE',38,'2021-12-17 07:15:45','2021-12-17 15:15:45'),(10,'RETEACHED PRECISOR CLOSE AND OPEN POSITION','1003','12/17/21','DONE',41,'2021-12-17 07:20:42','2021-12-17 15:20:42'),(11,'ALIGN CARRIER TAPE TO EMPTY POCKET SENSOR 1, ADJUST CARRIER TAPE REEL TENSION','1003','12/17/21','DONE',59,'2021-12-17 07:23:49','2021-12-17 15:23:49'),(12,'Mark score adjustment 75 to 60','JB','12172021','Done',29,'2021-12-17 07:24:47','2021-12-17 15:24:47'),(13,'N/A','N/A','N/A','N/A',31,'2021-12-17 07:29:54','2021-12-17 15:29:54'),(14,'ADJUSTED LIGHT SETTINGS','11373','12/17/21','DONE',44,'2021-12-17 07:30:16','2021-12-17 15:30:16'),(15,'N/A ','N/A','N/A','N/A',30,'2021-12-17 07:32:49','2021-12-17 15:32:49'),(16,'PROPER ALIGNMENT OF OUTPUT ASSY AND SING3 ROLLER','11373','12/17/21','done',45,'2021-12-17 07:32:53','2021-12-17 15:32:53'),(17,'Altered mark parameter. IP 50 to 30. IT 50 to 30. Call the attention of PE to revert back the parameter setting.','JB','','Done',46,'2021-12-17 07:37:41','2021-12-17 15:37:41'),(18,'N/A ','N/A','N/A','N/A',27,'2021-12-17 07:50:43','2021-12-17 15:50:43'),(19,'ALIGNED FRONT AND REAR SEALING ASSEMBLY','1051/LIPTAC','12/17/21','DONE',39,'2021-12-17 08:04:14','2021-12-17 16:04:14'),(20,'RE-ALIGNED OUTPUT TUBE ASSEMBLY AND SING. 3 ASSEMBLY','1051','12/17/21','DONE',42,'2021-12-17 08:06:37','2021-12-17 16:06:37'),(21,'Realigned carrier tape home sensor assembly','1058','12/17/21','Done',48,'2021-12-17 08:09:06','2021-12-17 16:09:06'),(22,'alinged in-put tube entrance and adjust air jet presure at in-put track','irvin','12/17/21','done',60,'2021-12-17 09:06:46','2021-12-17 17:06:46'),(23,'Adjust mark score from 70 to 50.','Keith','12172021','Done',50,'2021-12-17 09:56:11','2021-12-17 17:56:11'),(24,'ØSplit good parts and endorse to PPC to\ncoordinate with ADGT Subcon/Planner if lot can be ship as odd reel while\nrejected parts are for Scrap.','joan layba','121721','done',43,'2021-12-17 10:02:24','2021-12-17 18:02:24'),(25,'Temporary set mark score from 75 to 60. Revert back once done.','B. Agdon','12172021','Done',64,'2021-12-17 10:05:54','2021-12-17 18:05:54'),(26,'Done 100% FVI inspection.','11421','12172021','Done',64,'2021-12-17 10:06:42','2021-12-17 18:06:42'),(27,'follow proper rework procedureperform 100% re-inspect on the lot','fvi','121721','done',26,'2021-12-17 10:09:27','2021-12-17 18:09:27'),(28,'Adjust taper module.','10846','12172021','Done',63,'2021-12-17 10:27:15','2021-12-17 18:27:15'),(29,'N/A ','N/A','N/A','N/A',37,'2021-12-17 10:44:51','2021-12-17 18:44:51'),(30,'Follow proper rework procedure.','Rhea Ganancia','12/17/21','Done',93,'2021-12-17 19:03:38','2021-12-18 03:03:38'),(31,'ALIGNED OUTPUT TUBE ENTRANCE/ALIGNED OUTPUT SHUTTLE HOME AND FORWARD POSITION','Mercado, Ariel ','12-17-21','DONE',61,'2021-12-17 19:03:42','2021-12-18 03:30:04'),(32,'Perform reinspection after rework.','Angela Aquino','12/18/21','Done',93,'2021-12-17 19:04:18','2021-12-18 03:04:18'),(33,'Split affected units and endorse to PE for safe keep','Rhea Ganancia','12/18/21','Done',93,'2021-12-17 19:04:58','2021-12-18 03:04:58'),(34,'ALIGN INPUT ENTRANCE SENSOR POSITION','1060','12.18','DONE',47,'2021-12-17 22:26:31','2021-12-18 06:28:03');
/*!40000 ALTER TABLE `corrections` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-20 15:09:29
