import { Category } from 'models/ProductModel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';

type props = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    idCategoria: number;
    setIdCategoria: React.Dispatch<React.SetStateAction<number>>;
    categorias: Category[];
    setCategorias: React.Dispatch<React.SetStateAction<Category[]>>;
}

const ModalCategory = ( { isVisible, setIsVisible, idCategoria, setIdCategoria, categorias, setCategorias }: props) => {

    const [nuevaCategoria, setNuevaCategoria] = useState<Category>({ id: 0, name: '', description: '', created: new Date(), updated: new Date() });

    const OnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNuevaCategoria(prevState => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {

        if (idCategoria !== -1) {
            setNuevaCategoria(categorias.find(categoria => categoria.id === idCategoria)!);
        }
        else{
            setNuevaCategoria({ id: 0, name: '', description: '', created: new Date(), updated: new Date() });
        }

    }, [isVisible])

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (idCategoria === -1) {
            setNuevaCategoria(prevState => ({ ...prevState, created: new Date(), updated: new Date() }));
            setCategorias(prevState => [...prevState, { ...nuevaCategoria, id: categorias.length + 1 }]);
        }
        else{
            setNuevaCategoria(prevState => ({ ...prevState, updated: new Date() }));
            
            let temp = categorias;
            
            temp[idCategoria-1] = nuevaCategoria;

            setCategorias(temp);
        }

        setIsVisible(false);
        setIdCategoria(-1);
    };

    return (
        <div className='flex justify-end'>
            <Button className="border-2 rounded-lg border-green-600 text-green-600 hover:bg-green-600 hover:text-white" icon="pi pi-plus" onClick={() => {setIdCategoria(-1); setIsVisible(true)}} />
            <Dialog className="w-1/2 h-auto" header="Nuevo Categoria" visible={isVisible} onHide={() => setIsVisible(false)}>
                <form onSubmit={Submit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={nuevaCategoria.name}
                            onChange={OnChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nombre del Categoria"
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
                            onChange={OnChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Descripción del Categoria"
                            required
                        />
                    </div>
                    {/* <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{idCategoria !== -1 ? 'Guardar' : 'Añadir Categoria'}</button> */}
                    <button type="submit" className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{idCategoria !== -1 ? 'Guardar' : 'Añadir Categoria'}</button>
                </form>
            </Dialog>
        </div>
    );

};

export default ModalCategory;