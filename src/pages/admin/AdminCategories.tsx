import PageTemplate from "@assets/page/PageTemplate";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import ModalCategory from "./components/ModalCategory";

export const categorias: Category[] = [
    {
        _id: '1',
        name: "Camaras",
        description: "Camaras de alta resolución",
        fields: ["pixels", "memory"],
        created: new Date(),
        updated: new Date()
    },
    {
        _id: '2',
        name: "Smartphones",
        description: "Smartphones de alta resolución",
        fields: ["model", "resolution", "os"],
        created: new Date(),
        updated: new Date()
    },
]

const AdminCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [idCategory, setIdCategory] = useState('');

    useEffect(() => {

        setCategories(categorias);
    }, [])

    const DeleteCategory = (id: string) => {

        setCategories(prevState => prevState.filter(category => category._id !== id));
    }

    const EditCategory = (id: string) => {
        setIdCategory(id);
        setIsVisible(true);
    }

    const GetDateFormat = (date: Date) => {
        return`${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    return (
        <PageTemplate needBack2Top isAdmin={true}>
            <div className="p-5 text-center">
                <h2 className="text-3xl mb-5">Categories</h2>
                
                <div className="m-5">
                    <ModalCategory isVisible={isVisible} setIsVisible={setIsVisible} idCategoria={idCategory} setIdCategoria={setIdCategory} categorias={categories} setCategorias={setCategories} />
                </div>
                
                <table className="table-fixed w-full">
                    <thead>
                    <tr className="border-2 shadow">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Fields</th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody className="text-center border">
                        {categories.map(category => (
                            <tr key={category._id} className="border">
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.fields.join(", ")}</td>
                                <td>{GetDateFormat(category.created)}</td>
                                <td>{GetDateFormat(category.updated)}</td>
                                <th className="p-3">
                                    <Button className="border-2 rounded-lg border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white" icon="pi pi-pencil" onClick={() => EditCategory(category._id)}/>
                                    <Button className="mx-3 border-2 rounded-lg border-red-600 text-red-600 hover:bg-red-600 hover:text-white" icon="pi pi-trash" onClick={() => DeleteCategory(category._id)}/>
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