import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../../contexts/cart";



const CartSheet = () => {
    const { isOpen, toggleCart, products} = useContext(CartContext);
    return ( 
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle> </SheetTitle>
                        <SheetDescription>
                            <h2 className="text-xl font-semibold">Adicionar ao carrinho</h2>
                            <p className="text-muted-foreground">Selecione a quantidade desejada</p>
                        </SheetDescription>
                </SheetHeader>
                {products.map((product) => (
                    <h1 key={product.id}>{product.name} - {product.quantity}</h1>
                ))}
            </SheetContent>
        </Sheet>
     );
}
 
export default CartSheet;