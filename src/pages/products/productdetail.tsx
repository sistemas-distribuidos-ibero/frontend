import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import PageTemplate from "@assets/PageTemplate";
import '@styles/floatingItem.css'; 


type ProductDetails = {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<ProductDetails | null>(null);

    useEffect(() => {
        const mockDetails: ProductDetails[] = [
            {
                id: '1',
                name: "Cámara Digital",
                description: "Cámara de alta resolución 24MP, con capacidades de video 4K.",
                price: 350,
                rating: 5,
                category: "Electronics",
                image: 'camera.jpg'
            },
            {
                id: '2',
                name: "Smartphone",
                description: "Último modelo, pantalla 6.5 pulgadas, 5G.",
                price: 999,
                rating: 4,
                category: "Mobile",
                image: 'phone.jpg'
            }
        ];

        const detail = mockDetails.find(item => item.id === productId);
        setProduct(detail ?? null); 
    }, [productId]);

    if (!product) {
        return <PageTemplate needBack2Top><p>Loading...</p></PageTemplate>;
    }

    return (
        <div className="product-detail-container">
            <PageTemplate needBack2Top>
                <Card title={product.name} subTitle={`$${product.price}`} className="product-detail-card">
                    <img src={product.image} alt={product.name} style={{ maxWidth: '100%' }} />
                    <div>
                        <p>{product.description}</p>
                        <Rating value={product.rating} readOnly cancel={false} />
                        <Button label="Add to Cart" icon="pi pi-shopping-cart" />
                    </div>
                </Card>
            </PageTemplate>
        </div>
    );
};

export default ProductDetail;
