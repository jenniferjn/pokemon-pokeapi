export interface Pokedex {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface Pokemon extends KeyValue {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: KeyValue[];
  game_indices: GameIndexVersion[];
  held_items: PokemonHeldItem[];
  location_era_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonPastType[];
  sprites: PokemonSprites;
  species: KeyValue;
  stats: PokemonStat[];
  types: PokemonType[];
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: KeyValue[];
}

interface GameIndexVersion {
  game_index: number;
  version: KeyValue[];
}

interface PokemonHeldItem {
  item: KeyValue;
  version_details: PokemonHeldItemVersion[];
}

interface PokemonHeldItemVersion {
  version: KeyValue;
  rarity: number;
}

interface PokemonMove {
  move: KeyValue;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonMoveVersion {
  move_learn_method: KeyValue;
  version_group: KeyValue;
  level_learned_at: number;
}

interface PokemonPastType {
  generation: KeyValue;
  types: PokemonType[];
}

interface PokemonType {
  slot: number;
  type: KeyValue;
}

interface PokemonStat {
  stat: KeyValue;
  effort: number;
  base_stat: number;
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}

interface KeyValue {
  name: string;
  url: string;
}
