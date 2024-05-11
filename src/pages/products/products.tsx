import { useState, useEffect } from 'react';
import PageTemplate from "@assets/PageTemplate";
import { Product } from 'models/ProductModel';
import CardProduct from './components/CardProduct';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Filters from './components/Filters';


const Products = () => {
    // const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);


    useEffect(() => {
        const products: Product[] = [
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
                image: './images/smartphone.jpg'
            },
            {
                id: 3,
                name: "Cámara Digital",
                description: "Cámara de alta resolución 24MP, con capacidades de video 4K.",
                price: 350,
                rating: 5,
                category: "Electronics",
                image: 'camera.jpg'
            },
            {
                id: 4,
                name: "Smartphone",
                description: "Último modelo, pantalla 6.5 pulgadas, 5G.",
                price: 999,
                rating: 4,
                category: "Mobile",
                image: './images/smartphone.jpg'
            }
        ];
        setProducts(products);
    }, []);

    return (
        <PageTemplate needBack2Top>
            <>
                {/* Buscador */}
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <Button icon="pi pi-search" className="p-button-rounded p-button-text border-2" />
                    </span>
                    <InputText placeholder=" Buscar..." className="p-inputtext-lg border-2 h-12" />
                </div>

                <div className="flex gap-3">
                    {/* Filtros*/}
                    <div className="w-1/4">

                        <Filters />

                    </div>
                    
                    {/* Productos */}
                    <div className="gap-4">
                       
                        <div className="grid grid-cols-3 gap-4">
                            {products.map(producto => (
                                
                                <CardProduct key={producto.id} producto={producto} />

                            ))}
                        </div>

                    </div>
                </div>
            </>
        </PageTemplate>
    );
};

export default Products;
