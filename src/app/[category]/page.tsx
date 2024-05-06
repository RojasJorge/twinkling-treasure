"use client";

import MainHeader from "@/components/header";
import { useParams } from "next/navigation";
import data from "../../data.json";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { filter, isEmpty } from "lodash";

interface Product {
  id?: string;
  name?: string;
  slug?: string;
  imageUrl?: string;
  excerpt?: string;
  description?: string;
  price?: string;
  categories?: Categories;
}

interface Categories {
  title?: string;
  value?: string;
}

const CategoryPage = () => {
  const params = useParams();
  const [items, setItems] = useState<Product[]>([]);

  const buildPath = (item: any) => {
    const category = item.categories.filter(
      (o: any) => o.title === "category"
    )[0].value;

    const gender = item.categories.filter((o: any) => o.title === "gender")[0]
      .value;

    return `/${category}/${gender}/${item.id}`;
  };

  const filterByCategories = useCallback(() => {
    const filtered: Product[] = data.products.reduce(
      (acc: Product[], current: any) => {
        const matchCategories = filter(current.categories, {
          title: "category",
          value: params.category,
        });

        if (!isEmpty(matchCategories)) {
          acc.push(current);
        }

        return acc;
      },
      []
    );

    setItems(filtered);
  }, [params.category, setItems]);

  useEffect(() => {
    filterByCategories();
  }, [filterByCategories]);

  return (
    <div className="min-h-screen">
      <MainHeader />
      {params.category === "tobilleras" || params.category === "charm-waist" ? (
        <div className="container mx-auto">
          <div className="flex w-full gap-3 items-center justify-center">
            {items.map((item: any, key: number) => (
              <div
                className=" bg-white min-h-[150px] w-[260px] rounded-lg hover:shadow-lg transition-all ease-in-out duration-300 border-b-2 border-b-yellow-500"
                key={key}
              >
                <div
                  className="thumb h-48 max-h-48 min-h-48 overflow-hidden rounded-t-lg shadow-sm relative"
                  style={{
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                  }}
                >
                  <Link
                    href={`${buildPath(item)}`}
                    className="absolute w-full h-full top-0 left-0 z-10"
                  ></Link>
                </div>
                <div className="content p-3 flex flex-col gap-3">
                  <h3 className="text-yellow-600 text-lg m-0">
                    <Link href={`${buildPath(item)}`}>{item.name}</Link>
                  </h3>
                  <div className="excerpt text-sm min-h-[70px] overflow-hidden text-gray-600">
                    {item.excerpt}
                  </div>
                  <div className="extra flex justify-between">
                    <div className="price text-lg">{item.price}</div>
                    <div className="categories flex gap-2">
                      {item.categories.map((c: any, index: number) => (
                        <div key={index}>
                          <span className="bg-yellow-300 py-1 px-2 text-xs rounded-lg capitalize">
                            {c.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <div
            className="flex w-full gap-5 items-center justify-center"
            style={{
              minHeight: "calc(100vh - 120px)",
            }}
          >
            {data.genderCategories.map((item: any, key: number) => (
              <div
                className="w-[25%] flex items-center justify-center"
                key={key}
              >
                <h3 className="text-center w-full">
                  <Link
                    href={`${params.category}/${item.value}`}
                    className="px-3 py-8 text-white rounded-lg hover:shadow-lg bg-yellow-500 block w-full transition-all ease-in-out duration-300 capitalize text-xl font-bold"
                  >
                    {item.value}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
