"use client";

import { IProduct } from "@/interface/products.interface";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface IWishlistContext {
  wishlistItems: IProduct[];
  addToWishlist: (product: IProduct) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const WishlistContext = createContext<IWishlistContext | null>(null);

export function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishlistItems, setWishlistItems] = useState<IProduct[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: IProduct) => {
    setWishlistItems(prev => {
      const isAlreadyInWishlist = prev.some(item => item._id === product._id);
      
      if (isAlreadyInWishlist) {
        toast.error("Product is already in your wishlist", {
          position: "top-center",
        });
        return prev;
      }

      toast.success("Added to wishlist", {
        position: "top-center",
      });
      
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prev => {
      const filtered = prev.filter(item => item._id !== productId);
      
      toast.success("Removed from wishlist", {
        position: "top-center",
      });
      
      return filtered;
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item._id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success("Wishlist cleared", {
      position: "top-center",
    });
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist, 
        clearWishlist 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistContextProvider");
  }

  return context;
}