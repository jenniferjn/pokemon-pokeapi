"use client";

import { Pokemon } from "@/app/models/pokemon-model";
import { getPokemon } from "@/app/services/pokemon-service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Detail({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const urlPokemon = `https://pokeapi.co/api/v2/pokemon/${params.id}`;

  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    async function getPokemonDetail() {
      getPokemon(urlPokemon)
        .then(async (result) => {
          setPokemon(result);
          setIsLoading(false);
        })
        .catch(() => router.push("/404"));
    }

    getPokemonDetail();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="container text-center">
        <div className="flex p-6 justify-center">
          <img src="../Pokemon.png" className="w-96" alt="Pokemon Logo" />
        </div>
        {isLoading ? (
          <></>
        ) : (
          <>
            <div className="grid grid-cols-2 m-3 p-3 pb-5 items-center rounded bg-stone-800">
              <div className="flex justify-center">
                <img
                  src={pokemon.sprites.front_default}
                  className="w-80"
                  alt="Pokemon Front"
                />
              </div>
              <div className="text-left">
                <span className="capitalize font-bold pb-4 text-3xl">
                  {pokemon.name}
                </span>
                <div className="grid lg:grid-cols-2 text-left py-4">
                  {pokemon.types.map((type, index) => {
                    return (
                      <span className="capitalize" key={index}>
                        {type.type.name}
                      </span>
                    );
                  })}
                </div>
                <div className="grid lg:grid-cols-2">
                  {pokemon.stats.map((stat, index) => {
                    return (
                      <div key={index}>
                        <span className="capitalize">
                          {stat.stat.name}: {stat.base_stat}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              className="bg-blue-900 p-2 rounded m-4"
              onClick={() => {
                router.push("/");
              }}
            >
              <span className="text-yellow-500 font-semibold">
                See Other Pokemon
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
