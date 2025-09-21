import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IBrand } from "@/interface/brand.interface";
import { ArrowRight } from "lucide-react";

export default function BrandItem({ brand }: { brand: IBrand }) {
  return (
    <Link href={`/brands/${brand._id}`}>
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Brand Image */}
        <div className="relative overflow-hidden bg-gray-50 p-8">
          <div className="aspect-square relative">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>

        {/* Brand Info */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
              {brand.name}
            </h3>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Explore {brand.name} products
          </p>
        </div>
      </div>
    </Link>
  );
}