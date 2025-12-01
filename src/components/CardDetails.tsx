import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface PokemonDetails {
  abilities: string[];
  hp: number;
  height: number;
  weight: number;
  // cries: string;
  sprite: string;
  name: string;
}

const CardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const hpStat = response.data.stats.find(
          (s: any) => s.stat.name === "hp"
        )?.base_stat;

        const pokemonDetails: PokemonDetails = {
          abilities: response.data.abilities.map((a: any) => a.ability.name),
          hp: hpStat,
          height: response.data.height,
          weight: response.data.weight,
          // cries: response.data.cries?.latest || "",
          sprite: response.data.sprites.front_default,
          name: response.data.name,
        };

        setDetails(pokemonDetails);
      } catch (err) {
        console.error("Error fetching details.", err);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="p-6 flex flex-col items-center">
      {details ? (
        <div className="bg-gray-100 p-6 rounded-2xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4">
            {details.name.charAt(0).toUpperCase() + details.name.slice(1)}
          </h2>
          <img
            src={details.sprite}
            alt={details.name}
            className="mx-auto w-40 h-40"
          />
          <p className="mt-4">HP: {details.hp}</p>
          <p>Height: {details.height}</p>
          <p>Weight: {details.weight}</p>
          <p>Abilities: {details.abilities.join(", ")}</p>
          {/* {details.cries && (
            <audio controls className="mt-4">
              <source src={details.cries} type="audio/ogg" />
              Your browser does not support audio.
            </audio>
          )} */}
        </div>
      ) : (
        <p>Loading details...</p>
      )}
    </div>
  );
};

export default CardDetails;
