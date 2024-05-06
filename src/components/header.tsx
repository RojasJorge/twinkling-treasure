"use client";

import { Pacifico } from "next/font/google";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

type Breadcrumb = {
  name?: string;
  path?: string;
  isLast?: boolean;
};

const MainHeader = () => {
  const params = useParams();
  const [breadcrumb, setBreadcrumb] = useState<Breadcrumb[]>([]);

  const buildBreadcrumb = useCallback(() => {
    let links: Breadcrumb[] = [];

    // if (params.category && !params.gender) {
    links.push({
      name: `/Página principal`,
      isLast: false,
      path: `/`,
    });
    // }

    if (params.category) {
      links.push({
        name: `${params.category}`,
        isLast: false,
        path: `/${params.category}`,
      });
    }

    if (params.gender) {
      links.push({
        name: `${params.gender}`,
        isLast: false,
        path: `/${params.category}/${params.gender}`,
      });
    }

    if (params.id) {
      links.push({
        name: `${params.id}`,
        isLast: true,
        path: `/${params.category}/${params.gender}/${params.id}`,
      });
    }

    setBreadcrumb(links);
  }, [params.category, params.gender, params.id]);

  useLayoutEffect(() => {
    buildBreadcrumb();
  }, [buildBreadcrumb]);

  return (
    <div>
      <header className="min-h-[100px] flex items-center justify-center mb-3 md:bm-0 bg-yellow-100">
        <h1
          className={`${pacifico.className} text-5xl text-center text-yellow-500`}
        >
          Twinkling Treasure
        </h1>
      </header>
      <div className="breadcrumb container mx-auto">
        {breadcrumb.length > 0 && (
          <ul className="flex gap-3">
            {breadcrumb.map((link: Breadcrumb, key: number) => (
              <li
                key={key}
                className="after:content-['\2192'] after:pl-3 after:last:content-[] mb-3"
              >
                <Link href={`${link.path}`}>
                  <span className="text-yellow-600 capitalize">
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainHeader;
