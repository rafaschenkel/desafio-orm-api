/*
  Warnings:

  - You are about to alter the column `idade` on the `personagem` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `forca` on the `personagem` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `inteligencia` on the `personagem` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE "jogo" ALTER COLUMN "dt_lancamento" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "personagem" ALTER COLUMN "idade" SET DATA TYPE SMALLINT,
ALTER COLUMN "forca" SET DATA TYPE SMALLINT,
ALTER COLUMN "inteligencia" SET DATA TYPE SMALLINT;
