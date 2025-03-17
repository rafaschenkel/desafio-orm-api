export interface CreateJogoDto {
  nome: string;
  genero: string;
  preco: number;
  tamanho: number;
  dtLancamento: Date;
  multiplayer: boolean;
}
