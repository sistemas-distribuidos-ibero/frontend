import { Product } from 'models/ProductModel';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { categorias } from "../AdminCategories";

type props = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    idProducto: number;
    setIdProducto: React.Dispatch<React.SetStateAction<number>>;
    productos: Product[];
    setProductos: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ModalProduct = ( { isVisible, setIsVisible, idProducto, setIdProducto, productos, setProductos }: props) => {

    const [nuevoProducto, setNuevoProducto] = useState<Product>({ id: 0, name: '', category: 0, stock: 0, price: 0, description: '', created: new Date(), updated: new Date(), image: '', rating: 0 });

    const OnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setNuevoProducto(prevState => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {

        if (idProducto !== -1) {
            setNuevoProducto(productos.find(producto => producto.id === idProducto)!);
        }
        else{
            setNuevoProducto({ id: 0, name: '', category: 1, stock: 0, price: 0, description: '', created: new Date(), updated: new Date(), image: '', rating: 0 });
        }

    }, [isVisible])

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (idProducto === -1) {
            setNuevoProducto(prevState => ({ ...prevState, created: new Date(), updated: new Date() }));
            setProductos(prevState => [...prevState, { ...nuevoProducto, id: productos.length + 1 }]);
        }
        else{
            setNuevoProducto(prevState => ({ ...prevState, updated: new Date() }));
            
            let temp = productos;
            
            temp[idProducto-1] = nuevoProducto;

            setProductos(temp);
        }

        setIsVisible(false);
        setIdProducto(-1);
    };

    return (
        <div className='flex justify-end'>
            <Button className="border-2 rounded-lg border-green-600 text-green-600" icon="pi pi-plus" onClick={() => {setIdProducto(-1); setIsVisible(true)}} />
            <Dialog className="w-1/2 h-auto" header="Nuevo Producto" visible={isVisible} onHide={() => setIsVisible(false)}>
                <form onSubmit={Submit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={nuevoProducto.name}
                            onChange={OnChange}
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
                            onChange={OnChange}
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
                            onChange={OnChange}
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
                            onChange={OnChange}
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
                            onChange={OnChange}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Precio del producto"
                            required
                            min={1}
                        />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{idProducto !== -1 ? 'Guardar' : 'Añadir Producto'}</button>
                </form>
            </Dialog>
        </div>
    );

};

export default ModalProduct;