"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pokedex } from "./models/pokemon-model";
import { getPokedex } from "./services/pokemon-service";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const [urlPokedex, setUrlPokedex] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=9"
  );

  const [pokedexList, setPokedexList] = useState<Pokedex>();

  useEffect(() => {
    async function getPokedexData() {
      getPokedex(urlPokedex).then(async (result) => {
        setPokedexList(result);
        setIsLoading(false);
      });
    }

    getPokedexData();
  }, [urlPokedex]);

  const [currentPage, setCurrentPage] = useState<number>(1);

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
                    <button
                      className="bg-blue-900 p-2 rounded"
                      onClick={() => router.push(`detail/${pokemon.id}`)}
                    >
                      <span className="text-yellow-500 font-semibold">
                        Show Details
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 items-center">
              {pokedexList.previous ? (
                <button
                  className="bg-blue-900 p-2 rounded m-4"
                  onClick={() => {
                    setUrlPokedex(pokedexList.previous);
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  <span className="text-yellow-500 font-semibold">
                    Previous
                  </span>
                </button>
              ) : (
                <div></div>
              )}
              <span className="text-black m-4">
                {currentPage} of {(pokedexList.count / 9).toFixed(0)}
              </span>
              {pokedexList.next ? (
                <button
                  className="bg-blue-900 p-2 rounded m-4"
                  onClick={() => {
                    setUrlPokedex(pokedexList.next);
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  <span className="text-yellow-500 font-semibold">Next</span>
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
