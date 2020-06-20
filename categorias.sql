/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.11-MariaDB : Database - db_buen_sabor_lab4
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
USE `db_buen_sabor_lab4`;

/*Data for the table `categoria` */

insert  into `categoria`(`id`,`nombre`,`tipo`,`created_at`,`updated_at`) values (1,'Gaseosas','bebidas','2020-06-14 20:24:40','2020-06-14 20:24:40'),(2,'verduras','insumos','2020-06-14 21:00:04','2020-06-14 21:00:04'),(3,'lacteos','insumos','2020-06-14 21:00:12','2020-06-14 21:00:12'),(4,'prepizzas','semielaborados','2020-06-14 21:00:27','2020-06-14 21:00:27'),(5,'hamburguesas','elaborados','2020-06-14 21:00:43','2020-06-14 21:00:43'),(6,'ingredientes','insumos','2020-06-14 21:03:52','2020-06-14 21:03:52'),(7,'carnes','insumos','2020-06-15 10:49:50','2020-06-15 10:49:50'),(8,'medallones','semielaborados','2020-06-15 10:51:43','2020-06-15 10:51:43'),(9,'con alcohol','bebidas','2020-06-15 10:58:23','2020-06-15 10:58:23');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
