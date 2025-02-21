"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../../contexts/cart";
import CartSheet from "./card-sheet";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{ include: { restaurant: {select: { name: true; avatarImageUrl: true;}} } }>;
}


const ProductDetails = ({product}: ProductDetailsProps) => {
    const { toggleCart, addProduct} = useContext(CartContext);
    const [quantity, setQuatity] = useState<number>(1);
    const handDecreaseQuatity = () => {
        setQuatity((prev) => {
            if (prev > 1) {
                return prev - 1;
            }
            return prev;
        });
    };
    const handIncreaseQuatity = () => {
        setQuatity((prev) => prev + 1);
    };
    const handleAddToCart = () => {
        addProduct({id: product.id, name: product.name, price: product.price, quantity});
        toggleCart();
    };
    
    return ( 
        <>
        <div className="relative z-50 rounded-t-3xl p-5 mt-[-1.5rem] flex-auto flex-col overflow-hidden">
            
            <div className="flex-auto overflow-hidden">
              {/* Restaurante */}
              <div className="flex items-center gap-1.5 px-5">
                 <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full"/>
                 <p className="text-xs text-muted-foreground">{product.restaurant.name}</p>
             </div>
             <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

             <div className="flex items-center justify-between mt-3">
                 <h3 className="text-xl font-semibold">
                 {formatCurrency(product.price)}
                 </h3>

                 <div className="flex items-center gap-3 text-center">
                     <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handDecreaseQuatity}>
                         <ChevronLeftIcon />
                     </Button>
                     <p className="w-4">{quantity}</p>
                     <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handIncreaseQuatity}>
                         <ChevronRightIcon />
                     </Button>
                 </div>
             </div>

             <ScrollArea className="h-full">
             <div className="mt-6 space-y-3">
                 <h4 className="font-semibold">Sobre</h4>
                 <p className="text-sm text-muted-foreground">{product.description}</p>
             </div>

             <div className="mt-6 space-y-3">
                 <div className="flex items-center gap-1.5">
                 <ChefHatIcon size={18}/>    
                 <h4 className="font-semibold">Ingredientes</h4>
                 </div>
                 <ul className="text-sm text-muted-foreground list-disc px-5 text-muted-fo">
                     {product.ingredients.map((ingredient) => (
                         <li key={ingredient}>{ingredient}</li>
                     ))}
                 </ul>
             </div>
             </ScrollArea>
            </div>

             <Button className="w-full rounded-full mt-6" onClick={handleAddToCart}>Adicionar à sacola</Button>
        </div>

        <CartSheet />
        </>



     );
}
 
export default ProductDetails;


