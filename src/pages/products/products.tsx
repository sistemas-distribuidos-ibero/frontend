import React from 'react';
import { Link } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

import PageTemplate from "@assets/PageTemplate";
import "@styles/floatingItem.css";

const Products = () => {
    const productos = [
        { id: 1, nombre: "Cámara Digital", descripcion: "Cámara de alta resolución 24MP", precio: 350 },
        { id: 2, nombre: "Smartphone", descripcion: "Último modelo, pantalla 6.5 pulgadas, 5G", precio: 999 },
        { id: 3, nombre: "Reloj Inteligente", descripcion: "Controla tu actividad física y recibe notificaciones", precio: 199 }
    ];

    return (
        <PageTemplate needBack2Top>
            <section className="py-24 lg:py-32 flex flex-col items-center bg-white">
                <h1 className="text-5xl text-center pb-2">Explore Our Products</h1>
                <p className="text-center text-xl italic text-violet-900">Discover <strong className="font-medium">innovation</strong> in every item!</p>
            </section>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
                    {productos.map(producto => (
                        <Card key={producto.id} title={producto.nombre} subTitle={`$${producto.precio}`} className="shadow-xl hover:shadow-2xl">
                            <p className="m-0">{producto.descripcion}</p>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex justify-center py-8">
                <Button label="View More" className="p-button-rounded p-button-outlined" />
            </div>
            
            <div className="flex justify-center">
                <Link to="/" className="my-8 mx-auto border-4 rounded-lg border-violet-800 w-32 p-2 text-violet-900 hover:bg-violet-800 hover:text-white focus:bg-violet-800 focus:text-white text-center font-semibold tracking-wider">Back to Home</Link>
            </div>

        </PageTemplate>
    );
};

export default Products;
