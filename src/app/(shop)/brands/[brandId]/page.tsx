import React from "react";
import { getBrandDetails, getBrandProducts } from "@/services/brands.services";
import { IBrand } from "@/interface/brand.interface";
import { IProduct } from "@/interface/products.interface";
import ProductItem from "@/components/products/ProductItem";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";

export default async function BrandDetailsPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  
  const [brandResponse, productsResponse] = await Promise.all([
    getBrandDetails(brandId),
    getBrandProducts(brandId)
  ]);

  const brand: IBrand = brandResponse.data;
  const products: IProduct[] = productsResponse.data;

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/brands" className="hover:text-gray-900">Brands</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{brand.name}</span>
        </nav>

        {/* Brand Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src={brand.image}
                alt={brand.name}
                width={128}
                height={128}
                className="object-contain"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{brand.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                <Package className="w-5 h-5" />
                <span>{products.length} products available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {brand.name} Products
            </h2>
            <div className="text-gray-600">
              {products.length} products found
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductItem key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                This brand doesn&apos;t have any products available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}