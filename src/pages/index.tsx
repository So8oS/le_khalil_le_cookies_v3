import Card from "../components/Card";
import { cookies } from "@/components/cookies";

export default function Home() {
  return (
    <div
      className="flex flex-col justify-center items-center px-5 mt-14
      md:mt-20
    "
    >
      <div className="flex flex-wrap justify-center items-center gap-36">
        {cookies.map((cookie) => (
          <Card key={cookie.id} pic={cookie.pic} name={cookie.name} disc={cookie.disc} price={cookie.price} cookie={cookie} />
        ))}
      </div>
    </div>
  );
}
