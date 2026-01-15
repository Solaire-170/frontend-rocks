import { useEffect, useState } from "react";
import { PokeAPI } from "./api";

const typeColors: Record<string, string> = {
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-black",
  psychic: "bg-pink-500 text-white",
  ice: "bg-cyan-300 text-black",
  dragon: "bg-purple-700 text-white",
  dark: "bg-gray-800 text-white",
  fairy: "bg-pink-300 text-black",
  normal: "bg-gray-300 text-black",
  fighting: "bg-orange-700 text-white",
  flying: "bg-indigo-300 text-black",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  rock: "bg-yellow-800 text-white",
  bug: "bg-lime-500 text-black",
  ghost: "bg-indigo-800 text-white",
  steel: "bg-gray-500 text-white",
};

type Props = {
  id: number;
  image: string;
  name: string;
  types: string[];
};

export const Card: React.FC<Props> = ({ id, image, name, types }) => {
  return (
    <div className="w-60 border-2 bg-white rounded-lg shadow-lg p-4 flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center w-full mb-2">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600 text-sm">ID: {id}</p>
      </div>
      <img src={image} alt={name} className="w-30 h-20 object-contain mb-2" />
      <div className="flex space-x-2">
        {types.map((type) => (
          <span
            key={type}
            className={`px-2 py-1 text-sm ${typeColors[type] || "bg-gray-200 text-black"}`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export function fetchData() {
  useEffect(() => {
    PokeAPI.listPokemons()
      .then((response) => console.log(response))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
}

export function Root() {
  const [pokemons, setPokemons] = useState<
    { id: number; image: string; name: string; types: string[] }[]
  >([]);

  useEffect(() => {
    PokeAPI.listPokemons()
      .then(async (response) => {
        const transformedPokemons = await Promise.all(
          response.results.map(async (pokemon: any) => {
            const pokemonDetail = await PokeAPI.getPokemonByName(pokemon.name);
            return {
              id: pokemonDetail.id,
              image:
                pokemonDetail.sprites?.other?.["official-artwork"]
                  ?.front_default || "",
              name: pokemonDetail.name,
              types: pokemonDetail.types?.map((t: any) => t.type.name) || [],
            };
          })
        );
        setPokemons(transformedPokemons);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  fetchData();

  return (
    <div className="pt-4 pl-4 space-x-4 flex items-start justify-start flex-wrap space-y-4">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          image={pokemon.image}
          name={pokemon.name}
          types={pokemon.types}
        />
      ))}
    </div>
  );
}
