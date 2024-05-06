"use client";

import MainHeader from "@/components/header";
import { useParams } from "next/navigation";
import data from "../../../../data.json";
import Link from "next/link";
import { map, isEmpty, find } from "lodash";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id?: string;
  name?: string;
  slug?: string;
  imageUrl?: string;
  excerpt?: string;
  description?: string;
  price?: string;
  categories?: Category[];
}

interface Category {
  title?: string;
  value?: string;
}

const GenderPage = () => {
  const params = useParams();
  const [item, setItem] = useState<Product | null>(null);

  const getProduct = useCallback(() => {
    const item: any = find(data.products, ["id", params.id]);

    setItem(item);
  }, [params.id, setItem]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div className="w-full min-h-screen">
      <MainHeader />
      <div className="container mx-auto flex justify-center mb-3">
        <div className="md:min-w-[800px] bg-white p-5 flex gap-5 rounded-lg shadow-lg">
          <div className="left w-[500px]">
            <div className="thumb min-h-[400px]">
              {item?.imageUrl && (
                <Image
                  src={`${item?.imageUrl}`}
                  width={370}
                  height={370}
                  alt={`${item?.name}`}
                  className="w-full"
                />
              )}
            </div>
          </div>
          <div className="right w-[300px]">
            <h1 className="text-3xl">{item?.name}</h1>
            <div className="details">
              <ul className="w-full my-3 flex flex-col gap-3">
                <li className="flex gap-2 w-full">
                  <strong className="w-[50%] block">SKU:</strong>
                  <span className="w-[50%] block">{item?.id}</span>
                </li>
                <li className="flex gap-2 w-full">
                  <strong className="w-[50%] block">Existencias:</strong>
                  <span className="w-[50%] block">3</span>
                </li>
                <li className="flex gap-2">
                  <strong className="w-[50%]">Precio:</strong>
                  <span className="w-[50%]">{item?.price}</span>
                </li>
                <li className="flex gap-3">
                  <strong className="w-[50%]">Categorías:</strong>
                  <span className="flex gap-2 w-[50%]">
                    {!isEmpty(item?.categories) &&
                      map(item?.categories, (c: Category, index: number) => (
                        <div key={index}>
                          <span className="bg-yellow-300 py-1 px-2 text-xs rounded-lg capitalize">
                            {c.value}
                          </span>
                        </div>
                      ))}
                  </span>
                </li>
                <li className="flex flex-col gap-3">
                  <strong className="">Descripción:</strong>
                  <div>{item?.description}</div>
                </li>
              </ul>
              <button
                className="bg-gray-800 text-white py-2 px-3 rounded-lg min-w-[120px] shadow-lg disabled:bg-gray-300 outline-1 disabled:cursor-not-allowed"
                // disabled
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenderPage;
