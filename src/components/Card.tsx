import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Loading from "../components/Loading"

interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

interface PokemonType {
  type: {
    name: string;
  };
}

const Card = () => {
  const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-cyan-400",
    fighting: "bg-orange-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-stone-500",
    ghost: "bg-violet-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-700",
    steel: "bg-gray-500",
    fairy: "bg-pink-400",
  };

  const [pokemon, setPokemon] = useState<PokemonData[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const[loading, setloading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
            page * limit
          }`
        );

        setTotal(response.data.count);
        const results = response.data.results;

        const pokemonData: PokemonData[] = await Promise.all(
          results.map(async (p: { name: string; url: string }) => {
            const details = await axios.get(p.url);
            return {
              id: details.data.id,
              name: details.data.name,
              sprite: details.data.sprites.front_default,
              types: details.data.types.map((t: PokemonType) => t.type.name),
            };
          })
        );
        setPokemon(pokemonData);
      } catch (err) {
        console.error("Error fetching sprites.", err);
      } finally {
        setloading(false);
      }
    };
    fetchPokemon();
  }, [page]);

  if(loading) {
    return(
      <div>
        <p className="max-h-screen flex items-center justify-center text-5xl font-extrabold text-gray-400">Loading Pokedex...</p>
        {/* <Loading /> */}
        <div className="text-red-500 text-8xl">
          podjh
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {pokemon.map((p) => (
          <Link to={`/pokemon/${p.id}`} key={p.id}>
            <div className="bg-gray-100 p-5 rounded-2xl max-w-xs border-2 border-gray-100 shadow-md hover:border-gray-200 hover:cursor-pointer">
              <div className="flex justify-between font-semibold text-gray-500">
                <p>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</p>
                <p>#{p.id.toString().padStart(4, "0")}</p>
              </div>
              <img
                src={p.sprite}
                alt={p.name}
                className="mx-auto w-32 h-32"
              />
              <div className="mt-4 flex space-x-2 justify-center items-center">
                {p.types.map((type, id) => (
                  <p
                    key={id}
                    className={`${
                      typeColors[type] || "bg-gray-300"
                    } rounded-full font-bold text-white py-1 px-2`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage(0)}
          disabled={page === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          First
        </button>

        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="flex items-center font-semibold">
          Page {page + 1} of {Math.ceil(total / limit)}
        </span>

        <button
          onClick={() =>
            setPage((prev) =>
              prev + 1 < Math.ceil(total / limit) ? prev + 1 : prev
            )
          }
          disabled={(page + 1) * limit >= total}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>

        <button
          onClick={() => setPage(Math.ceil(total / limit) - 1)}
          disabled={(page + 1) * limit >= total}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Card;
