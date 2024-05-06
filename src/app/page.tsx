import Image from "next/image";
import data from "../data.json";
import MainHeader from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <MainHeader />
      <div className="container mx-auto">
        <div
          className="md:flex max-w-full md:gap-10 items-center justify-center mx-3"
          style={{
            minHeight: "calc(100vh - 150px)",
          }}
        >
          {data.categories.map((item: any, key: number) => (
            <div className="item mb-3" key={key}>
              <div className="wrap border-2 p-3 transition-all ease-in-out border-yellow-200 hover:shadow-lg md:shadow-yellow-700 flex gap-5 flex-col justify-center bg-white rounded-lg">
                <div className="thumb md:max-h-[240px] flex justify-center">
                  <Link href={`/${item.slug}`}>
                    <Image
                      src={item.image}
                      width={736}
                      height={736}
                      alt={item.name}
                      className="h-48 w-48"
                    />
                  </Link>
                </div>
                <h3 className="text-center text-2xl text-yellow-500">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
