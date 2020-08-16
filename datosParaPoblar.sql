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

/*Data for the table `articulos` */

insert  into `articulos`(`id`,`nombre`,`nombre_img`,`unidad_medida`,`stock_actual`,`stock_maximo`,`stock_minimo`,`created_at`,`updated_at`,`categoria_id`) values (3,'queso','1595625790921.png','kg',4.9,1,0.2,'2020-06-14 21:02:21','2020-06-29 10:20:57',3),(4,'tomate','1595625318161.jpg','kg',11.8,1,0.2,'2020-06-14 21:02:40','2020-06-29 10:20:57',2),(5,'lechuga','1592096375460.jpg','kg',0,1,0.2,'2020-06-14 21:02:50','2020-06-14 21:02:50',2),(6,'harina','1592103005078.jpg','kg',0,1,0.2,'2020-06-14 21:05:56','2020-06-14 21:05:56',6),(8,'prepizza','1592103590490.jpg','unidad',14,55,10,'2020-06-15 01:25:12','2020-06-29 10:20:57',4),(9,'manteca','1595625837981.jpg','kg',0,1,0.2,'2020-06-15 10:44:29','2020-06-15 10:44:29',6),(10,'carne molida','1595625980421.jpg','kg',2.4000000000000004,1,0.2,'2020-06-15 10:51:06','2020-06-15 14:38:44',7),(11,'huevo','1595625989722.jpg','unidad',11.6,200,20,'2020-06-15 10:56:24','2020-06-15 14:38:44',6),(13,'medallon vacuno 150g','Sin imagen','unidad',38,55,10,'2020-06-15 11:01:57','2020-06-27 17:25:34',8),(14,'Quilmes 1.5L','Sin imagen','unidad',43,120,40,'2020-06-19 01:26:42','2020-06-27 17:25:34',9),(15,'Coca-Cola 1.5L','Sin imagen','unidad',35,140,30,'2020-06-19 02:07:28','2020-06-29 10:27:32',1);

/*Data for the table `bebidas` */

insert  into `bebidas`(`id`,`created_at`,`updated_at`,`articulo_id`) values (14,'2020-06-19 01:26:42','2020-06-19 01:26:42',14),(15,'2020-06-19 02:07:28','2020-06-19 02:07:28',15);

/*Data for the table `categoria` */

insert  into `categoria`(`id`,`nombre`,`tipo`,`created_at`,`updated_at`) values (1,'Gaseosas','bebidas','2020-06-14 20:24:40','2020-06-14 20:24:40'),(2,'verduras','insumos','2020-06-14 21:00:04','2020-06-14 21:00:04'),(3,'lacteos','insumos','2020-06-14 21:00:12','2020-06-14 21:00:12'),(4,'prepizzas','semielaborados','2020-06-14 21:00:27','2020-06-14 21:00:27'),(5,'hamburguesas','elaborados','2020-06-14 21:00:43','2020-06-14 21:00:43'),(6,'ingredientes','insumos','2020-06-14 21:03:52','2020-06-14 21:03:52'),(7,'carnes','insumos','2020-06-15 10:49:50','2020-06-15 10:49:50'),(8,'medallones','semielaborados','2020-06-15 10:51:43','2020-06-15 10:51:43'),(9,'con alcohol','bebidas','2020-06-15 10:58:23','2020-06-15 10:58:23'),(10,'pizzas','elaborados','2020-06-19 02:00:10','2020-06-19 02:00:10');

/*Data for the table `detalle__pedidos` */

insert  into `detalle__pedidos`(`id`,`id_pedido`,`cantidad`,`precio_detalle`,`created_at`,`updated_at`,`elaborado_id`,`bebida_id`) values (43,46,3,390,'2020-06-21 16:13:47','2020-06-21 16:13:47',NULL,14),(44,46,3,1500,'2020-06-21 16:13:47','2020-06-21 16:13:47',2,NULL),(47,47,3,390,'2020-06-21 16:17:58','2020-06-21 16:17:58',NULL,14),(48,47,3,1500,'2020-06-21 16:17:58','2020-06-21 16:17:58',2,NULL);

/*Data for the table `detalle_elaborados` */

insert  into `detalle_elaborados`(`id`,`cantidad`,`created_at`,`updated_at`,`elaborado_id`,`articulo_id`) values (49,0.1,'2020-06-19 01:56:21','2020-06-19 01:56:21',2,4),(50,0.3,'2020-06-19 01:56:21','2020-06-19 01:56:21',2,3),(51,1,'2020-06-19 01:56:21','2020-06-19 01:56:21',2,13),(52,0.2,'2020-06-19 02:02:30','2020-06-19 02:02:30',3,3),(53,0.1,'2020-06-19 02:02:30','2020-06-19 02:02:30',3,4),(54,1,'2020-06-19 02:02:30','2020-06-19 02:02:30',3,8);

/*Data for the table `detalle_semielaborados` */

insert  into `detalle_semielaborados`(`id`,`cantidad`,`created_at`,`updated_at`,`insumo_id`,`semielaborado_id`) values (3,0.5,'2020-06-15 01:25:12','2020-06-15 01:25:12',3,8),(4,0.1,'2020-06-15 01:25:12','2020-06-15 01:25:12',4,8),(5,0.15,'2020-06-15 11:01:57','2020-06-15 11:01:57',10,13),(6,0.1,'2020-06-15 11:01:57','2020-06-15 11:01:57',11,13);

/*Data for the table `domicilios` */

/*Data for the table `elaborados` */

insert  into `elaborados`(`id`,`nombre`,`nombre_img`,`detalle`,`tiempo_elaboracion`,`es_catalogo`,`created_at`,`updated_at`,`categoria_id`) values (2,'hamburguesa completa','Sin imagen','cheddar, huevo, tomate, lechuga y cebolla caramelizada',30,1,'2020-06-19 01:34:05','2020-06-19 01:56:10',5),(3,'pizza napolitana','Sin imagen','muzzarela, tomate',25,1,'2020-06-19 02:02:30','2020-06-19 02:02:30',10);

/*Data for the table `existencia` */

insert  into `existencia`(`id`,`cantidad`,`costo_por_unidad`,`fecha_vencimiento`,`created_at`,`updated_at`,`articulo_id`) values (1,3,500,'2020-06-15 00:00:00','2020-06-29 10:17:46','2020-06-29 10:17:46',3),(2,4.5,100,'2020-07-15 00:00:00','2020-06-29 10:18:30','2020-06-29 10:18:30',4),(3,25,65,'2020-07-15 00:00:00','2020-06-29 10:19:22','2020-06-29 10:19:22',15),(4,10,65,'2020-07-15 00:00:00','2020-06-29 10:20:57','2020-06-29 10:20:57',8),(5,10,65,'2020-07-15 00:00:00','2020-06-29 10:27:32','2020-06-29 10:27:32',15);

/*Data for the table `facturas` */

/*Data for the table `insumos` */

insert  into `insumos`(`id`,`created_at`,`updated_at`,`articulo_id`) values (3,'2020-06-14 21:02:21','2020-06-14 21:02:21',3),(4,'2020-06-14 21:02:40','2020-06-14 21:02:40',4),(5,'2020-06-14 21:02:50','2020-06-14 21:02:50',5),(6,'2020-06-14 21:05:56','2020-06-14 21:05:56',6),(9,'2020-06-15 10:44:29','2020-06-15 10:44:29',9),(10,'2020-06-15 10:51:06','2020-06-15 10:51:06',10),(11,'2020-06-15 10:56:24','2020-06-15 10:56:24',11);

/*Data for the table `localidads` */

/*Data for the table `oferta` */

insert  into `oferta`(`id`,`porcentaje_descuento`,`created_at`,`updated_at`,`elaborado_id`,`bebida_id`) values (1,15,'2020-06-29 22:53:57','2020-06-29 22:53:57',NULL,14),(2,20,'2020-06-29 22:54:33','2020-06-29 22:54:33',2,NULL);

/*Data for the table `pais` */

/*Data for the table `pedidos` */

insert  into `pedidos`(`id`,`id_cliente`,`estado`,`tipo_retiro`,`created_at`,`updated_at`) values (46,1,'confirmado',1,'2020-06-21 16:13:47','2020-06-27 17:25:34'),(47,1,'porConfirmar',2,'2020-06-21 16:17:58','2020-06-21 16:17:58');

/*Data for the table `precios` */

insert  into `precios`(`id`,`monto`,`tipo_moneda`,`created_at`,`updated_at`,`elaborado_id`,`bebida_id`) values (1,130,NULL,'2020-06-19 01:26:42','2020-06-19 01:26:42',NULL,14),(2,300,NULL,'2020-06-19 01:34:05','2020-06-19 01:34:05',2,NULL),(8,500,NULL,'2020-06-19 01:56:21','2020-06-19 01:56:21',2,NULL),(9,250,NULL,'2020-06-19 02:02:30','2020-06-19 02:02:30',3,NULL),(10,120,NULL,'2020-06-19 02:07:28','2020-06-19 02:07:28',NULL,15),(11,130,NULL,'2020-06-19 02:08:06','2020-06-19 02:08:06',NULL,15);

/*Data for the table `provincia` */

/*Data for the table `rols` */

insert  into `rols`(`id`,`rol`,`created_at`,`updated_at`,`usuario_id`) values (1,'ADMINISTRADOR','2020-06-20 22:44:07','2020-06-20 22:44:07',1);

/*Data for the table `semielaborados` */

insert  into `semielaborados`(`id`,`costo_fabricacion`,`created_at`,`updated_at`,`articulo_id`) values (8,17.5,'2020-06-15 01:25:12','2020-06-15 01:25:12',8),(13,17.5,'2020-06-15 11:01:57','2020-06-15 11:01:57',13);

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombre`,`email`,`telefono`,`rol`,`password`,`provider`,`provider_id`,`created_at`,`updated_at`) values (1,'Xerito','xerito@gmail.com','2615553323',NULL,'$2a$10$zeSNiQK4el3oHPa/45iEGuv5vt2T7DeimvzzA4vAB5HTaDWftMfeu',NULL,NULL,'2020-06-20 22:44:07','2020-06-20 22:44:07');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
