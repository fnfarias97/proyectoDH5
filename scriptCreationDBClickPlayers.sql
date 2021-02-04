-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema clickPlayers
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema clickPlayers
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `clickPlayers` ;
USE `clickPlayers` ;

-- -----------------------------------------------------
-- Table `clickPlayers`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickPlayers`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NOT NULL,
  `second_name` VARCHAR(30) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `privileges` VARCHAR(45) NOT NULL DEFAULT 'client',
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clickPlayers`.`productCategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickPlayers`.`product_categories` (
  `id` INT NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clickPlayers`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickPlayers`.`brands` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clickPlayers`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickPlayers`.`products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `price` DOUBLE NOT NULL,
  `avatar` TINYTEXT NOT NULL,
  `description` TEXT(1000) NOT NULL,
  `product_categories_id` INT NOT NULL,
  `brand_id` INT NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`id`, `product_categories_id`, `brand_id`),
  INDEX `fk_products_product_categories1_idx` (`product_categories_id` ASC),
  INDEX `fk_products_brand1_idx` (`brand_id` ASC),
  CONSTRAINT `fk_products_productCategories1`
    FOREIGN KEY (`product_categories_id`)
    REFERENCES `clickPlayers`.`product_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_brand1`
    FOREIGN KEY (`brand_id`)
    REFERENCES `clickPlayers`.`brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clickPlayers`.`payMethods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickPlayers`.`pay_methods` (
  `id` INT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clickPlayers`.`sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickPlayers`.`sales` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Users_id` INT UNSIGNED NOT NULL,
  `Products_id` INT UNSIGNED NOT NULL,
  `pay_methods_id` INT NOT NULL,
  `total` DECIMAL NOT NULL,
  PRIMARY KEY (`id`, `Users_id`, `Products_id`, `pay_methods_id`),
  INDEX `fk_Usuarios_has_Cursos_Cursos1_idx` (`Products_id` ASC),
  INDEX `fk_Usuarios_has_Cursos_Usuarios1_idx` (`Users_id` ASC),
  INDEX `fk_sales_pay_methods1_idx` (`pay_methods_id` ASC),
  CONSTRAINT `fk_Usuarios_has_Cursos_Usuarios1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `clickPlayers`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Cursos_Cursos1`
    FOREIGN KEY (`Products_id`)
    REFERENCES `clickPlayers`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_pay_methods1`
    FOREIGN KEY (`pay_methods_id`)
    REFERENCES `clickPlayers`.`pay_methods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clickPlayers`.`favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickPlayers`.`favorites` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_id` INT UNSIGNED NOT NULL,
  `products_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `products_id`),
  INDEX `fk_users_has_products_products2_idx` (`products_id` ASC),
  INDEX `fk_users_has_products_users2_idx` (`users_id` ASC),
  CONSTRAINT `fk_users_has_products_users2`
    FOREIGN KEY (`users_id`)
    REFERENCES `clickPlayers`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_products_products2`
    FOREIGN KEY (`products_id`)
    REFERENCES `clickPlayers`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `clickPlayers`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `clickPlayers`.`cart` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_id` INT UNSIGNED NOT NULL,
  `products_id` INT UNSIGNED NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `products_id`),
  INDEX `fk_cart_users1_idx` (`users_id` ASC),
  INDEX `fk_cart_products1_idx` (`products_id` ASC),
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `clickPlayers`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `clickPlayers`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
