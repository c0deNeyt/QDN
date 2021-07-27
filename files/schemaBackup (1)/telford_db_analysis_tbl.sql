-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: telford_db
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

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
-- Table structure for table `analysis_tbl`
--

DROP TABLE IF EXISTS `analysis_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analysis_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `qdnNo` varchar(45) DEFAULT NULL,
  `issuedBy` varchar(255) DEFAULT NULL,
  `issuedByName` varchar(255) DEFAULT NULL,
  `issuedByTeam` varchar(45) DEFAULT NULL,
  `issuedTo` varchar(255) DEFAULT NULL,
  `issuedToName` varchar(255) DEFAULT NULL,
  `issuedToTeam` varchar(45) DEFAULT NULL,
  `customer` varchar(45) DEFAULT NULL,
  `packageType` varchar(255) DEFAULT NULL,
  `machine` varchar(45) DEFAULT NULL,
  `deviceName` varchar(45) DEFAULT NULL,
  `station` varchar(45) DEFAULT NULL,
  `lotId` varchar(255) DEFAULT NULL,
  `teamResp` varchar(255) DEFAULT NULL,
  `dateTime` varchar(255) DEFAULT NULL,
  `classification` varchar(45) DEFAULT NULL,
  `defects` text,
  `failure_mode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analysis_tbl`
--

LOCK TABLES `analysis_tbl` WRITE;
/*!40000 ALTER TABLE `analysis_tbl` DISABLE KEYS */;
INSERT INTO `analysis_tbl` VALUES (1,'T41621-1','12856','Matriano, Rosemarie N.','A','1111','Araña, Christian R.','A','N/A','N/A','N/A','Test','MIS','235256','MIS','April 16, 2021 7:51:47  PM','Major','This is test','Machine'),(5,'T42121-2','1133','Reyes, Ryan A.','A','1119','Torrefiel, Jay ar V.','A','ADLT','test_hidiL','873465','AD5412AREZ-REEL7','MIS','123123','MIS','April 21, 2021 4:48:56  PM','Major','sdfasdfasd!','Machine'),(6,'T42121-3','553','Lobo, Romualdie M.','NORMAL','297','Pasco, Erwin R.','NORMAL','ADLT','RN_24L','01AT468','AD5412AREZ-REEL7','Quality Assurance','23425','Quality Assurance','April 21, 2021 8:43:48  PM','Major','This is test nanaman','Material'),(7,'T42121-4','1115','Muñoz, Francis Ian L.','A','16','Solitas, Jucaronel D.','B','ADGT','N/A_16L','n/a','ADP5310AREZN-3^3R7','MIS','23425','MIS','April 21, 2021 8:45:51  PM','Minor','Minora lang natin yan','Machine');
/*!40000 ALTER TABLE `analysis_tbl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-25 23:07:28
