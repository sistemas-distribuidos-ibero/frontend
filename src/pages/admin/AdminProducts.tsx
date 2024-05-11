import PageTemplate from "@assets/page/PageTemplate";
import { Product } from 'models/ProductModel';
import { useEffect, useState } from "react";
import { categorias } from "../admin/AdminCategories";


const AdminProducts = () => {

    const [productos, setProductos] = useState<Product[]>([]);
    const [nuevoProducto, setNuevoProducto] = useState<Product>({ id: 0, name: '', category: 0, stock: 0, price: 0, description: '', created: new Date(), updated: new Date(), image: '' });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNuevoProducto(prevState => ({ ...prevState, [name]: value }));
    };

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
                image: 'camera.jpg'
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
                image: './images/smartphone.jpg'
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
                image: 'camera.jpg'
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
                image: './images/smartphone.jpg'
            }
        ];

        setProductos(products);

    }, [])
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNuevoProducto(prevState => ({ ...prevState, created: new Date(), updated: new Date() }));
        setProductos(prevState => [...prevState, { ...nuevoProducto, id: productos.length + 1 }]);
        setNuevoProducto({ id: 0, name: '', category: 1, stock: 0, price: 0, description: '', created: new Date(), updated: new Date(), image: '' });
    };

    return (
        <PageTemplate needBack2Top isAdmin={true}>
            <div className="p-5 text-center">
                <h2 className="text-3xl mb-5">Products</h2>
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
                            </tr>
                    ))}
                    </tbody>
                </table>
                <div className="p-5 max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-lg font-semibold mb-4">Añadir Nuevo Producto</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={nuevoProducto.name}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nombre del producto"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium mb-1">Descripción:</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={nuevoProducto.description}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Descripción del producto"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoria" className="block text-sm font-medium mb-1">Categoría:</label>
                            <select
                                id="category"
                                name="category"
                                value={nuevoProducto.category}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>{categoria.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="stock" className="block text-sm font-medium mb-1">Stock:</label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={nuevoProducto.stock}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Stock del producto"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium mb-1">Precio:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={nuevoProducto.price}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Precio del producto"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Añadir Producto</button>
                    </form>
                </div>
            </div>
        </PageTemplate>
    );

}

export default AdminProducts;