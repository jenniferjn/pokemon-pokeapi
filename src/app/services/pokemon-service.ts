import { Pokedex, Pokemon } from "../models/pokemon-model";

export async function getPokedex(url: string): Promise<Pokedex> {
  try {
    const response = await fetch(url);

    let data: Pokedex = await response.json();

    data = {
      ...data,
      results: await Promise.all(
        data.results.map(async (pokemon) => {
          let pokemonResult = await getPokemon(pokemon.url).then((result) => {
            return result;
          });
          return pokemonResult;
        })
      ),
    };

    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getPokemon(url: string): Promise<Pokemon> {
  try {
    const response = await fetch(url);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
