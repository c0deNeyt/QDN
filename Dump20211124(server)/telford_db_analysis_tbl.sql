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
-- Table structure for table `analysis_tbl`
--

DROP TABLE IF EXISTS `analysis_tbl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analysis_tbl` (
  `id` int NOT NULL AUTO_INCREMENT,
  `qdnNo` varchar(45) NOT NULL,
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
  `disposition` varchar(45) DEFAULT NULL,
  `cause_of_defects` varchar(45) DEFAULT NULL,
  `cause_of_defects_des` text,
  `status` int DEFAULT '0',
  `prod_auth_col` varchar(255) DEFAULT NULL,
  `ee_auth_col` varchar(255) DEFAULT NULL,
  `pe_auth_col` varchar(255) DEFAULT NULL,
  `qa_auth_col` varchar(255) DEFAULT NULL,
  `others_auth_col` varchar(255) DEFAULT NULL,
  `status_resp` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`qdnNo`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `qdnNo_UNIQUE` (`qdnNo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analysis_tbl`
--

LOCK TABLES `analysis_tbl` WRITE;
/*!40000 ALTER TABLE `analysis_tbl` DISABLE KEYS */;
INSERT INTO `analysis_tbl` VALUES (1,'T11921-1','13506','Diño, Leslie-Ann B.','N','14768','Montolo, Lorena D.','','N/A','N/A_L','N/A','N/A','Process Engineering','N/A','Production / Non - TNR','November 9, 2021 10:38:28  AM','Minor','Failed on Attribute Repeatability and Reproducibility(AR&R)certification','undefined','undefined','Others','Failed on Attribute Repeatability and Reproducibility(AR&R)certification',0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-09 02:43:58','2021-11-09 10:45:26'),(2,'T111021-1','1261','Diño, Lucila M.','B','1261','Diño, Lucila M.','B','ADLT','MSOP_L','18G6L','ltc1727ems82^5#TRPBF','Production','At76344.12','Production','November 10, 2021 3:54:2  PM','Minor','Testing only',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-10 07:54:04','2021-11-10 15:54:04'),(3,'T111021-2','12323','Lubugan, Adelaide A.','N','12323','Lubugan, Adelaide A.','N','ADLT','MSOP_20L','28g6l','LTC2952CF#PBF','Production','av22299.9','Production','November 10, 2021 4:06:51  PM','Minor','Testing only','Machine','USE AS IS','Maintenance','vision escapee',1,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-10 08:07:38','2021-11-10 17:46:48'),(4,'T111021-3','1170','Austria, Realyn M.','N','25','Derilo, Irish B.','B','ADLT','MSOP_L','28G6L','LT8609AIMSE#3ZZPBF','Production','AV19597.9','Production','November 10, 2021 5:41:10  PM','Minor','CAN\'T CREATE REEL REQUIREMENT DUE TO MAXIMUM STANDOFF','Material','REWORK','Others','VALID REJECTS DUE TO MAXIMUM STANDOFF ',1,NULL,'Cahigan, Arman S.',NULL,NULL,NULL,NULL,'2021-11-10 09:41:58','2021-11-23 14:51:53'),(5,'T111721-1','12323','Lubugan, Adelaide A.','N','12323','Lubugan, Adelaide A.','N','ADLT','MSOP_L','25g6','LT1616IMS#PBF','Production','AV97602.31','Production','November 17, 2021 12:20:13  PM','Minor','TESTING ONLY',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-17 04:20:25','2021-11-17 12:20:25'),(6,'T111821-1','10320','Riva, Glenda Lyn A.','A','12649','Bohol, Marian N.','B','ADGT','LFCSP_16L','04HSI','ADG1634BCPZ-REEL7','RFC','AV26143.10','Production - RFC','November 18, 2021 2:50:56  PM','Minor','wrong transaction',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-18 06:51:11','2021-11-18 14:51:11'),(7,'T112221-1','14316','Brillantes, Sherry Doll D.','A','480','Flores, Row - Leen P.','A','ADGT','SOT_6L','02HSI','ADR3430ARJZ-R7','RFC','av25913.4','Equipment Engineering','November 22, 2021 9:53:56  AM','Minor','Mark over rejection',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 01:54:25','2021-11-22 09:54:25'),(8,'T112221-2','14986','Mayor, Cyril A.','A','887','Patam, Ray An E.','A','ADLT','10L RM_L','27g6l','ltc2852mpms#pbf','TnR','SH62898.1','Equipment Engineering','November 22, 2021 10:29:49  AM','Minor','MISSING UNITS - 5',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 02:30:18','2021-11-22 10:30:18'),(9,'T112221-3','14358','Amparo, Diane ','A','1231','Pejana, Frederick C.','A','ADGT','8L SOT_L','02V12','ADG619BRTZ-REEL7','RFC','AV25660.9','Equipment Engineering','November 22, 2021 10:41:23  AM','Minor','MARK OVER REJECTION',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 02:41:52','2021-11-22 10:41:52'),(10,'T112221-4','15106','Balili, Rhea S.','A','1060','Vallejos, Aizon Jay B.','C','ADLT','8L RN_8L','29G6L','LT1763CS8#TRPBF','TnR','AV26533.6','Equipment Engineering','November 22, 2021 10:44:24  AM','Minor','MINIMAL HAIRLINE',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 02:44:53','2021-11-22 10:44:53'),(11,'T112221-5','14243','Lorente, Margie M.','A','1231','Pejana, Frederick C.','A','ADGT','32 LFCSP_L','03G7','ADUCM331WFSBCPZ-RL','RFC','AV26533.6','Equipment Engineering','November 22, 2021 10:47:47  AM','Minor','ORIENTATION OVER REJECTION',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 02:48:16','2021-11-22 10:48:16'),(12,'T112221-6','14358','Amparo, Diane ','A','1081','Balao, Jimbo N.','A','ADGT','8L SOT_L','02V12','ADG619BRTZ-REEL7','RFC','AV25660.9','Equipment Engineering','November 22, 2021 10:53:46  AM','Minor','UNIT JAM AT TAPE',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 02:54:15','2021-11-22 10:54:15'),(13,'T112221-7','15102','Amparo, Zuzette Andrea B.','A','1280','Pedrosa, Geralyn S.','A','ADLT','8L DFN_8L','22HSI250','LT3505EDD#PBF','TnR','AV28551.7','Process Engineering','November 22, 2021 11:05:35  AM','Minor','MULTIPLE ASSY LOT',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 03:06:04','2021-11-22 11:06:04'),(14,'T112221-8','15102','Amparo, Zuzette Andrea B.','A','1280','Pedrosa, Geralyn S.','A','ADLT','8L DFN_8L','22hsi 250','LT3505EDD#PBF','TnR','AV28551.7','Process Engineering','November 22, 2021 11:21:10  AM','Minor','MULTIPLE ASSY LOT',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 03:21:39','2021-11-22 11:21:39'),(15,'T112221-9','13336','Diaz, Melgilyn S.','A','1096','Bachanicha, Ronnie P.','A','ADLT','16L RU_L','37g6l','LT8316EFE#PBF','TnR','AV25626.11','Equipment Engineering','November 22, 2021 2:28:26  PM','Minor','MARK OVER REJECTION',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 06:28:55','2021-11-22 14:28:55'),(16,'T112221-10','751','Ungson, Leila B.','N','1111','Araña, Christian R.','N','ADLT','RU_16L','29AT128    ','AD7923BRUZ-REEL','MIS','920834','MIS','November 22, 2021 3:24:42  PM','Major','Attendance...',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 07:24:42','2021-11-22 15:24:42'),(17,'T112221-11','14036','Dogelio, Lovelyn G.','A','30220','Sarmiento, Ronnell B.','A','ADLT','28L LQFN_L','05TR2000','LT8638SJV#WPBF','TnR','AV24890.12','Equipment Engineering','November 22, 2021 3:33:51  PM','Minor','1 MISSING UNIT',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-22 07:34:21','2021-11-22 15:34:21'),(18,'T112321-1','1111','Araña, Christian R.','N','14814','Alfonso, Bea Mari M.','A','ADLT','RN_5L','02AT468','LT1716CS5#TRMPBF','MIS','2093803284','Production','November 23, 2021 11:13:57  AM','Minor','This is a sample issuance conducted by MIS Team.. Kindly give us a feedback if you received an Email.. ',NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2021-11-23 03:13:58','2021-11-23 11:13:58');
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

-- Dump completed on 2021-11-24 15:52:46
