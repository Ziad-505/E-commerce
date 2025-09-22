"use client";

import { ICartResponse } from "@/interface/cart.interface";
import { getUserCart } from "@/services/cart.services";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface IcartContext {
  cartDetails: ICartResponse | null;
  setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>;
  getCartDetails: () => Promise<void>;
}

export const CartContext = createContext<IcartContext | null>(null);

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);
  const { data: session } = useSession();

  async function getCartDetails() {
    const token = session?.routeMisrToken;
    
    if (!token) {
      setCartDetails(null);
      return;
    }

    try {
      const { data }: { data: ICartResponse } = await getUserCart(token);
      setCartDetails(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartDetails(null);
    }
  }

  useEffect(() => {
    if (session?.routeMisrToken) {
      getCartDetails();
    } else {
      setCartDetails(null);
    }
  }, [session?.routeMisrToken]);

  return (
    <CartContext.Provider value={{ cartDetails, setCartDetails, getCartDetails }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
}
