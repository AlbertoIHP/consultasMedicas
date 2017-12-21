-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: clinica
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Alergia`
--

DROP TABLE IF EXISTS `Alergia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Alergia` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Alergia`
--

LOCK TABLES `Alergia` WRITE;
/*!40000 ALTER TABLE `Alergia` DISABLE KEYS */;
INSERT INTO `Alergia` VALUES (1,'Alergía al polen',NULL,NULL,NULL,NULL),(2,'Alergía a los ácaros',NULL,NULL,NULL,NULL),(3,'Alergía al pelo de animales',NULL,NULL,NULL,NULL),(4,'Alergía a las picaduras de insectos',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Alergia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AlergiasComunesPaciente`
--

DROP TABLE IF EXISTS `AlergiasComunesPaciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AlergiasComunesPaciente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaDeteccion` date DEFAULT NULL,
  `Alergia_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alergiascomunespaciente_alergia_id_foreign` (`Alergia_id`),
  KEY `alergiascomunespaciente_paciente_id_foreign` (`Paciente_id`),
  CONSTRAINT `alergiascomunespaciente_alergia_id_foreign` FOREIGN KEY (`Alergia_id`) REFERENCES `Alergia` (`id`) ON DELETE CASCADE,
  CONSTRAINT `alergiascomunespaciente_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AlergiasComunesPaciente`
--

LOCK TABLES `AlergiasComunesPaciente` WRITE;
/*!40000 ALTER TABLE `AlergiasComunesPaciente` DISABLE KEYS */;
INSERT INTO `AlergiasComunesPaciente` VALUES (1,'1998-02-01',1,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `AlergiasComunesPaciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AlergiasMedicamentosPaciente`
--

DROP TABLE IF EXISTS `AlergiasMedicamentosPaciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AlergiasMedicamentosPaciente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaInicio` date DEFAULT NULL,
  `Medicamento_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `alergiasmedicamentospaciente_medicamento_id_foreign` (`Medicamento_id`),
  KEY `alergiasmedicamentospaciente_paciente_id_foreign` (`Paciente_id`),
  CONSTRAINT `alergiasmedicamentospaciente_medicamento_id_foreign` FOREIGN KEY (`Medicamento_id`) REFERENCES `Medicamento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `alergiasmedicamentospaciente_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AlergiasMedicamentosPaciente`
--

LOCK TABLES `AlergiasMedicamentosPaciente` WRITE;
/*!40000 ALTER TABLE `AlergiasMedicamentosPaciente` DISABLE KEYS */;
INSERT INTO `AlergiasMedicamentosPaciente` VALUES (1,'1998-02-01',2,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `AlergiasMedicamentosPaciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Atencion`
--

DROP TABLE IF EXISTS `Atencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Atencion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `calificacionAtencionMedica` int(11) NOT NULL,
  `BoxConsulta_id` int(10) unsigned DEFAULT NULL,
  `Cita_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `ExamenFisico_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `atencion_boxconsulta_id_foreign` (`BoxConsulta_id`),
  KEY `atencion_cita_id_foreign` (`Cita_id`),
  KEY `atencion_paciente_id_foreign` (`Paciente_id`),
  KEY `atencion_examenfisico_id_foreign` (`ExamenFisico_id`),
  CONSTRAINT `atencion_boxconsulta_id_foreign` FOREIGN KEY (`BoxConsulta_id`) REFERENCES `BoxConsulta` (`id`) ON DELETE CASCADE,
  CONSTRAINT `atencion_cita_id_foreign` FOREIGN KEY (`Cita_id`) REFERENCES `Cita` (`id`) ON DELETE CASCADE,
  CONSTRAINT `atencion_examenfisico_id_foreign` FOREIGN KEY (`ExamenFisico_id`) REFERENCES `ExamenFisico` (`id`) ON DELETE CASCADE,
  CONSTRAINT `atencion_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Atencion`
--

LOCK TABLES `Atencion` WRITE;
/*!40000 ALTER TABLE `Atencion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Atencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BoxConsulta`
--

DROP TABLE IF EXISTS `BoxConsulta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BoxConsulta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ubicacion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TipoBox_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `boxconsulta_tipobox_id_foreign` (`TipoBox_id`),
  CONSTRAINT `boxconsulta_tipobox_id_foreign` FOREIGN KEY (`TipoBox_id`) REFERENCES `Especialidad` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BoxConsulta`
--

LOCK TABLES `BoxConsulta` WRITE;
/*!40000 ALTER TABLE `BoxConsulta` DISABLE KEYS */;
/*!40000 ALTER TABLE `BoxConsulta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cita`
--

DROP TABLE IF EXISTS `Cita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cita` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fecha` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hora` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EstadoCita_id` int(10) unsigned DEFAULT NULL,
  `BoxConsulta_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `Medico_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cita_estadocita_id_foreign` (`EstadoCita_id`),
  KEY `cita_boxconsulta_id_foreign` (`BoxConsulta_id`),
  KEY `cita_paciente_id_foreign` (`Paciente_id`),
  KEY `cita_medico_id_foreign` (`Medico_id`),
  CONSTRAINT `cita_boxconsulta_id_foreign` FOREIGN KEY (`BoxConsulta_id`) REFERENCES `BoxConsulta` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cita_estadocita_id_foreign` FOREIGN KEY (`EstadoCita_id`) REFERENCES `EstadoCita` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cita_medico_id_foreign` FOREIGN KEY (`Medico_id`) REFERENCES `Medico` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cita_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cita`
--

LOCK TABLES `Cita` WRITE;
/*!40000 ALTER TABLE `Cita` DISABLE KEYS */;
/*!40000 ALTER TABLE `Cita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comuna`
--

DROP TABLE IF EXISTS `Comuna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comuna` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Provincia_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comuna_provincia_id_foreign` (`Provincia_id`),
  CONSTRAINT `comuna_provincia_id_foreign` FOREIGN KEY (`Provincia_id`) REFERENCES `Provincia` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=348 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comuna`
--

LOCK TABLES `Comuna` WRITE;
/*!40000 ALTER TABLE `Comuna` DISABLE KEYS */;
INSERT INTO `Comuna` VALUES (1,'Comuna de Arica',1,NULL,NULL,NULL,NULL),(2,'Comuna de Camarones',1,NULL,NULL,NULL,NULL),(3,'Comuna de General Lagos',2,NULL,NULL,NULL,NULL),(4,'Comuna de Putre',2,NULL,NULL,NULL,NULL),(5,'Comuna de Alto Hospicio',3,NULL,NULL,NULL,NULL),(6,'Comuna de Iquique',3,NULL,NULL,NULL,NULL),(7,'Comuna de Camiña',4,NULL,NULL,NULL,NULL),(8,'Comuna de Colchane',4,NULL,NULL,NULL,NULL),(9,'Comuna de Huara',4,NULL,NULL,NULL,NULL),(10,'Comuna de Pica',4,NULL,NULL,NULL,NULL),(11,'Comuna de Pozo Almonte',4,NULL,NULL,NULL,NULL),(12,'Comuna de María Elena',5,NULL,NULL,NULL,NULL),(13,'Comuna de Tocopilla',5,NULL,NULL,NULL,NULL),(14,'Comuna de Calama',6,NULL,NULL,NULL,NULL),(15,'Comuna de Ollague',6,NULL,NULL,NULL,NULL),(16,'Comuna de San Pedro de Atacama',6,NULL,NULL,NULL,NULL),(17,'Comuna de Antofagasta',7,NULL,NULL,NULL,NULL),(18,'Comuna de Mejillones',7,NULL,NULL,NULL,NULL),(19,'Comuna de Sierra Gorda',7,NULL,NULL,NULL,NULL),(20,'Comuna de Taltal',7,NULL,NULL,NULL,NULL),(21,'Comuna de Chañaral',8,NULL,NULL,NULL,NULL),(22,'Comuna de Diego de Almagro',8,NULL,NULL,NULL,NULL),(23,'Comuna de Copiapó',9,NULL,NULL,NULL,NULL),(24,'Comuna de Caldera',9,NULL,NULL,NULL,NULL),(25,'Comuna de Tierra Amarilla',9,NULL,NULL,NULL,NULL),(26,'Comuna de Vallenar',10,NULL,NULL,NULL,NULL),(27,'Comuna de Feirina',10,NULL,NULL,NULL,NULL),(28,'Comuna de Huasco',10,NULL,NULL,NULL,NULL),(29,'Comuna de Alto del Carmen',10,NULL,NULL,NULL,NULL),(30,'Comuna de La Serena',11,NULL,NULL,NULL,NULL),(31,'Comuna de Coquimbo',11,NULL,NULL,NULL,NULL),(32,'Comuna de Andacollo',11,NULL,NULL,NULL,NULL),(33,'Comuna de La Higuera',11,NULL,NULL,NULL,NULL),(34,'Comuna de Paihuano',11,NULL,NULL,NULL,NULL),(35,'Comuna de Vicuña',11,NULL,NULL,NULL,NULL),(36,'Comuna de Ovalle',12,NULL,NULL,NULL,NULL),(37,'Comuna de Combarbalá',12,NULL,NULL,NULL,NULL),(38,'Comuna de Monte Patria',12,NULL,NULL,NULL,NULL),(39,'Comuna de Punitaqui',12,NULL,NULL,NULL,NULL),(40,'Comuna de Rio Hurtado',12,NULL,NULL,NULL,NULL),(41,'Comuna de Illapel',13,NULL,NULL,NULL,NULL),(42,'Comuna de Canela',13,NULL,NULL,NULL,NULL),(43,'Comuna de Los Vilos',13,NULL,NULL,NULL,NULL),(44,'Comuna de Salamanca',13,NULL,NULL,NULL,NULL),(45,'Comuna de La Ligua',14,NULL,NULL,NULL,NULL),(46,'Comuna de Cabildo',14,NULL,NULL,NULL,NULL),(47,'Comuna de Zapallar',14,NULL,NULL,NULL,NULL),(48,'Comuna de Papudo',14,NULL,NULL,NULL,NULL),(49,'Comuna de Petorca',14,NULL,NULL,NULL,NULL),(50,'Comuna de Los Andes',15,NULL,NULL,NULL,NULL),(51,'Comuna de San Esteban',15,NULL,NULL,NULL,NULL),(52,'Comuna de Calle Larga',15,NULL,NULL,NULL,NULL),(53,'Comuna de Rinconada',15,NULL,NULL,NULL,NULL),(54,'Comuna de San Felipe ',16,NULL,NULL,NULL,NULL),(55,'Comuna de Llaillay ',16,NULL,NULL,NULL,NULL),(56,'Comuna de Putaendo ',16,NULL,NULL,NULL,NULL),(57,'Comuna de Santa María ',16,NULL,NULL,NULL,NULL),(58,'Comuna de Catemu ',16,NULL,NULL,NULL,NULL),(59,'Comuna de Panquehue ',16,NULL,NULL,NULL,NULL),(60,'Comuna de Quillota ',17,NULL,NULL,NULL,NULL),(61,'Comuna de La Cruz ',17,NULL,NULL,NULL,NULL),(62,'Comuna de La Calera ',17,NULL,NULL,NULL,NULL),(63,'Comuna de Nogales ',17,NULL,NULL,NULL,NULL),(64,'Comuna de Hijuelas ',17,NULL,NULL,NULL,NULL),(65,'Comuna de Valparaíso ',18,NULL,NULL,NULL,NULL),(66,'Comuna de Viña del Mar ',18,NULL,NULL,NULL,NULL),(67,'Comuna de Concón ',18,NULL,NULL,NULL,NULL),(68,'Comuna de Quintero ',18,NULL,NULL,NULL,NULL),(69,'Comuna de Puchuncaví ',18,NULL,NULL,NULL,NULL),(70,'Comuna de Casablanca ',18,NULL,NULL,NULL,NULL),(71,'Comuna de Juan Fernández ',18,NULL,NULL,NULL,NULL),(72,'Comuna de San Antonio ',19,NULL,NULL,NULL,NULL),(73,'Comuna de Cartagena ',19,NULL,NULL,NULL,NULL),(74,'Comuna de El Tabo ',19,NULL,NULL,NULL,NULL),(75,'Comuna de El Quisco ',19,NULL,NULL,NULL,NULL),(76,'Comuna de Algarrobo ',19,NULL,NULL,NULL,NULL),(77,'Comuna de Santo Domingo ',19,NULL,NULL,NULL,NULL),(78,'Comuna de Isla de Pascua ',20,NULL,NULL,NULL,NULL),(79,'Comuna de Quilpué ',21,NULL,NULL,NULL,NULL),(80,'Comuna de Limache ',21,NULL,NULL,NULL,NULL),(81,'Comuna de Olmué ',21,NULL,NULL,NULL,NULL),(82,'Comuna de Villa Alemana ',21,NULL,NULL,NULL,NULL),(83,'Comuna de Colina ',22,NULL,NULL,NULL,NULL),(84,'Comuna de Lampa ',22,NULL,NULL,NULL,NULL),(85,'Comuna de Tiltil ',22,NULL,NULL,NULL,NULL),(86,'Comuna de Santiago Centro ',23,NULL,NULL,NULL,NULL),(87,'Comuna de Vitacura ',23,NULL,NULL,NULL,NULL),(88,'Comuna de San Ramón ',23,NULL,NULL,NULL,NULL),(89,'Comuna de San Miguel ',23,NULL,NULL,NULL,NULL),(90,'Comuna de San Joaquín ',23,NULL,NULL,NULL,NULL),(91,'Comuna de Renca ',23,NULL,NULL,NULL,NULL),(92,'Comuna de Recoleta ',23,NULL,NULL,NULL,NULL),(93,'Comuna de Quinta Normal ',23,NULL,NULL,NULL,NULL),(94,'Comuna de Quilicura ',23,NULL,NULL,NULL,NULL),(95,'Comuna de Pudahuel ',23,NULL,NULL,NULL,NULL),(96,'Comuna de Providencia ',23,NULL,NULL,NULL,NULL),(97,'Comuna de Peñalolén ',23,NULL,NULL,NULL,NULL),(98,'Comuna de Pedro Aguirre Cerda ',23,NULL,NULL,NULL,NULL),(99,'Comuna de Ñuñoa ',23,NULL,NULL,NULL,NULL),(100,'Comuna de Maipú ',23,NULL,NULL,NULL,NULL),(101,'Comuna de Macul ',23,NULL,NULL,NULL,NULL),(102,'Comuna de Lo Prado ',23,NULL,NULL,NULL,NULL),(103,'Comuna de Lo Espejo ',23,NULL,NULL,NULL,NULL),(104,'Comuna de Lo Barnchea ',23,NULL,NULL,NULL,NULL),(105,'Comuna de Las Condes ',23,NULL,NULL,NULL,NULL),(106,'Comuna de La Reina ',23,NULL,NULL,NULL,NULL),(107,'Comuna de La Pintana ',23,NULL,NULL,NULL,NULL),(108,'Comuna de La Granja ',23,NULL,NULL,NULL,NULL),(109,'Comuna de La Florida ',23,NULL,NULL,NULL,NULL),(110,'Comuna de La Cisterna ',23,NULL,NULL,NULL,NULL),(111,'Comuna de Independencia ',23,NULL,NULL,NULL,NULL),(112,'Comuna de Huechuraba ',23,NULL,NULL,NULL,NULL),(113,'Comuna de Estación Central ',23,NULL,NULL,NULL,NULL),(114,'Comuna de El Bosque ',23,NULL,NULL,NULL,NULL),(115,'Comuna de Conchalí ',23,NULL,NULL,NULL,NULL),(116,'Comuna de Cerro Navia ',23,NULL,NULL,NULL,NULL),(117,'Comuna de Cerrillos ',23,NULL,NULL,NULL,NULL),(118,'Comuna de Puente Alto ',24,NULL,NULL,NULL,NULL),(119,'Comuna de San José de Maipo ',24,NULL,NULL,NULL,NULL),(120,'Comuna de Pirque ',24,NULL,NULL,NULL,NULL),(121,'Comuna de San Bernardo ',25,NULL,NULL,NULL,NULL),(122,'Comuna de Buin ',25,NULL,NULL,NULL,NULL),(123,'Comuna de Paine ',25,NULL,NULL,NULL,NULL),(124,'Comuna de Calera de Tango ',25,NULL,NULL,NULL,NULL),(125,'Comuna de Melipilla ',26,NULL,NULL,NULL,NULL),(126,'Comuna de Alhué ',26,NULL,NULL,NULL,NULL),(127,'Comuna de Curacaví ',26,NULL,NULL,NULL,NULL),(128,'Comuna de Maria Pinto ',26,NULL,NULL,NULL,NULL),(129,'Comuna de San Pedro ',26,NULL,NULL,NULL,NULL),(130,'Comuna de Isla de Maipo ',27,NULL,NULL,NULL,NULL),(131,'Comuna de El Monte ',27,NULL,NULL,NULL,NULL),(132,'Comuna de Padre Hurtado ',27,NULL,NULL,NULL,NULL),(133,'Comuna de Peñaflor ',27,NULL,NULL,NULL,NULL),(134,'Comuna de Talagante ',27,NULL,NULL,NULL,NULL),(135,'Comuna de Codegua ',28,NULL,NULL,NULL,NULL),(136,'Comuna de Machalí ',28,NULL,NULL,NULL,NULL),(137,'Comuna de Rancagua ',28,NULL,NULL,NULL,NULL),(138,'Comuna de Coinco ',28,NULL,NULL,NULL,NULL),(139,'Comuna de Malloa ',28,NULL,NULL,NULL,NULL),(140,'Comuna de Requínoa ',28,NULL,NULL,NULL,NULL),(141,'Comuna de Coltauco ',28,NULL,NULL,NULL,NULL),(142,'Comuna de Olivar ',28,NULL,NULL,NULL,NULL),(143,'Comuna de Rengo ',28,NULL,NULL,NULL,NULL),(144,'Comuna de Doñihue ',28,NULL,NULL,NULL,NULL),(145,'Comuna de Peumo ',28,NULL,NULL,NULL,NULL),(146,'Comuna de Mostazal ',28,NULL,NULL,NULL,NULL),(147,'Comuna de Graneros ',28,NULL,NULL,NULL,NULL),(148,'Comuna de Pichidegua ',28,NULL,NULL,NULL,NULL),(149,'Comuna de San Vicente de Tagua ',28,NULL,NULL,NULL,NULL),(150,'Comuna de Las Cabras ',28,NULL,NULL,NULL,NULL),(151,'Comuna de Quinta de Tilcoco ',28,NULL,NULL,NULL,NULL),(152,'Comuna de Chépica ',29,NULL,NULL,NULL,NULL),(153,'Comuna de Peralillo ',29,NULL,NULL,NULL,NULL),(154,'Comuna de Placilla ',29,NULL,NULL,NULL,NULL),(155,'Comuna de Chimbarongo ',29,NULL,NULL,NULL,NULL),(156,'Comuna de Lolol ',29,NULL,NULL,NULL,NULL),(157,'Comuna de Pumanque ',29,NULL,NULL,NULL,NULL),(158,'Comuna de San Fernando ',29,NULL,NULL,NULL,NULL),(159,'Comuna de Santa Cruz ',29,NULL,NULL,NULL,NULL),(160,'Comuna de Nancagua ',29,NULL,NULL,NULL,NULL),(161,'Comuna de Palmilla ',29,NULL,NULL,NULL,NULL),(162,'Comuna de La Estrella ',30,NULL,NULL,NULL,NULL),(163,'Comuna de Litueche ',30,NULL,NULL,NULL,NULL),(164,'Comuna de Marchigue ',30,NULL,NULL,NULL,NULL),(165,'Comuna de Navidad ',30,NULL,NULL,NULL,NULL),(166,'Comuna de Paredones ',30,NULL,NULL,NULL,NULL),(167,'Comuna de Pichilemu ',30,NULL,NULL,NULL,NULL),(168,'Comuna de Curicó ',31,NULL,NULL,NULL,NULL),(169,'Comuna de Molina ',31,NULL,NULL,NULL,NULL),(170,'Comuna de Sagrada Familia ',31,NULL,NULL,NULL,NULL),(171,'Comuna de Teno ',31,NULL,NULL,NULL,NULL),(172,'Comuna de Vichuquén ',31,NULL,NULL,NULL,NULL),(173,'Comuna de Romeral ',31,NULL,NULL,NULL,NULL),(174,'Comuna de Rauco ',31,NULL,NULL,NULL,NULL),(175,'Comuna de Hualañé ',31,NULL,NULL,NULL,NULL),(176,'Comuna de Licantén ',31,NULL,NULL,NULL,NULL),(177,'Comuna de Talca ',32,NULL,NULL,NULL,NULL),(178,'Comuna de San Clemente ',32,NULL,NULL,NULL,NULL),(179,'Comuna de Pelarco ',32,NULL,NULL,NULL,NULL),(180,'Comuna de Pencahue ',32,NULL,NULL,NULL,NULL),(181,'Comuna de Maule ',32,NULL,NULL,NULL,NULL),(182,'Comuna de San Rafael ',32,NULL,NULL,NULL,NULL),(183,'Comuna de Curepto ',32,NULL,NULL,NULL,NULL),(184,'Comuna de Constitución ',32,NULL,NULL,NULL,NULL),(185,'Comuna de Empedrado ',32,NULL,NULL,NULL,NULL),(186,'Comuna de Río claro ',32,NULL,NULL,NULL,NULL),(187,'Comuna de Linares ',33,NULL,NULL,NULL,NULL),(188,'Comuna de San Javier de Loncomilla ',33,NULL,NULL,NULL,NULL),(189,'Comuna de Parral ',33,NULL,NULL,NULL,NULL),(190,'Comuna de Villa Alegre ',33,NULL,NULL,NULL,NULL),(191,'Comuna de Longaví ',33,NULL,NULL,NULL,NULL),(192,'Comuna de Colbún ',33,NULL,NULL,NULL,NULL),(193,'Comuna de Retiro ',33,NULL,NULL,NULL,NULL),(194,'Comuna de Yerbas Buenas ',33,NULL,NULL,NULL,NULL),(195,'Comuna de Cauquenes ',34,NULL,NULL,NULL,NULL),(196,'Comuna de Chanco ',34,NULL,NULL,NULL,NULL),(197,'Comuna de Pelluhue ',34,NULL,NULL,NULL,NULL),(198,'Comuna de Alto Biobío ',35,NULL,NULL,NULL,NULL),(199,'Comuna de Antuco ',35,NULL,NULL,NULL,NULL),(200,'Comuna de Cabrero ',35,NULL,NULL,NULL,NULL),(201,'Comuna de Laja ',35,NULL,NULL,NULL,NULL),(202,'Comuna de Los Ángeles ',35,NULL,NULL,NULL,NULL),(203,'Comuna de Mulchén ',35,NULL,NULL,NULL,NULL),(204,'Comuna de Nacimiento ',35,NULL,NULL,NULL,NULL),(205,'Comuna de Negrete ',35,NULL,NULL,NULL,NULL),(206,'Comuna de Quilaco ',35,NULL,NULL,NULL,NULL),(207,'Comuna de Quilleco ',35,NULL,NULL,NULL,NULL),(208,'Comuna de San Rosendo ',35,NULL,NULL,NULL,NULL),(209,'Comuna de Santa Bárbara ',35,NULL,NULL,NULL,NULL),(210,'Comuna de Tucapel ',35,NULL,NULL,NULL,NULL),(211,'Comuna de Yumbel ',35,NULL,NULL,NULL,NULL),(212,'Comuna de Concepción ',36,NULL,NULL,NULL,NULL),(213,'Comuna de Coronel ',36,NULL,NULL,NULL,NULL),(214,'Comuna de Chiguayante ',36,NULL,NULL,NULL,NULL),(215,'Comuna de Florida ',36,NULL,NULL,NULL,NULL),(216,'Comuna de Hualpén ',36,NULL,NULL,NULL,NULL),(217,'Comuna de Hualqui ',36,NULL,NULL,NULL,NULL),(218,'Comuna de Lota ',36,NULL,NULL,NULL,NULL),(219,'Comuna de Penco ',36,NULL,NULL,NULL,NULL),(220,'Comuna de San Pedro de la Paz ',36,NULL,NULL,NULL,NULL),(221,'Comuna de Santa Juana ',36,NULL,NULL,NULL,NULL),(222,'Comuna de Talcahuano ',36,NULL,NULL,NULL,NULL),(223,'Comuna de Tomé ',36,NULL,NULL,NULL,NULL),(224,'Comuna de Arauco ',37,NULL,NULL,NULL,NULL),(225,'Comuna de Cañete ',37,NULL,NULL,NULL,NULL),(226,'Comuna de Contulmo ',37,NULL,NULL,NULL,NULL),(227,'Comuna de Curanilahue ',37,NULL,NULL,NULL,NULL),(228,'Comuna de Lebu ',37,NULL,NULL,NULL,NULL),(229,'Comuna de Los Álamos ',37,NULL,NULL,NULL,NULL),(230,'Comuna de Tirúa ',37,NULL,NULL,NULL,NULL),(231,'Comuna de Angol ',38,NULL,NULL,NULL,NULL),(232,'Comuna de Collipulli ',38,NULL,NULL,NULL,NULL),(233,'Comuna de Curacautín ',38,NULL,NULL,NULL,NULL),(234,'Comuna de Ercilla ',38,NULL,NULL,NULL,NULL),(235,'Comuna de Lonquimay ',38,NULL,NULL,NULL,NULL),(236,'Comuna de Los Sauces ',38,NULL,NULL,NULL,NULL),(237,'Comuna de Lumaco ',38,NULL,NULL,NULL,NULL),(238,'Comuna de Purén ',38,NULL,NULL,NULL,NULL),(239,'Comuna de Renaico ',38,NULL,NULL,NULL,NULL),(240,'Comuna de Traiguén ',38,NULL,NULL,NULL,NULL),(241,'Comuna de Victoria ',38,NULL,NULL,NULL,NULL),(242,'Comuna de Temuco ',39,NULL,NULL,NULL,NULL),(243,'Comuna de Carahue ',39,NULL,NULL,NULL,NULL),(244,'Comuna de Cholchol ',39,NULL,NULL,NULL,NULL),(245,'Comuna de Cunco ',39,NULL,NULL,NULL,NULL),(246,'Comuna de Curarrehue ',39,NULL,NULL,NULL,NULL),(247,'Comuna de Freire ',39,NULL,NULL,NULL,NULL),(248,'Comuna de Galvarino ',39,NULL,NULL,NULL,NULL),(249,'Comuna de Gorbea ',39,NULL,NULL,NULL,NULL),(250,'Comuna de Lautaro ',39,NULL,NULL,NULL,NULL),(251,'Comuna de Loncoche ',39,NULL,NULL,NULL,NULL),(252,'Comuna de Melipeuco ',39,NULL,NULL,NULL,NULL),(253,'Comuna de Nueva Imperial ',39,NULL,NULL,NULL,NULL),(254,'Comuna de Padre Las Casas ',39,NULL,NULL,NULL,NULL),(255,'Comuna de Perquenco ',39,NULL,NULL,NULL,NULL),(256,'Comuna de Pitrufquén ',39,NULL,NULL,NULL,NULL),(257,'Comuna de Pucón ',39,NULL,NULL,NULL,NULL),(258,'Comuna de Saavedra ',39,NULL,NULL,NULL,NULL),(259,'Comuna de Teodoro Schmidt ',39,NULL,NULL,NULL,NULL),(260,'Comuna de Toltén ',39,NULL,NULL,NULL,NULL),(261,'Comuna de Vilcún ',39,NULL,NULL,NULL,NULL),(262,'Comuna de Villarrica ',39,NULL,NULL,NULL,NULL),(263,'Comuna de Corral ',40,NULL,NULL,NULL,NULL),(264,'Comuna de Lanco ',40,NULL,NULL,NULL,NULL),(265,'Comuna de Los Lagos ',40,NULL,NULL,NULL,NULL),(266,'Comuna de Mariquina ',40,NULL,NULL,NULL,NULL),(267,'Comuna de Máfil ',40,NULL,NULL,NULL,NULL),(268,'Comuna de Paillaco ',40,NULL,NULL,NULL,NULL),(269,'Comuna de Panguipulli ',40,NULL,NULL,NULL,NULL),(270,'Comuna de Valdivia ',40,NULL,NULL,NULL,NULL),(271,'Comuna de La Unión ',41,NULL,NULL,NULL,NULL),(272,'Comuna de Futrono ',41,NULL,NULL,NULL,NULL),(273,'Comuna de Río Bueno ',41,NULL,NULL,NULL,NULL),(274,'Comuna de Lago Ranco ',41,NULL,NULL,NULL,NULL),(275,'Comuna de Osorno ',42,NULL,NULL,NULL,NULL),(276,'Comuna de Puerto Octay ',42,NULL,NULL,NULL,NULL),(277,'Comuna de Purranque ',42,NULL,NULL,NULL,NULL),(278,'Comuna de Puyehue ',42,NULL,NULL,NULL,NULL),(279,'Comuna de Río Negro ',42,NULL,NULL,NULL,NULL),(280,'Comuna de San Juan de la Costa ',42,NULL,NULL,NULL,NULL),(281,'Comuna de San Pablo ',42,NULL,NULL,NULL,NULL),(282,'Comuna de Calbuco ',43,NULL,NULL,NULL,NULL),(283,'Comuna de Cochamó ',43,NULL,NULL,NULL,NULL),(284,'Comuna de Fresia ',43,NULL,NULL,NULL,NULL),(285,'Comuna de Frutillar ',43,NULL,NULL,NULL,NULL),(286,'Comuna de Llanquihue ',43,NULL,NULL,NULL,NULL),(287,'Comuna de Los Muermos ',43,NULL,NULL,NULL,NULL),(288,'Comuna de Maullín ',43,NULL,NULL,NULL,NULL),(289,'Comuna de Puerto Montt ',43,NULL,NULL,NULL,NULL),(290,'Comuna de Puerto Varas ',43,NULL,NULL,NULL,NULL),(291,'Comuna de Ancud ',44,NULL,NULL,NULL,NULL),(292,'Comuna de Castro ',44,NULL,NULL,NULL,NULL),(293,'Comuna de Chonchi ',44,NULL,NULL,NULL,NULL),(294,'Comuna de Curaco de Vélez ',44,NULL,NULL,NULL,NULL),(295,'Comuna de Dalcahue ',44,NULL,NULL,NULL,NULL),(296,'Comuna de Puqueldón ',44,NULL,NULL,NULL,NULL),(297,'Comuna de Queilén ',44,NULL,NULL,NULL,NULL),(298,'Comuna de Quemchi ',44,NULL,NULL,NULL,NULL),(299,'Comuna de Quellón ',44,NULL,NULL,NULL,NULL),(300,'Comuna de Quinchao ',44,NULL,NULL,NULL,NULL),(301,'Comuna de Chaitén ',45,NULL,NULL,NULL,NULL),(302,'Comuna de futaleufú ',45,NULL,NULL,NULL,NULL),(303,'Comuna de Hualaihué ',45,NULL,NULL,NULL,NULL),(304,'Comuna de Palena ',45,NULL,NULL,NULL,NULL),(305,'Comuna de Lago Verde ',46,NULL,NULL,NULL,NULL),(306,'Comuna de Coyhaique ',46,NULL,NULL,NULL,NULL),(307,'Comuna de Aysén ',47,NULL,NULL,NULL,NULL),(308,'Comuna de Cisnes ',47,NULL,NULL,NULL,NULL),(309,'Comuna de Guaitecas ',47,NULL,NULL,NULL,NULL),(310,'Comuna de Río Ibáñez ',48,NULL,NULL,NULL,NULL),(311,'Comuna de Chile Chico ',48,NULL,NULL,NULL,NULL),(312,'Comuna de Cochrane ',49,NULL,NULL,NULL,NULL),(313,'Comuna de O\"Higgins ',49,NULL,NULL,NULL,NULL),(314,'Comuna de Tortel ',49,NULL,NULL,NULL,NULL),(315,'Comuna de Natales ',50,NULL,NULL,NULL,NULL),(316,'Comuna de Torres del Paine ',50,NULL,NULL,NULL,NULL),(317,'Comuna de Laguna Blanca ',51,NULL,NULL,NULL,NULL),(318,'Comuna de Punta Arenas ',51,NULL,NULL,NULL,NULL),(319,'Comuna de Río Verde ',51,NULL,NULL,NULL,NULL),(320,'Comuna de San Gregorio ',51,NULL,NULL,NULL,NULL),(321,'Comuna de Cochrane ',52,NULL,NULL,NULL,NULL),(322,'Comuna de Porvenir ',52,NULL,NULL,NULL,NULL),(323,'Comuna de Primavera ',52,NULL,NULL,NULL,NULL),(324,'Comuna de Timaukel ',52,NULL,NULL,NULL,NULL),(325,'Comuna de Cabo de Hornos ',53,NULL,NULL,NULL,NULL),(326,'Comuna de Antártica ',53,NULL,NULL,NULL,NULL),(327,'Comuna de Cobquecura ',54,NULL,NULL,NULL,NULL),(328,'Comuna de Coelemu ',54,NULL,NULL,NULL,NULL),(329,'Comuna de Ninhue ',54,NULL,NULL,NULL,NULL),(330,'Comuna de Portezuelo ',54,NULL,NULL,NULL,NULL),(331,'Comuna de Quirihue ',54,NULL,NULL,NULL,NULL),(332,'Comuna de Ránquil ',54,NULL,NULL,NULL,NULL),(333,'Comuna de Treguaco ',54,NULL,NULL,NULL,NULL),(334,'Comuna de Coihueco ',55,NULL,NULL,NULL,NULL),(335,'Comuna de Ñiquén ',55,NULL,NULL,NULL,NULL),(336,'Comuna de San Carlos ',55,NULL,NULL,NULL,NULL),(337,'Comuna de San Fabián ',55,NULL,NULL,NULL,NULL),(338,'Comuna de San Nicolás ',55,NULL,NULL,NULL,NULL),(339,'Comuna de Bulnes ',56,NULL,NULL,NULL,NULL),(340,'Comuna de Chillán ',56,NULL,NULL,NULL,NULL),(341,'Comuna de Chillán Viejo ',56,NULL,NULL,NULL,NULL),(342,'Comuna de El Carmen ',56,NULL,NULL,NULL,NULL),(343,'Comuna de Pemuco ',56,NULL,NULL,NULL,NULL),(344,'Comuna de Pinto ',56,NULL,NULL,NULL,NULL),(345,'Comuna de Quillón ',56,NULL,NULL,NULL,NULL),(346,'Comuna de San Ignacio ',56,NULL,NULL,NULL,NULL),(347,'Comuna de Yungay ',56,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Comuna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Diagnostico`
--

DROP TABLE IF EXISTS `Diagnostico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Diagnostico` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `diagnostico` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Diagnostico`
--

LOCK TABLES `Diagnostico` WRITE;
/*!40000 ALTER TABLE `Diagnostico` DISABLE KEYS */;
/*!40000 ALTER TABLE `Diagnostico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DiagnosticosAtencion`
--

DROP TABLE IF EXISTS `DiagnosticosAtencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DiagnosticosAtencion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Observacion` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `Atencion_id` int(10) unsigned DEFAULT NULL,
  `Diagnostico_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `diagnosticosatencion_atencion_id_foreign` (`Atencion_id`),
  KEY `diagnosticosatencion_diagnostico_id_foreign` (`Diagnostico_id`),
  CONSTRAINT `diagnosticosatencion_atencion_id_foreign` FOREIGN KEY (`Atencion_id`) REFERENCES `Atencion` (`id`) ON DELETE CASCADE,
  CONSTRAINT `diagnosticosatencion_diagnostico_id_foreign` FOREIGN KEY (`Diagnostico_id`) REFERENCES `Diagnostico` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DiagnosticosAtencion`
--

LOCK TABLES `DiagnosticosAtencion` WRITE;
/*!40000 ALTER TABLE `DiagnosticosAtencion` DISABLE KEYS */;
/*!40000 ALTER TABLE `DiagnosticosAtencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Disponibilidad`
--

DROP TABLE IF EXISTS `Disponibilidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Disponibilidad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dia` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hora_inicio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hora_termino` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Medico_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `disponibilidad_medico_id_foreign` (`Medico_id`),
  CONSTRAINT `disponibilidad_medico_id_foreign` FOREIGN KEY (`Medico_id`) REFERENCES `Medico` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Disponibilidad`
--

LOCK TABLES `Disponibilidad` WRITE;
/*!40000 ALTER TABLE `Disponibilidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `Disponibilidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EnfermedadCronica`
--

DROP TABLE IF EXISTS `EnfermedadCronica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EnfermedadCronica` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EnfermedadCronica`
--

LOCK TABLES `EnfermedadCronica` WRITE;
/*!40000 ALTER TABLE `EnfermedadCronica` DISABLE KEYS */;
INSERT INTO `EnfermedadCronica` VALUES (1,'Hipertensión arterial',NULL,NULL,NULL,NULL),(2,'Diabetes Mellitus Tipo 1',NULL,NULL,NULL,NULL),(3,'Diabetes Mellitus Tipo 2',NULL,NULL,NULL,NULL),(4,'VIH/SIDA',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `EnfermedadCronica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EnfermedadesCronicasPaciente`
--

DROP TABLE IF EXISTS `EnfermedadesCronicasPaciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EnfermedadesCronicasPaciente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaDeteccion` date DEFAULT NULL,
  `EnfermedadCronica_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `enfermedadescronicaspaciente_enfermedadcronica_id_foreign` (`EnfermedadCronica_id`),
  KEY `enfermedadescronicaspaciente_paciente_id_foreign` (`Paciente_id`),
  CONSTRAINT `enfermedadescronicaspaciente_enfermedadcronica_id_foreign` FOREIGN KEY (`EnfermedadCronica_id`) REFERENCES `EnfermedadCronica` (`id`) ON DELETE CASCADE,
  CONSTRAINT `enfermedadescronicaspaciente_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EnfermedadesCronicasPaciente`
--

LOCK TABLES `EnfermedadesCronicasPaciente` WRITE;
/*!40000 ALTER TABLE `EnfermedadesCronicasPaciente` DISABLE KEYS */;
INSERT INTO `EnfermedadesCronicasPaciente` VALUES (1,'2004-02-01',1,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `EnfermedadesCronicasPaciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Especialidad`
--

DROP TABLE IF EXISTS `Especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Especialidad` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Especialidad`
--

LOCK TABLES `Especialidad` WRITE;
/*!40000 ALTER TABLE `Especialidad` DISABLE KEYS */;
INSERT INTO `Especialidad` VALUES (1,'Fonoaudiología',NULL,NULL,NULL,NULL),(2,'Cardiología adulto',NULL,NULL,NULL,NULL),(3,'Cardiología infantil',NULL,NULL,NULL,NULL),(4,'Dermatología',NULL,NULL,NULL,NULL),(5,'Reumatología',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EstadoCita`
--

DROP TABLE IF EXISTS `EstadoCita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EstadoCita` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EstadoCita`
--

LOCK TABLES `EstadoCita` WRITE;
/*!40000 ALTER TABLE `EstadoCita` DISABLE KEYS */;
INSERT INTO `EstadoCita` VALUES (1,'Pendiente de confirmación','Hora agendada pero no confirmada',NULL,NULL,NULL,NULL),(2,'Confirmada','El paciente ha confirmado la hora',NULL,NULL,NULL,NULL),(3,'No concretada','El paciente no concreta la cita al médico',NULL,NULL,NULL,NULL),(4,'Concretada','El paciente ha asistido a la consulta médica',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `EstadoCita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EstadoCivil`
--

DROP TABLE IF EXISTS `EstadoCivil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EstadoCivil` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EstadoCivil`
--

LOCK TABLES `EstadoCivil` WRITE;
/*!40000 ALTER TABLE `EstadoCivil` DISABLE KEYS */;
INSERT INTO `EstadoCivil` VALUES (1,'se acredita con el certificado de nacimiento.','Hijo/a',NULL,NULL,NULL,NULL),(2,'se acredita con el certificado de nacimiento.','Padre o Madre',NULL,NULL,NULL,NULL),(3,'no existe un certificado para acreditar este estado civil. Se puede acreditar con una declaración jurada ante un notario público.','Soltero/a',NULL,NULL,NULL,NULL),(4,'se acredita con el certificado de matrimonio.','Casado/a',NULL,NULL,NULL,NULL),(5,'se acredita con el certificado de matrimonio y el certificado de defunción.','Viudo/a',NULL,NULL,NULL,NULL),(6,'se acredita con el certificado de matrimonio, el cual debe contener la subinscripción de la sentencia judicial que declara el divorcio.','Divorciado/a',NULL,NULL,NULL,NULL),(7,'Sólo en el caso de declararse judicialmente la separación, se acredita con la sentencia respectiva.','Separado/a',NULL,NULL,NULL,NULL),(8,'Se acredita con el certificado de conviviente emitido por el Registro civil.','Conviviente',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `EstadoCivil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExamenFisico`
--

DROP TABLE IF EXISTS `ExamenFisico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ExamenFisico` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaExamen` date NOT NULL,
  `peso` double(3,2) NOT NULL,
  `estatura` double(4,3) NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExamenFisico`
--

LOCK TABLES `ExamenFisico` WRITE;
/*!40000 ALTER TABLE `ExamenFisico` DISABLE KEYS */;
/*!40000 ALTER TABLE `ExamenFisico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Genero`
--

DROP TABLE IF EXISTS `Genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Genero` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Genero`
--

LOCK TABLES `Genero` WRITE;
/*!40000 ALTER TABLE `Genero` DISABLE KEYS */;
INSERT INTO `Genero` VALUES (1,'Mujer','Mujer',NULL,NULL,NULL,NULL),(2,'Hombre','Hombre',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GrupoEtnico`
--

DROP TABLE IF EXISTS `GrupoEtnico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GrupoEtnico` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GrupoEtnico`
--

LOCK TABLES `GrupoEtnico` WRITE;
/*!40000 ALTER TABLE `GrupoEtnico` DISABLE KEYS */;
INSERT INTO `GrupoEtnico` VALUES (1,'Mapuche',NULL,NULL,NULL,NULL),(2,'Rapanui',NULL,NULL,NULL,NULL),(3,'Aimara',NULL,NULL,NULL,NULL),(4,'Atacameño',NULL,NULL,NULL,NULL),(5,'Quechua',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `GrupoEtnico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Habito`
--

DROP TABLE IF EXISTS `Habito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Habito` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Habito`
--

LOCK TABLES `Habito` WRITE;
/*!40000 ALTER TABLE `Habito` DISABLE KEYS */;
INSERT INTO `Habito` VALUES (1,'Fuma',NULL,NULL,NULL,NULL),(2,'Consume alcochol',NULL,NULL,NULL,NULL),(3,'Consume drogas',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Habito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HabitoSexual`
--

DROP TABLE IF EXISTS `HabitoSexual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HabitoSexual` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HabitoSexual`
--

LOCK TABLES `HabitoSexual` WRITE;
/*!40000 ALTER TABLE `HabitoSexual` DISABLE KEYS */;
INSERT INTO `HabitoSexual` VALUES (1,'Usa preservativo',NULL,NULL,NULL,NULL),(2,'Tiene una pareja sexual',NULL,NULL,NULL,NULL),(3,'Tiene relaciones sexuales de forma regular',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `HabitoSexual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HabitosPaciente`
--

DROP TABLE IF EXISTS `HabitosPaciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HabitosPaciente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaInicio` date DEFAULT NULL,
  `Habito_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `habitospaciente_habito_id_foreign` (`Habito_id`),
  KEY `habitospaciente_paciente_id_foreign` (`Paciente_id`),
  CONSTRAINT `habitospaciente_habito_id_foreign` FOREIGN KEY (`Habito_id`) REFERENCES `Habito` (`id`) ON DELETE CASCADE,
  CONSTRAINT `habitospaciente_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HabitosPaciente`
--

LOCK TABLES `HabitosPaciente` WRITE;
/*!40000 ALTER TABLE `HabitosPaciente` DISABLE KEYS */;
INSERT INTO `HabitosPaciente` VALUES (1,'2005-02-01',1,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `HabitosPaciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HabitosSexualesPaciente`
--

DROP TABLE IF EXISTS `HabitosSexualesPaciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HabitosSexualesPaciente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaInicio` date DEFAULT NULL,
  `verdadero` int(11) NOT NULL,
  `HabitoSexual_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `habitossexualespaciente_habitosexual_id_foreign` (`HabitoSexual_id`),
  KEY `habitossexualespaciente_paciente_id_foreign` (`Paciente_id`),
  CONSTRAINT `habitossexualespaciente_habitosexual_id_foreign` FOREIGN KEY (`HabitoSexual_id`) REFERENCES `HabitoSexual` (`id`) ON DELETE CASCADE,
  CONSTRAINT `habitossexualespaciente_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HabitosSexualesPaciente`
--

LOCK TABLES `HabitosSexualesPaciente` WRITE;
/*!40000 ALTER TABLE `HabitosSexualesPaciente` DISABLE KEYS */;
INSERT INTO `HabitosSexualesPaciente` VALUES (1,NULL,1,1,1,NULL,NULL,NULL,NULL),(2,NULL,1,2,1,NULL,NULL,NULL,NULL),(3,NULL,1,3,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `HabitosSexualesPaciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medicamento`
--

DROP TABLE IF EXISTS `Medicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Medicamento` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombrecomun` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombrecientifico` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medicamento`
--

LOCK TABLES `Medicamento` WRITE;
/*!40000 ALTER TABLE `Medicamento` DISABLE KEYS */;
INSERT INTO `Medicamento` VALUES (1,'ZIAGEN','Abacavir',NULL,NULL,NULL,NULL),(2,'COGENTIN','Benzotropina',NULL,NULL,NULL,NULL),(3,'TYLENOL','Paracetamol',NULL,NULL,NULL,NULL),(4,'VICOPROFEN','Hidrocodona/ibuprofeno',NULL,NULL,NULL,NULL),(5,'ACLOVATE','Alclometasona',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Medicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MedicamentosReceta`
--

DROP TABLE IF EXISTS `MedicamentosReceta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MedicamentosReceta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dosis` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  `tiempo` int(11) NOT NULL,
  `intervalo` int(11) NOT NULL,
  `Medicamento_id` int(10) unsigned DEFAULT NULL,
  `ViaAdministracionMedicamento_id` int(10) unsigned DEFAULT NULL,
  `Receta_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medicamentosreceta_medicamento_id_foreign` (`Medicamento_id`),
  KEY `medicamentosreceta_viaadministracionmedicamento_id_foreign` (`ViaAdministracionMedicamento_id`),
  KEY `medicamentosreceta_receta_id_foreign` (`Receta_id`),
  CONSTRAINT `medicamentosreceta_medicamento_id_foreign` FOREIGN KEY (`Medicamento_id`) REFERENCES `Medicamento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `medicamentosreceta_receta_id_foreign` FOREIGN KEY (`Receta_id`) REFERENCES `Receta` (`id`) ON DELETE CASCADE,
  CONSTRAINT `medicamentosreceta_viaadministracionmedicamento_id_foreign` FOREIGN KEY (`ViaAdministracionMedicamento_id`) REFERENCES `ViaAdministracionMedicamento` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MedicamentosReceta`
--

LOCK TABLES `MedicamentosReceta` WRITE;
/*!40000 ALTER TABLE `MedicamentosReceta` DISABLE KEYS */;
/*!40000 ALTER TABLE `MedicamentosReceta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medico`
--

DROP TABLE IF EXISTS `Medico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Medico` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Especialidad_id` int(10) unsigned DEFAULT NULL,
  `Persona_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medico_especialidad_id_foreign` (`Especialidad_id`),
  KEY `medico_persona_id_foreign` (`Persona_id`),
  CONSTRAINT `medico_especialidad_id_foreign` FOREIGN KEY (`Especialidad_id`) REFERENCES `Especialidad` (`id`) ON DELETE CASCADE,
  CONSTRAINT `medico_persona_id_foreign` FOREIGN KEY (`Persona_id`) REFERENCES `Persona` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medico`
--

LOCK TABLES `Medico` WRITE;
/*!40000 ALTER TABLE `Medico` DISABLE KEYS */;
/*!40000 ALTER TABLE `Medico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Modulo`
--

DROP TABLE IF EXISTS `Modulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Modulo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Modulo`
--

LOCK TABLES `Modulo` WRITE;
/*!40000 ALTER TABLE `Modulo` DISABLE KEYS */;
INSERT INTO `Modulo` VALUES (1,'Personas',NULL,NULL,NULL,NULL),(2,'Pacientes',NULL,NULL,NULL,NULL),(3,'EstadoCivil',NULL,NULL,NULL,NULL),(4,'Generos',NULL,NULL,NULL,NULL),(5,'Comunas',NULL,NULL,NULL,NULL),(6,'Provincias',NULL,NULL,NULL,NULL),(7,'Regiones',NULL,NULL,NULL,NULL),(8,'Previsiones',NULL,NULL,NULL,NULL),(9,'Usuarios',NULL,NULL,NULL,NULL),(10,'Roles',NULL,NULL,NULL,NULL),(11,'TipoSangre',NULL,NULL,NULL,NULL),(12,'FichaMedica',NULL,NULL,NULL,NULL),(13,'Ocupaciones',NULL,NULL,NULL,NULL),(14,'GrupoEtnico',NULL,NULL,NULL,NULL),(15,'Alergias',NULL,NULL,NULL,NULL),(16,'AlergiasComunesPaciente',NULL,NULL,NULL,NULL),(17,'UsoMedicamento',NULL,NULL,NULL,NULL),(18,'EnfermedadCronica',NULL,NULL,NULL,NULL),(19,'EnfermedadesCronicasPaciente',NULL,NULL,NULL,NULL),(20,'Habitos',NULL,NULL,NULL,NULL),(21,'HabitosPaciente',NULL,NULL,NULL,NULL),(22,'HabitoSexual',NULL,NULL,NULL,NULL),(23,'HabitosSexualesPaciente',NULL,NULL,NULL,NULL),(24,'Vacuna',NULL,NULL,NULL,NULL),(25,'VacunasPaciente',NULL,NULL,NULL,NULL),(26,'AlergiasMedicamentosPaciente',NULL,NULL,NULL,NULL),(27,'EstadoCita',NULL,NULL,NULL,NULL),(28,'Especialidad',NULL,NULL,NULL,NULL),(29,'Medico',NULL,NULL,NULL,NULL),(30,'BoxConsulta',NULL,NULL,NULL,NULL),(31,'TipoBox',NULL,NULL,NULL,NULL),(32,'Cita',NULL,NULL,NULL,NULL),(33,'Atencion',NULL,NULL,NULL,NULL),(34,'Diagnostico',NULL,NULL,NULL,NULL),(35,'DiagnosticosAtencion',NULL,NULL,NULL,NULL),(36,'Medicamento',NULL,NULL,NULL,NULL),(37,'MedicamentosReceta',NULL,NULL,NULL,NULL),(38,'Receta',NULL,NULL,NULL,NULL),(39,'ViaAdministracionMedicamento',NULL,NULL,NULL,NULL),(40,'ExamenFisico',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Modulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ocupacion`
--

DROP TABLE IF EXISTS `Ocupacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ocupacion` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ocupacion`
--

LOCK TABLES `Ocupacion` WRITE;
/*!40000 ALTER TABLE `Ocupacion` DISABLE KEYS */;
INSERT INTO `Ocupacion` VALUES (1,'Trabajador independiente',NULL,NULL,NULL,NULL),(2,'Trabajador dependiente',NULL,NULL,NULL,NULL),(3,'Estudiante',NULL,NULL,NULL,NULL),(4,'Jubilado',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Ocupacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Paciente`
--

DROP TABLE IF EXISTS `Paciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Paciente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Persona_id` int(10) unsigned DEFAULT NULL,
  `TipoSangre_id` int(10) unsigned DEFAULT NULL,
  `GrupoEtnico_id` int(10) unsigned DEFAULT NULL,
  `Ocupacion_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paciente_persona_id_foreign` (`Persona_id`),
  KEY `paciente_tiposangre_id_foreign` (`TipoSangre_id`),
  KEY `paciente_grupoetnico_id_foreign` (`GrupoEtnico_id`),
  KEY `paciente_ocupacion_id_foreign` (`Ocupacion_id`),
  CONSTRAINT `paciente_grupoetnico_id_foreign` FOREIGN KEY (`GrupoEtnico_id`) REFERENCES `GrupoEtnico` (`id`) ON DELETE CASCADE,
  CONSTRAINT `paciente_ocupacion_id_foreign` FOREIGN KEY (`Ocupacion_id`) REFERENCES `Ocupacion` (`id`) ON DELETE CASCADE,
  CONSTRAINT `paciente_persona_id_foreign` FOREIGN KEY (`Persona_id`) REFERENCES `Persona` (`id`) ON DELETE CASCADE,
  CONSTRAINT `paciente_tiposangre_id_foreign` FOREIGN KEY (`TipoSangre_id`) REFERENCES `TipoSangre` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Paciente`
--

LOCK TABLES `Paciente` WRITE;
/*!40000 ALTER TABLE `Paciente` DISABLE KEYS */;
INSERT INTO `Paciente` VALUES (1,4,1,1,2,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Paciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PermisoModulo`
--

DROP TABLE IF EXISTS `PermisoModulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PermisoModulo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `write` int(11) NOT NULL DEFAULT '1',
  `erase` int(11) NOT NULL DEFAULT '1',
  `update` int(11) NOT NULL DEFAULT '1',
  `view` int(11) NOT NULL DEFAULT '1',
  `Role_id` int(10) unsigned DEFAULT NULL,
  `Modulo_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permisomodulo_role_id_foreign` (`Role_id`),
  KEY `permisomodulo_modulo_id_foreign` (`Modulo_id`),
  CONSTRAINT `permisomodulo_modulo_id_foreign` FOREIGN KEY (`Modulo_id`) REFERENCES `Modulo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `permisomodulo_role_id_foreign` FOREIGN KEY (`Role_id`) REFERENCES `Role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PermisoModulo`
--

LOCK TABLES `PermisoModulo` WRITE;
/*!40000 ALTER TABLE `PermisoModulo` DISABLE KEYS */;
INSERT INTO `PermisoModulo` VALUES (1,1,1,1,1,1,1,NULL,NULL,NULL,NULL),(2,1,1,1,1,1,2,NULL,NULL,NULL,NULL),(3,1,1,1,1,1,3,NULL,NULL,NULL,NULL),(4,1,1,1,1,1,4,NULL,NULL,NULL,NULL),(5,1,1,1,1,1,5,NULL,NULL,NULL,NULL),(6,1,1,1,1,1,6,NULL,NULL,NULL,NULL),(7,1,1,1,1,1,7,NULL,NULL,NULL,NULL),(8,1,1,1,1,1,8,NULL,NULL,NULL,NULL),(9,1,1,1,1,1,9,NULL,NULL,NULL,NULL),(10,1,1,1,1,1,10,NULL,NULL,NULL,NULL),(11,1,1,1,1,1,11,NULL,NULL,NULL,NULL),(12,1,1,1,1,1,13,NULL,NULL,NULL,NULL),(13,1,1,1,1,1,14,NULL,NULL,NULL,NULL),(14,1,1,1,1,1,15,NULL,NULL,NULL,NULL),(15,1,1,1,1,1,18,NULL,NULL,NULL,NULL),(16,1,1,1,1,1,20,NULL,NULL,NULL,NULL),(17,1,1,1,1,1,22,NULL,NULL,NULL,NULL),(18,1,1,1,1,1,24,NULL,NULL,NULL,NULL),(19,1,1,1,1,1,27,NULL,NULL,NULL,NULL),(20,1,1,1,1,1,28,NULL,NULL,NULL,NULL),(21,1,1,1,1,1,29,NULL,NULL,NULL,NULL),(22,1,1,1,1,1,30,NULL,NULL,NULL,NULL),(23,1,1,1,1,1,31,NULL,NULL,NULL,NULL),(24,1,1,1,1,1,32,NULL,NULL,NULL,NULL),(25,1,1,1,1,1,33,NULL,NULL,NULL,NULL),(26,1,1,1,1,1,34,NULL,NULL,NULL,NULL),(27,1,1,1,1,1,36,NULL,NULL,NULL,NULL),(28,1,1,1,1,1,39,NULL,NULL,NULL,NULL),(29,1,1,1,1,1,16,NULL,NULL,NULL,NULL),(30,1,1,1,1,1,17,NULL,NULL,NULL,NULL),(31,1,1,1,1,1,19,NULL,NULL,NULL,NULL),(32,1,1,1,1,1,21,NULL,NULL,NULL,NULL),(33,1,1,1,1,1,23,NULL,NULL,NULL,NULL),(34,1,1,1,1,1,25,NULL,NULL,NULL,NULL),(35,1,1,1,1,1,26,NULL,NULL,NULL,NULL),(36,1,1,1,1,1,35,NULL,NULL,NULL,NULL),(37,1,1,1,1,1,37,NULL,NULL,NULL,NULL),(38,1,1,1,1,1,38,NULL,NULL,NULL,NULL),(39,1,1,1,1,1,40,NULL,NULL,NULL,NULL),(40,1,1,1,1,2,1,NULL,NULL,NULL,NULL),(41,1,1,1,1,2,2,NULL,NULL,NULL,NULL),(42,1,1,1,1,2,3,NULL,NULL,NULL,NULL),(43,1,1,1,1,2,4,NULL,NULL,NULL,NULL),(44,1,1,1,1,2,5,NULL,NULL,NULL,NULL),(45,1,1,1,1,2,6,NULL,NULL,NULL,NULL),(46,1,1,1,1,2,7,NULL,NULL,NULL,NULL),(47,1,1,1,1,2,8,NULL,NULL,NULL,NULL),(48,1,1,1,1,2,9,NULL,NULL,NULL,NULL),(49,1,1,1,1,2,10,NULL,NULL,NULL,NULL),(50,1,1,1,1,2,11,NULL,NULL,NULL,NULL),(51,1,1,1,1,2,13,NULL,NULL,NULL,NULL),(52,1,1,1,1,2,14,NULL,NULL,NULL,NULL),(53,1,1,1,1,2,15,NULL,NULL,NULL,NULL),(54,1,1,1,1,2,18,NULL,NULL,NULL,NULL),(55,1,1,1,1,2,20,NULL,NULL,NULL,NULL),(56,1,1,1,1,2,22,NULL,NULL,NULL,NULL),(57,1,1,1,1,2,24,NULL,NULL,NULL,NULL),(58,1,1,1,1,2,27,NULL,NULL,NULL,NULL),(59,1,1,1,1,2,28,NULL,NULL,NULL,NULL),(60,1,1,1,1,2,29,NULL,NULL,NULL,NULL),(61,1,1,1,1,2,30,NULL,NULL,NULL,NULL),(62,1,1,1,1,2,31,NULL,NULL,NULL,NULL),(63,1,1,1,1,2,32,NULL,NULL,NULL,NULL),(64,1,1,1,1,2,33,NULL,NULL,NULL,NULL),(65,1,1,1,1,2,34,NULL,NULL,NULL,NULL),(66,1,1,1,1,2,36,NULL,NULL,NULL,NULL),(67,1,1,1,1,2,39,NULL,NULL,NULL,NULL),(68,1,1,1,1,2,16,NULL,NULL,NULL,NULL),(69,1,1,1,1,2,17,NULL,NULL,NULL,NULL),(70,1,1,1,1,2,19,NULL,NULL,NULL,NULL),(71,1,1,1,1,2,21,NULL,NULL,NULL,NULL),(72,1,1,1,1,2,23,NULL,NULL,NULL,NULL),(73,1,1,1,1,2,25,NULL,NULL,NULL,NULL),(74,1,1,1,1,2,26,NULL,NULL,NULL,NULL),(75,1,1,1,1,2,35,NULL,NULL,NULL,NULL),(76,1,1,1,1,2,37,NULL,NULL,NULL,NULL),(77,1,1,1,1,2,38,NULL,NULL,NULL,NULL),(78,1,1,1,1,2,40,NULL,NULL,NULL,NULL),(79,1,0,1,1,5,1,NULL,NULL,NULL,NULL),(80,1,0,1,1,5,2,NULL,NULL,NULL,NULL),(81,0,0,0,1,5,29,NULL,NULL,NULL,NULL),(82,1,1,1,1,5,32,NULL,NULL,NULL,NULL),(83,0,0,0,1,4,29,NULL,NULL,NULL,NULL),(84,1,1,1,1,4,32,NULL,NULL,NULL,NULL),(85,0,0,0,1,4,12,NULL,NULL,NULL,NULL),(86,0,0,0,1,4,33,NULL,NULL,NULL,NULL),(87,0,0,0,1,4,35,NULL,NULL,NULL,NULL),(88,0,0,0,1,4,38,NULL,NULL,NULL,NULL),(89,0,0,0,1,4,40,NULL,NULL,NULL,NULL),(90,0,0,0,1,3,2,NULL,NULL,NULL,NULL),(91,0,0,0,1,3,32,NULL,NULL,NULL,NULL),(92,0,0,0,1,3,12,NULL,NULL,NULL,NULL),(93,1,0,0,1,3,35,NULL,NULL,NULL,NULL),(94,1,0,0,1,3,37,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `PermisoModulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Persona`
--

DROP TABLE IF EXISTS `Persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Persona` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rut` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fono_casa` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fono_trabajo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `movil` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` int(11) NOT NULL DEFAULT '1',
  `fechaNacimiento` date NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Genero_id` int(10) unsigned DEFAULT NULL,
  `Comuna_id` int(10) unsigned DEFAULT NULL,
  `EstadoCivil_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `persona_genero_id_foreign` (`Genero_id`),
  KEY `persona_comuna_id_foreign` (`Comuna_id`),
  KEY `persona_estadocivil_id_foreign` (`EstadoCivil_id`),
  CONSTRAINT `persona_comuna_id_foreign` FOREIGN KEY (`Comuna_id`) REFERENCES `Comuna` (`id`) ON DELETE CASCADE,
  CONSTRAINT `persona_estadocivil_id_foreign` FOREIGN KEY (`EstadoCivil_id`) REFERENCES `EstadoCivil` (`id`) ON DELETE CASCADE,
  CONSTRAINT `persona_genero_id_foreign` FOREIGN KEY (`Genero_id`) REFERENCES `Genero` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Persona`
--

LOCK TABLES `Persona` WRITE;
/*!40000 ALTER TABLE `Persona` DISABLE KEYS */;
INSERT INTO `Persona` VALUES (1,'19304736k','Alberto','Ignacio','Herrera','Poza','none','none','981962000',1,'1996-04-05','Javiera Carrera 123',2,10,4,NULL,NULL,NULL,NULL),(2,'19302847k','Alonso','Ignacio','Bobadilla','Poza','none','none','981962000',1,'1995-04-05','Javiera Carrera 121',2,5,2,NULL,NULL,NULL,NULL),(3,'18957283k','Juan','Pablo','Tobias','Toledo','none','none','981962000',1,'1994-04-05','Javiera Carrera 021',2,15,3,NULL,NULL,NULL,NULL),(4,'178928367','Jorge','Ignacio','Hochtetter','Poza','none','none','981962000',1,'1990-04-05','Javiera Carrera 243',2,7,4,NULL,NULL,NULL,NULL),(5,'168273729','Roberto','Ignacio','Toledo','Poza','none','none','981962000',1,'1977-04-05','Javiera Carrera 323',2,13,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Prevision`
--

DROP TABLE IF EXISTS `Prevision`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Prevision` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isapre` int(11) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Prevision`
--

LOCK TABLES `Prevision` WRITE;
/*!40000 ALTER TABLE `Prevision` DISABLE KEYS */;
INSERT INTO `Prevision` VALUES (1,'Opera a través de un Seguro Social de Salud administrado por Fondo Nacional de Salud (FONASA). Sobre la base de un esquema de reparto, que se financia con el aporte de sus trabajadores/as y con recursos del Estado, provenientes de los impuestos generales de la nación. La cobertura que otorga este esquema son los mismos para todos los afiliados, independiente del monto de la cotización y del tamaño del grupo familiar cubierto.','FONASA',0,NULL,NULL,NULL,NULL),(2,'La ISAPRE opera como un sistema de seguros de salud basado en contratos individuales, en el que los beneficios otorgados obedecen directamente al plan contratado que dependen del sexo, la edad, preexistencia de enfermedades, etc. de sus afiliados.','ISAPRE',0,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Prevision` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PrevisionActual`
--

DROP TABLE IF EXISTS `PrevisionActual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PrevisionActual` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaActualizacion` date NOT NULL,
  `activado` int(11) NOT NULL DEFAULT '1',
  `Prevision_id` int(10) unsigned DEFAULT NULL,
  `Persona_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `previsionactual_prevision_id_foreign` (`Prevision_id`),
  KEY `previsionactual_persona_id_foreign` (`Persona_id`),
  CONSTRAINT `previsionactual_persona_id_foreign` FOREIGN KEY (`Persona_id`) REFERENCES `Persona` (`id`) ON DELETE CASCADE,
  CONSTRAINT `previsionactual_prevision_id_foreign` FOREIGN KEY (`Prevision_id`) REFERENCES `Prevision` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PrevisionActual`
--

LOCK TABLES `PrevisionActual` WRITE;
/*!40000 ALTER TABLE `PrevisionActual` DISABLE KEYS */;
INSERT INTO `PrevisionActual` VALUES (1,'2017-02-01',0,1,1,NULL,NULL,NULL,NULL),(2,'2017-03-01',0,2,1,NULL,NULL,NULL,NULL),(3,'2017-05-01',1,1,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `PrevisionActual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Provincia`
--

DROP TABLE IF EXISTS `Provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Provincia` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Region_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `provincia_region_id_foreign` (`Region_id`),
  CONSTRAINT `provincia_region_id_foreign` FOREIGN KEY (`Region_id`) REFERENCES `Region` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Provincia`
--

LOCK TABLES `Provincia` WRITE;
/*!40000 ALTER TABLE `Provincia` DISABLE KEYS */;
INSERT INTO `Provincia` VALUES (1,'Provincia de Arica',2,NULL,NULL,NULL,NULL),(2,'Provincia de Parinacota',2,NULL,NULL,NULL,NULL),(3,'Provincia de Iquique',3,NULL,NULL,NULL,NULL),(4,'Provincia de Tamarugal',3,NULL,NULL,NULL,NULL),(5,'Provincia de Tocopilla',4,NULL,NULL,NULL,NULL),(6,'Provincia de El Loa',4,NULL,NULL,NULL,NULL),(7,'Provincia de Antofagasta',4,NULL,NULL,NULL,NULL),(8,'Provincia de Chañaral',5,NULL,NULL,NULL,NULL),(9,'Provincia de Copiapó',5,NULL,NULL,NULL,NULL),(10,'Provincia de Huasco',5,NULL,NULL,NULL,NULL),(11,'Provincia de Elqui',6,NULL,NULL,NULL,NULL),(12,'Provincia de Limarí',6,NULL,NULL,NULL,NULL),(13,'Provincia de Choapa',6,NULL,NULL,NULL,NULL),(14,'Provincia de Petorca',7,NULL,NULL,NULL,NULL),(15,'Provincia de Los Andes',7,NULL,NULL,NULL,NULL),(16,'Provincia de San Felipe de Aconcagua',7,NULL,NULL,NULL,NULL),(17,'Provincia de Quillota',7,NULL,NULL,NULL,NULL),(18,'Provincia de Valparaíso',7,NULL,NULL,NULL,NULL),(19,'Provincia de San Antonio',7,NULL,NULL,NULL,NULL),(20,'Provincia de Isla de Pascua',7,NULL,NULL,NULL,NULL),(21,'Provincia de Marga Marga',7,NULL,NULL,NULL,NULL),(22,'Provincia de Chacabuco',1,NULL,NULL,NULL,NULL),(23,'Provincia de Santiago',1,NULL,NULL,NULL,NULL),(24,'Provincia de Cordillera',1,NULL,NULL,NULL,NULL),(25,'Provincia de Maipo',1,NULL,NULL,NULL,NULL),(26,'Provincia de Melipilla',1,NULL,NULL,NULL,NULL),(27,'Provincia de Talagante',1,NULL,NULL,NULL,NULL),(28,'Provincia de Cachapoal',8,NULL,NULL,NULL,NULL),(29,'Provincia de Colchagua',8,NULL,NULL,NULL,NULL),(30,'Provincia de Cardenal Caro',8,NULL,NULL,NULL,NULL),(31,'Provincia de Curicó',9,NULL,NULL,NULL,NULL),(32,'Provincia de Talca',9,NULL,NULL,NULL,NULL),(33,'Provincia de Linares',9,NULL,NULL,NULL,NULL),(34,'Provincia de Cauquenes',9,NULL,NULL,NULL,NULL),(35,'Provincia de Biobío',10,NULL,NULL,NULL,NULL),(36,'Provincia de Concepción',10,NULL,NULL,NULL,NULL),(37,'Provincia de Arauco',10,NULL,NULL,NULL,NULL),(38,'Provincia de Malleco',11,NULL,NULL,NULL,NULL),(39,'Provincia de Cautín',11,NULL,NULL,NULL,NULL),(40,'Provincia de Valdivia',12,NULL,NULL,NULL,NULL),(41,'Provincia de Ranco',12,NULL,NULL,NULL,NULL),(42,'Provincia de Osorno',13,NULL,NULL,NULL,NULL),(43,'Provincia de Llanquihue',13,NULL,NULL,NULL,NULL),(44,'Provincia de Chiloé',13,NULL,NULL,NULL,NULL),(45,'Provincia de Palena',13,NULL,NULL,NULL,NULL),(46,'Provincia de Coyhaique',14,NULL,NULL,NULL,NULL),(47,'Provincia de Aysén',14,NULL,NULL,NULL,NULL),(48,'Provincia de General Carrera',14,NULL,NULL,NULL,NULL),(49,'Provincia de Capitán Prat',14,NULL,NULL,NULL,NULL),(50,'Provincia de Última Esperanza',15,NULL,NULL,NULL,NULL),(51,'Provincia de Magallanes',15,NULL,NULL,NULL,NULL),(52,'Provincia de Tierra del Fuego',15,NULL,NULL,NULL,NULL),(53,'Provincia de Antártica chilena',15,NULL,NULL,NULL,NULL),(54,'Provincia de Itata',16,NULL,NULL,NULL,NULL),(55,'Provincia de Punilla',16,NULL,NULL,NULL,NULL),(56,'Provincia de Diguillín',16,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Receta`
--

DROP TABLE IF EXISTS `Receta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Receta` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Recetacol` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Atencion_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receta_atencion_id_foreign` (`Atencion_id`),
  CONSTRAINT `receta_atencion_id_foreign` FOREIGN KEY (`Atencion_id`) REFERENCES `Atencion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Receta`
--

LOCK TABLES `Receta` WRITE;
/*!40000 ALTER TABLE `Receta` DISABLE KEYS */;
/*!40000 ALTER TABLE `Receta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Region`
--

DROP TABLE IF EXISTS `Region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Region` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Region`
--

LOCK TABLES `Region` WRITE;
/*!40000 ALTER TABLE `Region` DISABLE KEYS */;
INSERT INTO `Region` VALUES (1,'Region Meropolitana',NULL,NULL,NULL,NULL),(2,'XV Arica y Parinacota',NULL,NULL,NULL,NULL),(3,'I Tarapacá',NULL,NULL,NULL,NULL),(4,'II Antofagasta',NULL,NULL,NULL,NULL),(5,'III Atacama',NULL,NULL,NULL,NULL),(6,'IV Coquimbo',NULL,NULL,NULL,NULL),(7,'V Valparaíso',NULL,NULL,NULL,NULL),(8,'VI  O\'Higgins',NULL,NULL,NULL,NULL),(9,'VII Maule',NULL,NULL,NULL,NULL),(10,'VIII Biobío',NULL,NULL,NULL,NULL),(11,'IX Araucanía',NULL,NULL,NULL,NULL),(12,'XIV Los Ríos',NULL,NULL,NULL,NULL),(13,'X Los Lagos',NULL,NULL,NULL,NULL),(14,'XI Aysén',NULL,NULL,NULL,NULL),(15,'XII Magallanes y Antártica',NULL,NULL,NULL,NULL),(16,'XVI Ñuble',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
INSERT INTO `Role` VALUES (1,'Jefatura',NULL,NULL,NULL,NULL),(2,'Administrador',NULL,NULL,NULL,NULL),(3,'Médico',NULL,NULL,NULL,NULL),(4,'Paciente',NULL,NULL,NULL,NULL),(5,'Secretaría',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoBox`
--

DROP TABLE IF EXISTS `TipoBox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TipoBox` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoBox`
--

LOCK TABLES `TipoBox` WRITE;
/*!40000 ALTER TABLE `TipoBox` DISABLE KEYS */;
/*!40000 ALTER TABLE `TipoBox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TipoSangre`
--

DROP TABLE IF EXISTS `TipoSangre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TipoSangre` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TipoSangre`
--

LOCK TABLES `TipoSangre` WRITE;
/*!40000 ALTER TABLE `TipoSangre` DISABLE KEYS */;
INSERT INTO `TipoSangre` VALUES (1,' O negativo',' Este tipo de sangre no tiene marcadores A ni B y tampoco presenta el factor Rh.',NULL,NULL,NULL,NULL),(2,'O positivo','Este tipo de sangre no tiene marcadores A ni B pero sí que presenta el factor Rh. Se trata de uno de los dos tipos de sangre más frecuentes (junto al A positivo).',NULL,NULL,NULL,NULL),(3,'A negativo','Este tipo de sangre solo tiene el marcador A.',NULL,NULL,NULL,NULL),(4,'A positivo','Este tipo de sangre tiene el marcador A y el factor Rh, pero carece del marcador B. Junto con el O positivo, se trata de uno de los dos tipos de sangre más frecuentes.',NULL,NULL,NULL,NULL),(5,'B negativo','Este tipo de sangre solo tiene el marcador B.',NULL,NULL,NULL,NULL),(6,'B positivo','Este tipo de sangre tiene el marcador B y el factor Rh, pero carece del marcador A.',NULL,NULL,NULL,NULL),(7,'AB negativo','Este tipo de sangre tiene los marcadores A y B, pero carece del factor Rh.',NULL,NULL,NULL,NULL),(8,'AB positivo','Este tipo de sangre tiene los tres marcadores: A, B y factor Rh.',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `TipoSangre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UsoMedicamento`
--

DROP TABLE IF EXISTS `UsoMedicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UsoMedicamento` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaInicio` date DEFAULT NULL,
  `Medicamento_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usomedicamento_medicamento_id_foreign` (`Medicamento_id`),
  KEY `usomedicamento_paciente_id_foreign` (`Paciente_id`),
  CONSTRAINT `usomedicamento_medicamento_id_foreign` FOREIGN KEY (`Medicamento_id`) REFERENCES `Medicamento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usomedicamento_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UsoMedicamento`
--

LOCK TABLES `UsoMedicamento` WRITE;
/*!40000 ALTER TABLE `UsoMedicamento` DISABLE KEYS */;
INSERT INTO `UsoMedicamento` VALUES (1,'2009-02-01',1,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `UsoMedicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `confirmation_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Role_id` int(10) unsigned DEFAULT NULL,
  `Persona_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_role_id_foreign` (`Role_id`),
  KEY `usuario_persona_id_foreign` (`Persona_id`),
  CONSTRAINT `usuario_persona_id_foreign` FOREIGN KEY (`Persona_id`) REFERENCES `Persona` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usuario_role_id_foreign` FOREIGN KEY (`Role_id`) REFERENCES `Role` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,'Jefatura@Jefatura.cl','$2y$10$x4iCqckQqZtuUkBeGzD90.huU04IxCJtXcbekIi1mzhuT4lVb9IZG',1,NULL,1,1,NULL,NULL,NULL,NULL),(2,'Administrador@Administrador.cl','$2y$10$7IHQuKbbH5rAzsnaEyqNs.At1JrPDxg9CLTB0wtXJDqV2ZlfgPZbi',1,NULL,2,2,NULL,NULL,NULL,NULL),(3,'Medico@Medico.cl','$2y$10$HQBYD2SFGAUz641tPNc6keRLGh2dEsI451IDb5M2b8z8IN026lFGi',1,NULL,3,3,NULL,NULL,NULL,NULL),(4,'Paciente@Paciente.cl','$2y$10$I0UnWSjP/XiNdSOzYSRxL.r2qK/LMlm8bWIs7t6yWJ3Ge1Z2QMuuS',1,NULL,4,4,NULL,NULL,NULL,NULL),(5,'Secretaria@Secretaria.cl','$2y$10$OfmCopxZLvP8gVQt6kGFk.4OrukzZR2xekTNxFziXzUFD36E1NPdy',1,NULL,5,5,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vacuna`
--

DROP TABLE IF EXISTS `Vacuna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vacuna` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vacuna`
--

LOCK TABLES `Vacuna` WRITE;
/*!40000 ALTER TABLE `Vacuna` DISABLE KEYS */;
INSERT INTO `Vacuna` VALUES (1,'Vacuna BCG',NULL,NULL,NULL,NULL),(2,'Vacuna pentavalente',NULL,NULL,NULL,NULL),(3,'Vacuna Polio',NULL,NULL,NULL,NULL),(4,'Vacuna meningococo',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Vacuna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VacunasPaciente`
--

DROP TABLE IF EXISTS `VacunasPaciente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `VacunasPaciente` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fechaVacunacion` date DEFAULT NULL,
  `Vacuna_id` int(10) unsigned DEFAULT NULL,
  `Paciente_id` int(10) unsigned DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vacunaspaciente_vacuna_id_foreign` (`Vacuna_id`),
  KEY `vacunaspaciente_paciente_id_foreign` (`Paciente_id`),
  CONSTRAINT `vacunaspaciente_paciente_id_foreign` FOREIGN KEY (`Paciente_id`) REFERENCES `Paciente` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vacunaspaciente_vacuna_id_foreign` FOREIGN KEY (`Vacuna_id`) REFERENCES `Vacuna` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VacunasPaciente`
--

LOCK TABLES `VacunasPaciente` WRITE;
/*!40000 ALTER TABLE `VacunasPaciente` DISABLE KEYS */;
INSERT INTO `VacunasPaciente` VALUES (1,'1999-02-01',1,1,NULL,NULL,NULL,NULL),(2,'1999-04-01',2,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `VacunasPaciente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ViaAdministracionMedicamento`
--

DROP TABLE IF EXISTS `ViaAdministracionMedicamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ViaAdministracionMedicamento` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ViaAdministracionMedicamento`
--

LOCK TABLES `ViaAdministracionMedicamento` WRITE;
/*!40000 ALTER TABLE `ViaAdministracionMedicamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `ViaAdministracionMedicamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=603 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (560,'2017_11_01_205111_Especialidad',1),(561,'2017_11_01_205259_Modulo',1),(562,'2017_11_01_205416_Prevision',1),(563,'2017_11_01_205507_Region',1),(564,'2017_11_01_205556_Provincia',1),(565,'2017_11_01_205600_Comuna',1),(566,'2017_11_01_205716_Role',1),(567,'2017_11_01_205809_PermisoModulo',1),(568,'2017_11_01_205910_EstadoCivil',1),(569,'2017_11_01_210013_Genero',1),(570,'2017_11_01_210055_Persona',1),(571,'2017_11_01_210148_PrevisionActual',1),(572,'2017_11_01_210256_Usuario',1),(573,'2017_11_01_210343_TipoSangre',1),(574,'2017_11_01_210534_TipoBox',1),(575,'2017_11_01_210616_BoxConsulta',1),(576,'2017_11_01_210657_EstadoCita',1),(577,'2017_11_01_210911_Medico',1),(578,'2017_11_14_054502_disponibilidad',1),(579,'2017_12_07_040114_Vacuna',1),(580,'2017_12_07_040153_HabitoSexual',1),(581,'2017_12_07_040216_Habito',1),(582,'2017_12_07_040256_EnfermedadCronica',1),(583,'2017_12_07_040316_Ocupacion',1),(584,'2017_12_07_040630_Alergia',1),(585,'2017_12_07_040705_GrupoEtnico',1),(586,'2017_12_07_043046_Paciente',1),(587,'2017_12_07_043306_VacunasPaciente',1),(588,'2017_12_07_043317_HabitosSexualesPaciente',1),(589,'2017_12_07_043339_HabitosPaciente',1),(590,'2017_12_07_043408_EnfermedadesCronicasPaciente',1),(591,'2017_12_07_043419_AlergiasComunesPaciente',1),(592,'2017_12_07_044801_Cita',1),(593,'2017_12_07_044834_Diagnostico',1),(594,'2017_12_07_044904_ViaAdministracionMedicamento',1),(595,'2017_12_07_044921_Medicamento',1),(596,'2017_12_07_045506_UsoMedicamento',1),(597,'2017_12_07_045825_AlergiasMedicamentosPaciente',1),(598,'2017_12_08_031018_ExamenFisico',1),(599,'2017_12_08_031741_Atencion',1),(600,'2017_12_08_031839_DiagnosticosAtencion',1),(601,'2017_12_08_032020_Receta',1),(602,'2017_12_08_032104_MedicamentosReceta',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-12-20 10:21:59
