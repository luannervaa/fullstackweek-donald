import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
    params: Promise<{ slug:string }>;
}

const RestaurantPage = async ({params}: RestaurantPageProps) => {
    const { slug } = await params;
    const restaurant = await db.restaurant.findUnique({ where: { slug } });
    if (!restaurant) {
        return notFound();
    }
    return (
        <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
            <div className="flex flex-col items-center gap-2">
                <Image src={restaurant?.avatarImageUrl} alt={restaurant.name} width={82} height={82} />
                <h2 className="font-semibold">{restaurant.name}</h2>
            </div>
            <div className="pt-24 text-center space-y-2">
                <h3 className="text-2xl font-semibold"> Sejam Bem-Vindo! </h3>
                <p className="opacity-55"> Escolha como prefere aproveitar sua refeição. Estamos oferecendo praticidade e sabor em cada detalhe!</p>
            </div>

            <div className="pt-14 grid grid-cols-2 gap-4">
                <ConsumptionMethodOption imageUrl="/dine_in.png" imageAlt="Comer no Local" buttonText="Comer no Local" option={"DINE_IN"} slug={slug}/>
                <ConsumptionMethodOption imageUrl="/takeaway.png" imageAlt="Levar para Casa" buttonText="Levar para Casa" option={"TAKEAWAY"} slug={slug}/>
            </div>


        </div> 
    
    );
};
 
export default RestaurantPage; 