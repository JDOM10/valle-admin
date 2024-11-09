-- CreateTable
CREATE TABLE `Productor` (
    `proid` INTEGER NOT NULL AUTO_INCREMENT,
    `pronombre` VARCHAR(50) NOT NULL,
    `prodescripcion` VARCHAR(250) NOT NULL,
    `profoto` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`proid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Producto` ADD CONSTRAINT `Producto_proid_fkey` FOREIGN KEY (`proid`) REFERENCES `Productor`(`proid`) ON DELETE RESTRICT ON UPDATE CASCADE;
