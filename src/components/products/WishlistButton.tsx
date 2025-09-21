"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { IProduct } from "@/interface/products.interface";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: IProduct;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function WishlistButton({ 
  product, 
  className,
  variant = "outline",
  size = "icon"
}: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isInWishlistState = isInWishlist(product._id);

  const handleWishlistToggle = () => {
    if (isInWishlistState) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleWishlistToggle}
      className={cn(
        "transition-colors",
        isInWishlistState && "text-red-600 border-red-600 bg-red-50 hover:bg-red-100",
        className
      )}
    >
      <Heart 
        className={cn(
          "h-5 w-5 transition-all",
          isInWishlistState && "fill-red-600"
        )} 
      />
    </Button>
  );
}