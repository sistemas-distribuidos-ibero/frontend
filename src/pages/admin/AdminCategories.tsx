import PageTemplate from "@assets/page/PageTemplate";
import { Category } from "models/ProductModel";
import { useEffect, useState } from "react";

export const categorias: Category[] = [
    {
        id: 1,
        name: "Camaras",
        description: "Camaras de alta resolución",
        created: new Date(),
        updated: new Date()
    },
    {
        id: 2,
        name: "Smartphones",
        description: "Smartphones de alta resolución",
        created: new Date(),
        updated: new Date()
    },
]

const AdminCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [nuevaCategoria, setNuevaCategoria] = useState<Category>({ id: 0, name: '', description: '', created: new Date(), updated: new Date() });


    useEffect(() => {

        setCategories(categorias);
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNuevaCategoria(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setNuevaCategoria(prevState => ({ ...prevState, created: new Date(), updated: new Date() }));
        setCategories(prevState => [...prevState, { ...nuevaCategoria, id: categories.length + 1 }]);
        setNuevaCategoria({ id: 0, name: '', description: '', created: new Date(), updated: new Date() });
    };

    return (
        <PageTemplate needBack2Top isAdmin={true}>
            <div className="p-5 text-center">
                <h2 className="text-2xl mb-5">Categories</h2>
                <table className="table-fixed w-full">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Updated</th>
                    </tr>
                    </thead>
                    <tbody className="text-center border">
                        {categories.map(category => (
                            <tr key={category.id} className="border">
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.created.toString()}</td>
                                <td>{category.updated.toString()}</td>
                            </tr>
                    ))}
                    </tbody>
                </table>
                
                <div className="p-5 max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-lg font-semibold mb-4">Añadir Nueva Categoria</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={nuevaCategoria.name}
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
                                value={nuevaCategoria.description}
                                onChange={handleInputChange}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Descripción del producto"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Añadir Categoria</button>
                    </form>
                </div>
            </div>
        </PageTemplate>
    );
}

export default AdminCategories