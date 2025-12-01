export interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonDetails {
  abilities: string[];
  hp: number;
  height: number;
  weight: number;
}