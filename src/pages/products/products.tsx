import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Card } from "primereact/card";
import PageTemplate from "@assets/PageTemplate";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number;
    category: string;
    image: string;
};

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const mockProducts: Product[] = [
            {
                id: 1,
                name: "Cámara Digital",
                description: "Cámara de alta resolución 24MP, con capacidades de video 4K.",
                price: 350,
                rating: 5,
                category: "Electronics",
                image: 'camera.jpg'
            },
            {
                id: 2,
                name: "Smartphone",
                description: "Último modelo, pantalla 6.5 pulgadas, 5G.",
                price: 999,
                rating: 4,
                category: "Mobile",
                image: 'phone.jpg'
            }
        ];
        setProducts(mockProducts);
    }, []);

    const itemTemplate = (product: Product) => (
        <Card title={product.name} subTitle={`$${product.price}`} className="mx-3 my-2" onClick={() => navigate(`/products/${product.id}`)}>
            <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} style={{ width: '100%' }} />
            <div>
                <div className="text-700">{product.description}</div>
                <Rating value={product.rating} readOnly cancel={false} />
                <Button label="Add to Cart" icon="pi pi-shopping-cart" />
            </div>
        </Card>
    );

    return (
        <PageTemplate needBack2Top>
            <div className="card">
                <DataScroller value={products} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
            </div>
        </PageTemplate>
    );
};

export default Products;
