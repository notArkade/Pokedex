import axios from "axios";
import { useEffect, useState } from "react";

interface PokemonData {
  name: string;
  sprite: string;
}

const Card = () => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon/pikachu"
        );
        setPokemon({
          name: response.data.name,
          sprite: response.data.sprites.front_default,
        });
      } catch (err) {
        console.error("error fetching sprites.", err);
      }
    };
    fetchPokemon();
  }, []);
  return (
    <>
      {pokemon && (
        <div className="bg-gray-100 p-5 rounded-2xl max-w-xs shadow-md">
          <div className="flex justify-between">
            <p>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
            <p>#0000</p>
          </div>
          <img src={pokemon.sprite} alt={pokemon.name} />
          <div className="mt-4">
            <div
              className="flex space-x-4 justify-center items-center"
              id="types"
            >
              <p className="bg-yellow-400 rounded-xl font-bold text-white py-1 px-2">
                Electric
              </p>
              <p className="bg-yellow-400 rounded-xl font-bold text-white py-1 px-2">
                Electric
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
