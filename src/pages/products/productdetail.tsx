import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import PageTemplate from "@assets/PageTemplate";
import '@styles/floatingItem.css';


const ProductDetail = () => {
    const { productId } = useParams<{ productId: number }>();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setProduct(null);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);


    if (!product) {
        return <PageTemplate needBack2Top><p>Product not found</p></PageTemplate>;
    }

    return (
        <div className="product-detail-container">
            <PageTemplate needBack2Top>
                <Card title={product.name} subTitle={`$${product.price}`} className="product-detail-card">
                    <img src={`https://example.com/images/${product.image}`} alt={product.name} style={{ maxWidth: '100%' }} />
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
