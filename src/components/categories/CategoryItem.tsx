import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICategory } from "@/interface/category.interface";
import { ArrowRight, Package } from "lucide-react";

export default function CategoryItem({ category }: { category: ICategory }) {
  return (
    <Link href={`/categories/${category._id}`}>
      <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Category Image */}
        <div className="relative overflow-hidden bg-gray-50 p-6">
          <div className="aspect-square relative">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
        </div>

        {/* Category Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
              {category.name}
            </h3>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span>Browse products</span>
          </div>
        </div>
      </div>
    </Link>
  );
}