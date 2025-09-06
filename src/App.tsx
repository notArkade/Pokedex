import { useEffect, useState } from "react";
import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

const PokemonNames = () => {
  const [pokeList, setPokeList] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get<{ results: Pokemon[] }>(
          "https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0"
        );
        const names = res.data.results.map((p) => p.name);
        setPokeList(names);
      } catch (err) {
        console.error("error fetching pokemon.", err);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <>
      <div>
        <p>{pokeList.map((name, i) => (
          <li key={i}>{name}</li>
        ))}</p>
      </div>
    </>
  );
};

export default PokemonNames;
