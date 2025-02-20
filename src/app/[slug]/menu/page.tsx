// import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
// import Image from "next/image";
import { notFound } from "next/navigation";

// import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(
    consumptionMethod.toLocaleUpperCase(),
  );
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { menuCategories: {
        include: {products: true},
    } },
  });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="relative h-[250px] w-full">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
