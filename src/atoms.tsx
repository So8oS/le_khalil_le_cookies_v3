import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface ICartItem {
  pic: string;
  name: string;
  disc: string;
  price: number;
  cookie: any;
  quantity: number;
  id?: number;
}

export const cartAtom = atomWithStorage<ICartItem[]>("cart", []);

export const cartOpenAtom = atom(false);

export const navOpenAtom = atom(false);
