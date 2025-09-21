import AddToCartBtn from "@/components/products/AddToCartBtn";
import ProductsSlider from "@/components/products/ProductsSlider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interface/products.interface";
import { getProductDetails } from "@/services/products.services";
import { 
  Star, 
  Truck, 
  Shield, 
  Share2, 
  Plus, 
  Minus,
  ChevronRight,
  Check
} from "lucide-react";
import Link from "next/link";
import React from "react";
import WishlistButton from "@/components/products/WishlistButton";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-gray-900">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Images */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <ProductsSlider images={product.images} />
          </div>

          {/* Right Column - Product Info */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            {/* Product Title and Brand */}
            <div className="mb-6">
              {product.brand && (
                <Badge variant="secondary" className="mb-3">
                  {product.brand.name}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              
              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.ratingsAverage) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-lg font-medium text-gray-900 ml-2">
                    {product.ratingsAverage}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({product.ratingsQuantity} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-red-600">
                  {product.price} EGP
                </span>
                {product.priceAfterDiscount && product.priceAfterDiscount < product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {product.priceAfterDiscount} EGP
                    </span>
                    <Badge variant="destructive">
                      Save {((product.price - product.priceAfterDiscount) / product.price * 100).toFixed(0)}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Info */}
            {(product.category || product.subcategory) && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="space-y-2">
                  {product.category && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{product.category.name}</span>
                    </div>
                  )}
                  {product.subcategory && product.subcategory.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subcategory:</span>
                      <span className="font-medium">{product.subcategory[0].name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button variant="ghost" size="sm" className="h-12 w-12 p-0">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number" 
                    defaultValue={1} 
                    className="w-16 h-12 text-center border-0 focus:ring-0" 
                  />
                  <Button variant="ghost" size="sm" className="h-12 w-12 p-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <AddToCartBtn
                  productId={product._id}
                  className="flex-1 h-12 bg-red-600 hover:bg-red-700 text-white"
                />
                
                <WishlistButton 
                  product={product}
                  className="h-12 w-12 border-gray-300"
                />
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 border-gray-300"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Delivery and Return Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Delivery</h3>
              
              {/* Free Delivery */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Free Delivery
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Free standard shipping on orders over 500 EGP
                    </p>
                    <p className="text-xs text-blue-600 hover:underline cursor-pointer">
                      Enter your postal code for delivery availability
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-600" />
                  <span>Fast Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}