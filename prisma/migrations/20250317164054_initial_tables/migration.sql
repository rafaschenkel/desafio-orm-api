-- CreateTable
CREATE TABLE "jogo" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "genero" VARCHAR(50) NOT NULL,
    "preco" DECIMAL(6,2) NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "dt_lancamento" DATE NOT NULL,
    "multiplayer" BOOLEAN NOT NULL,

    CONSTRAINT "jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personagem" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "idade" INTEGER NOT NULL,
    "forca" INTEGER NOT NULL,
    "inteligencia" INTEGER NOT NULL,
    "habilidades" TEXT NOT NULL,
    "id_jogo" UUID NOT NULL,

    CONSTRAINT "personagem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jogo_nome_key" ON "jogo"("nome");

-- AddForeignKey
ALTER TABLE "personagem" ADD CONSTRAINT "personagem_id_jogo_fkey" FOREIGN KEY ("id_jogo") REFERENCES "jogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
