import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface details {
  pic: string;
  name: string;
  disc: string;
  price: string;
  cookie: any;
}

export const cartAtom = atomWithStorage("cart", []);

export const cartOpenAtom = atom(false);

export const navOpenAtom = atom(false);
