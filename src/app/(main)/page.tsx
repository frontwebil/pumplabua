"use client";

import { Advantages } from "@/components/Advantages/Advantages";
import { Energy } from "@/components/Energy/Energy";
import { EnergyForGoals } from "@/components/EnergyForGoals/EnergyForGoals";
import { Hero } from "@/components/Hero/Hero";
import { PartnerInGoal } from "@/components/PartnerInGoal/PartnerInGoal";
import { ProductsCategory } from "@/components/ProductsCategory/ProductsCategory";
// import { TopSellers } from "@/components/TopSellers/TopSellers";
import { WhyChoose } from "@/components/WhyChoose/WhyChoose";
import { useProducts } from "@/custom-hooks/fetchProducts";
import { setProducts } from "@/redux/pamplabua/slices/productsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const { data: products } = useProducts();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts(products));
  }, [dispatch, products]);

  return (
    <>
      <Hero />
      <Advantages />
      <ProductsCategory />
      <Energy />
      {/* <TopSellers /> */}
      <EnergyForGoals />
      <div className="bgBetweenBlack"></div>
      <WhyChoose />
      <div className="bgBetweenBlack"></div>
      <PartnerInGoal />
      <div className="bgBetweenBlack"></div>
    </>
  );
}
