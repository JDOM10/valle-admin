-- CreateTable
CREATE TABLE `Cliente` (
    `clid` INTEGER NOT NULL AUTO_INCREMENT,
    `clinombre` VARCHAR(50) NOT NULL,
    `clicorreo` VARCHAR(50) NOT NULL,
    `clitelefono` VARCHAR(15) NOT NULL,
    `clici` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`clid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido` (
    `peid` INTEGER NOT NULL AUTO_INCREMENT,
    `pedfecha` DATETIME(3) NOT NULL,
    `pedtotal` DOUBLE NOT NULL,
    `clid` INTEGER NOT NULL,

    PRIMARY KEY (`peid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producto` (
    `prdid` INTEGER NOT NULL AUTO_INCREMENT,
    `proid` INTEGER NOT NULL,
    `prdnombre` VARCHAR(50) NOT NULL,
    `prddescripcion` VARCHAR(150) NOT NULL,
    `prdprecio` DOUBLE NOT NULL,
    `prdfoto` VARCHAR(255) NOT NULL,
    `prdcntnut` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`prdid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedido_Producto` (
    `ppcantidad` INTEGER NOT NULL,
    `peid` INTEGER NOT NULL,
    `prdid` INTEGER NOT NULL,

    UNIQUE INDEX `Pedido_Producto_prdid_peid_key`(`prdid`, `peid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pedido` ADD CONSTRAINT `Pedido_clid_fkey` FOREIGN KEY (`clid`) REFERENCES `Cliente`(`clid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido_Producto` ADD CONSTRAINT `Pedido_Producto_peid_fkey` FOREIGN KEY (`peid`) REFERENCES `Pedido`(`peid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedido_Producto` ADD CONSTRAINT `Pedido_Producto_prdid_fkey` FOREIGN KEY (`prdid`) REFERENCES `Producto`(`prdid`) ON DELETE RESTRICT ON UPDATE CASCADE;
