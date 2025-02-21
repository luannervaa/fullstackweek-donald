import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
import ProductHeader from "./components/product-headr";

interface ProductPageProps {
    params: { slug: string; productId: string };
}

const ProductPage = async ({ params}: ProductPageProps) => {
    const {productId } = params;
    const product = await db.product.findUnique({ where: { id: productId }, include: { restaurant: {select: {name: true, avatarImageUrl: true}} } });
    if (!product) {
        return notFound();
    }
    return ( 
        <>
        <ProductHeader product={product} />
        <ProductDetails product={product} />
        </>
    );
}
 
export default ProductPage;