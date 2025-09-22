"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/services/cart.services";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function AddToCartBtn({
  productId,
  ...props
}: { 
  productId: string;
} & React.ComponentProps<typeof Button>) {
  
  const { getCartDetails } = useCart();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function addProductToCart(productId: string) {
    setIsLoading(true);
    try {
      const token = session?.routeMisrToken;
      
      if (!token) {
        toast.error("Please log in to add items to cart", {
          position: "top-center",
        });
        return;
      }

      const res = await addToCart(productId, token);
      console.log(res);
      
      if (res.success) {
        toast.success(res.message, {
          position: "top-center",
        });
        
        await getCartDetails();
      } else {
        toast.error(res.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button 
      onClick={() => addProductToCart(productId)} 
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Adding..." : "Add to Cart"}
    </Button>
  );
}