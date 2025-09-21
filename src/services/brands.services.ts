"use server";

export async function getBrands() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to fetch brands");
  }
}

export async function getBrandDetails(brandId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brand details");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brand details:", error);
    throw new Error("Failed to fetch brand details");
  }
}

export async function getBrandProducts(brandId: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brand products");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching brand products:", error);
    throw new Error("Failed to fetch brand products");
  }
}