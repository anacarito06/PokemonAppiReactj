import { Link,useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  
  if (!response.ok) {
    throw new Response("Pokémon Not Found", { status: 404 });
  }

  const pokemon = await response.json();

  return {
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    height: pokemon.height,
    weight: pokemon.weight,
    base_experience: pokemon.base_experience,
  };
};

export default function PokemonDetail() {
  const pokemon: any = useLoaderData();

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name}/>
      <ul>
        <li>Height: {pokemon.height}</li>
        <li>Weight: {pokemon.weight}</li>
        <li>Base Experience: {pokemon.base_experience}</li>
      </ul>
      <Link to="/pokemon"><button>Back to List</button></Link>
    </div>
  );
}