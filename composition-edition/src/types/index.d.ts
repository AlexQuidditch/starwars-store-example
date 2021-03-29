export type Maybe<T> = T | null | undefined;

export interface CartForm {
  name: string;
  race: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  link: string;
  price: number;
  quantity: number;
}

export interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
  [key: string]: any;
}

export interface StarshipInCart extends Starship {
  quantity: number;
}

export interface StarshipsResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Array<Starship>;
}
