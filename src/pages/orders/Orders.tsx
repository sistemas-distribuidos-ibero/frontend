import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Paginator } from 'primereact/paginator';
import PageTemplate from "@assets/page/PageTemplate";

interface Product {
    product_id: string;
    quantity: number;
}

interface Order {
    created_at: string;
    id: number;
    price: number;
    products: Product[];
    user_id: string;
}

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetch('http://localhost:8000/orders')
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error('Error fetching orders:', error));
    }, []);

    const onPageChange = (event: { first: number; rows: number }) => {
        setCurrentPage(event.first / event.rows);
        setRowsPerPage(event.rows);
    };

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    function renderOrderCard(order: Order) {
        return (
            <Card className="mb-4">
                <h1 className="text-2xl font-bold mb-3">Order #{order.id}</h1>
                <div className="flex justify-start mb-3 space-x-4">
                    <div>
                        <p><strong>User ID:</strong> {order.user_id}</p>
                    </div>
                    <div>
                        <p><strong>Price:</strong> ${order.price}</p>
                    </div>
                    <div>
                        <p><strong>Date:</strong> {formatDate(order.created_at)}</p>
                    </div>
                </div>
                <div>
                    <strong>Products:</strong>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {order.products.map((product, index) => (
                            <div key={index}>
                                Product ID: {product.product_id}, Quantity: {product.quantity}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    const firstOrderIndex = currentPage * rowsPerPage;
    const lastOrderIndex = firstOrderIndex + rowsPerPage;
    const paginatedOrders = orders.slice(firstOrderIndex, lastOrderIndex);

    return (
        <PageTemplate>
            <h1 className="text-4xl font-semibold tracking-wide border-b-2 pb-1 border-violet-800/50 mb-5">Orders</h1>
            {orders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {paginatedOrders.map((order, index) => (
                        <div key={index}>
                            {renderOrderCard(order)}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p>No hay órdenes</p>
                </div>
            )}
            {orders.length > 0 && (
                <Paginator
                    first={firstOrderIndex}
                    rows={rowsPerPage}
                    totalRecords={orders.length}
                    rowsPerPageOptions={[5, 10, 20]}
                    onPageChange={onPageChange}
                />
            )}
        </PageTemplate>
    );
};

export default Orders;

