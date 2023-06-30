import { useAtom } from "jotai";
import Card from "../components/Card";
import { cartAtom } from "@/atoms";

export default function Home() {
  const [items, setItems] = useAtom(cartAtom);
  return (
    <div
      className="mt-12 flex flex-col items-center justify-center px-5
      md:mt-12
    "
    >
      <div className="flex flex-wrap items-center justify-center gap-36">
        {items.map((item) => (
          <Card
            key={item.id}
            pic={item.pic}
            name={item.name}
            disc={item.disc}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
