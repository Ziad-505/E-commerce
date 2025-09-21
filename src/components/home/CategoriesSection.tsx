import { ICategory } from "@/interface/category.interface";
import { getCategories } from "@/services/categories.services";
import React from "react";
import CategoriesSlider from "./CategoriesSlider";
import SectionTitle from "../shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3x3 } from "lucide-react";
import Link from "next/link";

export default async function CategoriesSection() {
  const { data: categories }: { data: ICategory[] } = await getCategories();

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        {/* Enhanced Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="w-5 h-10 bg-red-500 rounded-sm"></div>
              <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">
                Categories
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Browse By Category
            </h2>
            
          </div>
          
          <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
            <Button 
              asChild 
              variant="outline" 
              className="group hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
            >
              <Link href="/categories" className="flex items-center gap-2">
                <Grid3x3 className="w-4 h-4" />
                View All Categories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Categories Slider */}
        <div className="relative">
          <CategoriesSlider categories={categories} />
        </div>

        
      </div>
    </section>
  );
}