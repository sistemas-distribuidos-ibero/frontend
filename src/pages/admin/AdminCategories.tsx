import PageTemplate from "@assets/page/PageTemplate";
import { Category } from "models/ProductModel";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import ModalCategory from "./components/ModalCategory";

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
    const [isVisible, setIsVisible] = useState(false);
    const [idCategory, setIdCategory] = useState(-1);

    useEffect(() => {

        setCategories(categorias);
    }, [])

    const DeleteCategory = (id: number) => {

        setCategories(prevState => prevState.filter(category => category.id !== id));
    }

    const EditCategory = (id: number) => {
        setIdCategory(id);
        setIsVisible(true);
    }

    return (
        <PageTemplate needBack2Top isAdmin={true}>
            <div className="p-5 text-center">
                <h2 className="text-2xl mb-5">Categories</h2>
                
                <div className="m-5">
                    <ModalCategory isVisible={isVisible} setIsVisible={setIsVisible} idCategoria={idCategory} setIdCategoria={setIdCategory} categorias={categories} setCategorias={setCategories} />
                </div>
                
                <table className="table-fixed w-full">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
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
                                <th className="p-3">
                                    <Button className="border-2 rounded-lg border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white" icon="pi pi-pencil" onClick={() => EditCategory(category.id)}/>
                                    <Button className="mx-3 border-2 rounded-lg border-red-600 text-red-600 hover:bg-red-600 hover:text-white" icon="pi pi-trash" onClick={() => DeleteCategory(category.id)}/>
                                </th>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </PageTemplate>
    );
}

export default AdminCategories