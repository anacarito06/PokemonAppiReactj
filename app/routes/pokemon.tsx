import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";


export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") || 1);
  const limit = 20; // Cantidad de Pokémon por página
  const offset = (page - 1) * limit;

  // Petición a la API de Pokémon para obtener la lista paginada
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();

  return { pokemonList: data.results, page };
};

export default function PokemonList() {
  const {pokemonList, page }: any  = useLoaderData();

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <ul>
        {pokemonList.map((pokemon: any, index: number) => (
          <li key={index}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        {page > 1 && <Link to={`?page=${page - 1}`}><button>Anterior</button></Link>}
        <Link to={`?page=${page + 1}`}><button>Siguiente</button></Link>
      </div>
    </div>
  );
}