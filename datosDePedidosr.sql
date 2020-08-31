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

/*Data for the table `pedidos` */

insert  into `pedidos`(`id`,`id_cliente`,`estado`,`tipo_retiro`,`created_at`,`updated_at`) values (46,1,'confirmado',1,'2020-06-21 16:13:47','2020-06-27 17:25:34'),(47,1,'pendiente',0,'2020-06-21 16:17:58','2020-06-21 16:17:58'),(48,1,'demorado',0,'2020-06-21 10:21:50','2020-08-06 10:21:50'),(49,1,'listo',0,'2020-08-06 10:22:40','2020-08-06 10:22:40'),(50,1,'entregado',0,'2020-08-06 10:25:30','2020-08-06 10:25:30'),(51,1,'cancelado',1,'2020-08-06 10:29:09','2020-08-06 10:29:09'),(52,1,'entregado',1,'2020-08-07 00:00:43','2020-08-07 00:00:43'),(53,1,'cancelado',1,'2020-06-21 00:01:56','2020-08-07 00:01:56');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
