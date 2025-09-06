import { useState } from "react";
import axios from "axios";

const FetchingPokemon = () => {
  const [pokemonName, setPokemonName] = useState<string>("");

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      console.log(`Pokemon: ${pokemonName}`);
      console.log(response.data);
    } catch (err) {
      console.error("error fetching pokemon.", err);
    }
  };

  return (
    <div>
      <input
        className="border border-amber-800"
        type="text"
        onChange={(e) => {
          setPokemonName(e.target.value);
        }}
      />
      <button onClick={fetchPokemon}>GET</button>
      <p>Check console (F12) to get API details!</p>
    </div>
  );
};

export default FetchingPokemon;
