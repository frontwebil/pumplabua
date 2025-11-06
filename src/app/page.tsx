import { Advantages } from "@/components/Advantages/Advantages";
import { Energy } from "@/components/Energy/Energy";
import { EnergyForGoals } from "@/components/EnergyForGoals/EnergyForGoals";
import { Hero } from "@/components/Hero/Hero";
import { PartnerInGoal } from "@/components/PartnerInGoal/PartnerInGoal";
import { ProductsCategory } from "@/components/ProductsCategory/ProductsCategory";
import { TopSellers } from "@/components/TopSellers/TopSellers";
import { WhyChoose } from "@/components/WhyChoose/WhyChoose";

export default function Home() {
  return (
    <>
      {/* <Hero /> */}
      {/* <Advantages /> */}
      {/* <ProductsCategory /> */}
      {/* <Energy /> */}
      {/* <TopSellers /> */}
      {/* <EnergyForGoals /> */}
      <div className="bgBetweenBlack"></div>
      <WhyChoose />
      <div className="bgBetweenBlack"></div>
      <PartnerInGoal />
      <div className="bgBetweenBlack"></div>
    </>
  );
}
