import React from "react";
import { getCategories } from "@/services/categories.services";
import { ICategory } from "@/interface/category.interface";
import CategoryItem from "@/components/categories/CategoryItem";
import { Search, Filter, Grid3x3, List, SortAsc, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories();

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Categories</h1>
          <p className="text-gray-600">
            Browse products by category
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search categories..."
                className="pl-10 h-11"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
                <ChevronDown className="w-4 h-4" />
              </Button>

              <Button variant="outline" className="gap-2">
                <SortAsc className="w-4 h-4" />
                Sort by
                <ChevronDown className="w-4 h-4" />
              </Button>

              <div className="flex border border-gray-200 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-red-50 text-red-600 border-r"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Showing {categories?.length || 0} categories
          </div>
        </div>

        {/* Categories Grid */}
        {categories && categories.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {categories.map((category) => (
                <CategoryItem key={category._id} category={category} />
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing 1-{categories.length} of {categories.length} results
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                  </div>
                  
                  <Button variant="outline">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn&apos;t find any categories matching your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}