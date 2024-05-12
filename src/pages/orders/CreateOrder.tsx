import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import PageTemplate from '@assets/page/PageTemplate';

interface Product {
    product_id: string;
    quantity: number;
}

const CreateOrder: React.FC = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [products, setProducts] = useState<Product[]>([{ product_id: '', quantity: 1 }]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleProductChange = (index: number, key: keyof Product, value: string | number) => {
        const updatedProducts = [...products];
        updatedProducts[index] = { ...updatedProducts[index], [key]: value };
        setProducts(updatedProducts);
    };

    const addProduct = (event: React.MouseEvent) => {
        event.preventDefault();  // Prevent form submission
        setProducts([...products, { product_id: '', quantity: 1 }]);
    };

    const removeProduct = (index: number) => {
        event.preventDefault();  // Prevent form submission
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const submitOrder = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!userId || !price || products.length === 0) {
            setErrorMessage('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        const order = {
            user_id: userId,
            price: price,
            products: products,
        };

        try {
            const response = await fetch('http://localhost:8000/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error('Error al enviar la orden.');
            }

            alert('Orden enviada con éxito.');
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('No se pudo enviar la orden.');
        }
    };

    return (
        <PageTemplate>
            <Link to="/orders" className="self-start inline-flex items-center gap-2 mb-5">
                Volver a Órdenes
            </Link>
            <form onSubmit={submitOrder}>
                <Card
                    title="Crear Nueva Orden"
                    className="bg-transparent md:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto text-center rounded-xl px-4"
                >
                    <div className="flex flex-col mb-3">
                        <label htmlFor="userId">User ID:</label>
                        <InputNumber
                            id="userId"
                            value={userId}
                            onValueChange={(e) => setUserId(e.value)}
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label htmlFor="price">Price:</label>
                        <InputNumber
                            id="price"
                            value={price}
                            onValueChange={(e) => setPrice(e.value)}
                            mode="currency"
                            currency="USD"
                            className="w-full"
                        />
                    </div>
                    <h3>Productos</h3>
                    {products.map((product, index) => (
                        <div key={index} className="flex flex-wrap gap-3 mb-3">
                            <InputText
                                placeholder="Product ID"
                                value={product.product_id}
                                onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
                                className="w-full md:w-1/2"
                            />
                            <InputNumber
                                placeholder="Quantity"
                                value={product.quantity}
                                onValueChange={(e) => handleProductChange(index, 'quantity', e.value || 1)}
                                min={1}
                                className="w-full md:w-1/2"
                            />
                            <Button
                                icon="pi pi-minus"
                                className="p-button-danger"
                                onClick={() => removeProduct(index)}
                                disabled={products.length <= 1}
                            />
                        </div>
                    ))}
                    <Button icon="pi pi-plus" label="Agregar Producto" onClick={addProduct} className="mb-3" />

                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}

                    <div className="flex justify-center">
                        <Button label="Enviar Orden" className="border-2 border-green-800 text-green-800 hover:bg-green-800 focus:bg-green-800 hover:text-white focus:text-white my-3 py-1 px-4" />
                    </div>
                </Card>
            </form>
        </PageTemplate>
    );
};

export default CreateOrder;
