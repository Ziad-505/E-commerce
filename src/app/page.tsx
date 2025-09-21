import CategoriesSection from "@/components/home/CategoriesSection";
import MainSlider from "@/components/home/MainSlider";
import ProductSection from "@/components/home/ProductSection";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Suspense } from "react";


export default function Home() {
  return (
    <>
      <MainSlider />
      <Suspense fallback={<SkeletonCard/>}>
        <CategoriesSection />
        </Suspense>
        <Suspense fallback={<SkeletonCard/>}>
        <ProductSection />
        </Suspense>
      
    </>
  );
}
