import Card from "../components/Card";
import { cookies } from "@/components/cookies";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center mt-36 px-5 sm:">
      <div className="flex flex-wrap justify-center items-center gap-32">
        {cookies.map((cookie) => (
          <Card key={cookie.id} pic={cookie.pic} name={cookie.name} disc={cookie.disc} price={cookie.price} />
        ))}
      </div>
    </div>
  );
}
