import PageTemplate from "@assets/page/PageTemplate";
import { useEffect, useState } from "react";
import ModalProduct from "./components/ModalProduct";
import { Button } from "primereact/button";


const AdminProducts = () => {

    const [productos, setProductos] = useState<Product[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [idProducto, setIdProducto] = useState('');


    useEffect(() => {
    
        const products: Product[] = [
            {
                _id: "1",
                category: "1",
                name: "Cámara Digital",
                description: "Cámara de alta resolución 24MP, con capac_idades de v_ideo 4K.",
                stock: 10,
                price: 350,
                fields: {"pixels": "24MP", "memory": "4K"},
                created: new Date(),
                updated: new Date()
            },
            {
                _id: "2",
                category: "2",
                name: "Smartphone",
                description: "Último modelo, pantalla 6.5 pulgadas, 5G.",
                stock: 2,
                price: 999,
                fields: {"model": "X", "resolution": "6.5", "os": "Android"},
                created: new Date(),
                updated: new Date()
            },
            {
                _id: "3",
                category: "1",
                name: "Cámara Digital",
                description: "Cámara de alta resolución 24MP, con capacidades de video 4K.",
                stock: 10,
                price: 350,
                fields: {"pixels": "24MP", "memory": "4K"},
                created: new Date(),
                updated: new Date()
            },
            {
                _id: "4",
                category: "2",
                name: "Smartphone",
                description: "Último modelo, pantalla 6.5 pulgadas, 5G.",
                stock: 2,
                price: 999,
                fields: {"model": "X", "resolution": "6.5", "os": "Android"},
                created: new Date(),
                updated: new Date()
            }
        ];

        setProductos(products);

    }, [])

    const DeleteProduct = (id: string) => {

        setProductos(prevState => prevState.filter(producto => producto._id !== id));
    }

    const EditProduct = (id: string) => {
        setIdProducto(id);
        setIsVisible(true);
    }

    const GetDateFormat = (date: Date) => {
        return`${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
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
                    <tr className="border-2 shadow">
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
                            <tr key={producto._id} className="border">
                                <td>{producto.category}</td>
                                <td>{producto.name}</td>
                                <td>{producto.description}</td>
                                <td>{producto.stock}</td>
                                <td>{`$${producto.price}`}</td>
                                <td>{GetDateFormat(producto.created)}</td>
                                <td>{GetDateFormat(producto.updated)}</td>
                                <th className="p-3">
                                    <Button className="py-2 border-2 rounded-lg border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white" icon="pi pi-pencil" onClick={() => EditProduct(producto._id)}/>
                                    <Button className="mx-3 py-2 border-2 rounded-lg border-red-600 text-red-600 hover:bg-red-600 hover:text-white" icon="pi pi-trash" onClick={() => DeleteProduct(producto._id)}/>
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