-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema nodejs
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema nodejs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `nodejs` DEFAULT CHARACTER SET utf8 ;
USE `nodejs` ;

-- -----------------------------------------------------
-- Table `nodejs`.`days`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nodejs`.`days` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `time_total` INT(11) NULL DEFAULT NULL,
  `flag` VARCHAR(45) NULL DEFAULT NULL,
  `available` INT(11) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 216
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `nodejs`.`tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `nodejs`.`tasks` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `time` INT(11) NULL DEFAULT NULL,
  `days_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tasks_days_idx` (`days_id` ASC),
  CONSTRAINT `fk_tasks_days`
    FOREIGN KEY (`days_id`)
    REFERENCES `nodejs`.`days` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 176
DEFAULT CHARACTER SET = utf8;


---------------------------------------------------crear el dia lunes-----------------
INSERT INTO `nodejs`.`days` (`name`, `time_total`, `flag`, `available`) VALUES ('Lunes', '0', '0', '16');



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
