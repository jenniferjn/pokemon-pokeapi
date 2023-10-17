"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokedex } from "../models/pokemon-model";
import { getPokedex } from "../services/pokemon-service";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const urlPokedex = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=9";

  const [pokedexList, setPokedexList] = useState<Pokedex>();

  useEffect(() => {
    async function getPokedexData() {
      getPokedex(urlPokedex).then(async (result) => {
        setPokedexList(result);
        setIsLoading(false);
      });
    }

    getPokedexData();
  }, []);

  return (
    <main className="flex justify-center">
      <div className="container text-center">
        <div className="flex p-6 justify-center">
          <img src="./Pokemon.png" className="w-96" alt="Pokemon Logo" />
        </div>
        {isLoading ? (
          <></>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3">
              {pokedexList.results.map((pokemon, index) => {
                return (
                  <div
                    className="flex flex-col m-3 p-3 pb-5 items-center rounded bg-stone-800"
                    key={index}
                  >
                    <img
                      src={pokemon.sprites.front_default}
                      className="w-32"
                      alt="Pokemon Front"
                    />
                    <span className="capitalize font-bold pb-4">
                      {pokemon.name}
                    </span>
                    <div className="text-left pb-4">
                      {pokemon.stats.map((stat, index) => {
                        return (
                          <div key={index}>
                            {stat.stat.name}: {stat.base_stat}
                          </div>
                        );
                      })}
                    </div>
                    <button className="bg-blue-900 p-2 rounded">
                      <span className="text-yellow-500 font-semibold">
                        Show Details
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
