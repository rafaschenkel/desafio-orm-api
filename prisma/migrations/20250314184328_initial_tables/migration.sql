-- CreateTable
CREATE TABLE "Jogo" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "genero" VARCHAR(50) NOT NULL,
    "preco" DECIMAL(4,2) NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "dt_lancamento" DATE NOT NULL,
    "multiplayer" BOOLEAN NOT NULL,

    CONSTRAINT "Jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personagem" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "idade" INTEGER NOT NULL,
    "forca" SMALLINT NOT NULL,
    "inteligencia" SMALLINT NOT NULL,
    "habilidades" VARCHAR(80)[],

    CONSTRAINT "Personagem_pkey" PRIMARY KEY ("id")
);
