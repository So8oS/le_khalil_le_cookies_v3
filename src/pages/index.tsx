import Card from "../components/Card";
import { cookies } from "@/data/cookies";

export default function Home() {
  return (
    <div
      className="mt-14 flex flex-col items-center justify-center px-5
      md:mt-20
    "
    >
      <div className="flex flex-wrap items-center justify-center gap-36">
        {cookies.map((cookie) => (
          <Card
            key={cookie.id}
            pic={cookie.pic}
            name={cookie.name}
            disc={cookie.disc}
            price={cookie.price}
            cookie={cookie}
            quantity={0}
          />
        ))}
      </div>
    </div>
  );
}
