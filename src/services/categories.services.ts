"use server";

export async function getCategories() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

export async function getCategoryDetails(categoryId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch category details");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching category details:", error);
    throw new Error("Failed to fetch category details");
  }
}

export async function getCategoryProducts(categoryId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch category products");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw new Error("Failed to fetch category products");
  }
}