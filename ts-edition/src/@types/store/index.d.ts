import { Starship, StarshipInCart } from '@/@types';

export interface CartState {
  order: StarshipInCart[];
}

export interface StoreState {
  starships: Array<Starship>;
}

export interface RootState {
  Cart: CartState;
  Store: StoreState;
}
