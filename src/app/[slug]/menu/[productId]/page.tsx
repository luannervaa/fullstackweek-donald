import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
import ProductHeader from "./components/product-headr";

interface ProductPageProps {
    params: { slug: string; productId: string };
}

const ProductPage = async ({ params}: ProductPageProps) => {
    const {slug, productId } = params;
    const product = await db.product.findUnique({ where: { id: productId }, include: { restaurant: {select: {name: true, avatarImageUrl: true, slug: true,}} } });
    if (!product) {
        return notFound();
    }
    if (product.restaurant.slug.toUpperCase !== slug.toUpperCase) {
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