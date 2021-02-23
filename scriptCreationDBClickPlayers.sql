-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema clickplayers
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clickplayers
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clickplayers` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `clickplayers` ;

-- -----------------------------------------------------
-- Table `clickplayers`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickplayers`.`brands` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `clickplayers`.`product_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickplayers`.`product_categories` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `clickplayers`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickplayers`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `price` DOUBLE NOT NULL,
  `avatar` TINYTEXT NOT NULL,
  `description` TEXT NOT NULL,
  `product_categories_id` INT NOT NULL,
  `brand_id` INT NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`, `product_categories_id`, `brand_id`),
  INDEX `fk_products_product_categories1_idx` (`product_categories_id` ASC) VISIBLE,
  INDEX `fk_products_brand1_idx` (`brand_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_brand1`
    FOREIGN KEY (`brand_id`)
    REFERENCES `clickplayers`.`brands` (`id`),
  CONSTRAINT `fk_products_productCategories1`
    FOREIGN KEY (`product_categories_id`)
    REFERENCES `clickplayers`.`product_categories` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `clickplayers`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickplayers`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `second_name` VARCHAR(30) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `privileges` VARCHAR(45) NOT NULL DEFAULT 'client',
  `avatar` TINYTEXT NULL,
  `description` TEXT(1000) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `clickplayers`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickplayers`.`cart` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_id` INT UNSIGNED NOT NULL,
  `products_id` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `products_id`),
  INDEX `fk_cart_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_cart_products1_idx` (`products_id` ASC) VISIBLE,
  CONSTRAINT `fk_cart_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `clickplayers`.`products` (`id`),
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `clickplayers`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `clickplayers`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickplayers`.`favorites` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_id` INT UNSIGNED NOT NULL,
  `products_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `products_id`),
  INDEX `fk_users_has_products_products2_idx` (`products_id` ASC) VISIBLE,
  INDEX `fk_users_has_products_users2_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_products_products2`
    FOREIGN KEY (`products_id`)
    REFERENCES `clickplayers`.`products` (`id`),
  CONSTRAINT `fk_users_has_products_users2`
    FOREIGN KEY (`users_id`)
    REFERENCES `clickplayers`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `clickplayers`.`pay_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickplayers`.`pay_methods` (
  `id` INT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `clickplayers`.`sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickplayers`.`sales` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Users_id` INT UNSIGNED NOT NULL,
  `Products_id` INT UNSIGNED NOT NULL,
  `pay_methods_id` INT NOT NULL,
  `total` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`id`, `Users_id`, `Products_id`, `pay_methods_id`),
  INDEX `fk_Usuarios_has_Cursos_Cursos1_idx` (`Products_id` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Cursos_Usuarios1_idx` (`Users_id` ASC) VISIBLE,
  INDEX `fk_sales_pay_methods1_idx` (`pay_methods_id` ASC) VISIBLE,
  CONSTRAINT `fk_sales_pay_methods1`
    FOREIGN KEY (`pay_methods_id`)
    REFERENCES `clickplayers`.`pay_methods` (`id`),
  CONSTRAINT `fk_Usuarios_has_Cursos_Cursos1`
    FOREIGN KEY (`Products_id`)
    REFERENCES `clickplayers`.`products` (`id`),
  CONSTRAINT `fk_Usuarios_has_Cursos_Usuarios1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `clickplayers`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
