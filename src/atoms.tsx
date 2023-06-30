import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface ICartItem {
  pic: string;
  name: string;
  disc: string;
  price: number;
  quantity: number;
  id?: number;
}

export const cartAtom = atomWithStorage<ICartItem[]>("cart", [
  {
    id: 1,
    pic: "/cwm.jpg",
    name: "Choclatechip Cookie",
    disc: "A chocolate chip cookie is a drop cookie that features chocolate chips or chocolate morsels as its distinguishing ingredient",
    price: 3,
    quantity: 0,
  },
  {
    id: 2,
    pic: "/brownie.jpg",
    name: "Brownie",
    disc: "A chocolate brownie or simply a brownie is a square or rectangular chocolate baked confection.",
    price: 5,
    quantity: 0,
  },
  {
    id: 3,
    pic: "muffin2.jpg",
    name: "Vanilla Muffin",
    disc: "A muffin is an individual-sized, baked product.",
    price: 5,
    quantity: 0,
  },
]);

export const cartOpenAtom = atom(false);

export const navOpenAtom = atom(false);
