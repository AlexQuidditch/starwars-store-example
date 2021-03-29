import { Starship, StarshipInCart } from '@/types';

interface CartState {
  order: StarshipInCart[];
}

interface StoreState {
  starships: Array<Starship>;
}

export interface RootState {
  Cart: CartState;
  Store: StoreState;
}
