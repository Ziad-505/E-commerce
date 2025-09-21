import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { getProducts } from "@/services/products.services";
import { IProduct } from "@/interface/products.interface";

import { Button } from "../ui/button";
import ProductItem from "../products/ProductItem";
import Link from "next/link";

export default async function ProductSection() {
  const { data: products }: { data: IProduct[] } = await getProducts(8);
  console.log(products);

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <SectionTitle
          title={"Our Products"}
          subtitle={"Explore Our Products"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
          {products &&
            products.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
        </div>

        <div className="flex justify-center">
          <Button variant={"destructive"} className="p-7" asChild>
            <Link href={"/products"}>View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
