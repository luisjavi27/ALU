-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema aluDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aluDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aluDB` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema aludb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aludb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aludb` DEFAULT CHARACTER SET utf8 ;
USE `aluDB` ;

-- -----------------------------------------------------
-- Table `aluDB`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluDB`.`usuarios` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `idusuario_UNIQUE` (`idusuario` ASC) VISIBLE,
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  INDEX `idusuarioIDX` (`idusuario` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aluDB`.`monedero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluDB`.`monedero` (
  `idsaldo` INT NOT NULL AUTO_INCREMENT,
  `saldo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idsaldo`),
  INDEX `idsaldoIDX` (`idsaldo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aluDB`.`cuenta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluDB`.`cuenta` (
  `idcuenta` INT NOT NULL AUTO_INCREMENT,
  `idusuarioFK` INT NULL,
  `idsaldoFK` INT NULL,
  PRIMARY KEY (`idcuenta`),
  INDEX `idusuarioFK_idx` (`idusuarioFK` ASC) VISIBLE,
  INDEX `idsaldoFK_idx` (`idsaldoFK` ASC) VISIBLE,
  CONSTRAINT `idusuarioFK`
    FOREIGN KEY (`idusuarioFK`)
    REFERENCES `aluDB`.`usuarios` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idsaldoFK`
    FOREIGN KEY (`idsaldoFK`)
    REFERENCES `aluDB`.`monedero` (`idsaldo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aluDB`.`timestamps`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aluDB`.`timestamps` (
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL);

USE `aludb` ;

-- -----------------------------------------------------
-- Table `aludb`.`monedero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aludb`.`monedero` (
  `idsaldo` INT NOT NULL AUTO_INCREMENT,
  `saldo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idsaldo`),
  INDEX `idsaldoIDX` (`idsaldo` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `aludb`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aludb`.`usuarios` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `correo` VARCHAR(45) NOT NULL,
  `contraseña` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `idusuario_UNIQUE` (`idusuario` ASC) VISIBLE,
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  INDEX `idusuarioIDX` (`idusuario` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `aludb`.`cuenta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aludb`.`cuenta` (
  `idcuenta` INT NOT NULL AUTO_INCREMENT,
  `idusuarioFK` INT NULL DEFAULT NULL,
  `idsaldoFK` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idcuenta`),
  INDEX `idusuarioFK_idx` (`idusuarioFK` ASC) VISIBLE,
  INDEX `idsaldoFK_idx` (`idsaldoFK` ASC) VISIBLE,
  CONSTRAINT `idsaldoFK`
    FOREIGN KEY (`idsaldoFK`)
    REFERENCES `aludb`.`monedero` (`idsaldo`),
  CONSTRAINT `idusuarioFK`
    FOREIGN KEY (`idusuarioFK`)
    REFERENCES `aludb`.`usuarios` (`idusuario`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `aludb`.`movimientos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aludb`.`movimientos` (
  `idmovimientos` INT NOT NULL AUTO_INCREMENT,
  `timemovimiento` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `idcuentaFK` INT NOT NULL,
  `saldoanterior` INT NOT NULL,
  `saldonuevo` INT NOT NULL,
  PRIMARY KEY (`idmovimientos`),
  UNIQUE INDEX `idmovimientos_UNIQUE` (`idmovimientos` ASC) VISIBLE,
  INDEX `idcuentaFK_idx` (`idcuentaFK` ASC) VISIBLE,
  CONSTRAINT `idcuentaFK`
    FOREIGN KEY (`idcuentaFK`)
    REFERENCES `aludb`.`cuenta` (`idcuenta`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
