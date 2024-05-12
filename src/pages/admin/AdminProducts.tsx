import PageTemplate from "@assets/page/PageTemplate";
import { Product } from 'models/ProductModel';
import { useEffect, useState } from "react";
import ModalProduct from "./components/ModalProduct";
import { Button } from "primereact/button";


const AdminProducts = () => {

    const [productos, setProductos] = useState<Product[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [idProducto, setIdProducto] = useState(-1);


    useEffect(() => {
    
        const products: Product[] = [
            {
                id: 1,
                category: 1,
                name: "Cámara Digital",
                description: "Cámara de alta resolución 24MP, con capacidades de video 4K.",
                stock: 10,
                price: 350,
                created: new Date(),
                updated: new Date(),
                image: 'camera.jpg',
                rating: 0
            },
            {
                id: 2,
                category: 2,
                name: "Smartphone",
                description: "Último modelo, pantalla 6.5 pulgadas, 5G.",
                stock: 2,
                price: 999,
                created: new Date(),
                updated: new Date(),
                image: './images/smartphone.jpg',
                rating: 0
            },
            {
                id: 3,
                category: 1,
                name: "Cámara Digital",
                description: "Cámara de alta resolución 24MP, con capacidades de video 4K.",
                stock: 10,
                price: 350,
                created: new Date(),
                updated: new Date(),
                image: 'camera.jpg',
                rating: 0
            },
            {
                id: 4,
                category: 2,
                name: "Smartphone",
                description: "Último modelo, pantalla 6.5 pulgadas, 5G.",
                stock: 2,
                price: 999,
                created: new Date(),
                updated: new Date(),
                image: './images/smartphone.jpg',
                rating: 0
            }
        ];

        setProductos(products);

    }, [])

    const DeleteProduct = (id: number) => {

        setProductos(prevState => prevState.filter(producto => producto.id !== id));
    }

    const EditProduct = (id: number) => {
        setIdProducto(id);
        setIsVisible(true);
    }

    return (
        <PageTemplate needBack2Top isAdmin={true}>
            <div className="p-5 text-center">
                <h2 className="text-3xl mb-5">Products</h2>

                <div className="m-5">
                    <ModalProduct isVisible={isVisible} setIsVisible={setIsVisible} idProducto={idProducto} setIdProducto={setIdProducto} productos={productos} setProductos={setProductos} />
                </div>

                <table className="table-fixed w-full">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className="text-center border">
                        {productos.map(producto => (
                            <tr key={producto.id} className="border">
                                <td>{producto.id}</td>
                                <td>{producto.category}</td>
                                <td>{producto.name}</td>
                                <td>{producto.description}</td>
                                <td>{producto.stock}</td>
                                <td>{producto.price}</td>
                                <td>{producto.created.toString()}</td>
                                <td>{producto.updated.toString()}</td>
                                <th className="p-3">
                                    <Button className="border-2 rounded-lg border-yellow-600 text-yellow-600" icon="pi pi-pencil" onClick={() => EditProduct(producto.id)}/>
                                    <Button className="mx-3 border-2 rounded-lg border-red-600 text-red-600" icon="pi pi-trash" onClick={() => DeleteProduct(producto.id)}/>
                                </th>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </PageTemplate>
    );

}

export default AdminProducts;