import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';
import { categorias } from "../AdminCategories";
import TextInput from '@assets/components/TextInput';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';

type props = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    idProducto: string;
    setIdProducto: React.Dispatch<React.SetStateAction<string>>;
    productos: Product[];
    setProductos: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ModalProduct = ( { isVisible, setIsVisible, idProducto, setIdProducto, productos, setProductos }: props) => {

    const [category, setCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [stock, setStock] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [fields, setFileds] = useState<{[clave: string]: string}>({});
    const [reRender, setReRender] = useState<boolean>(false);
    let tempCategory = '';

    useEffect(() => {

        if (idProducto !== '') {
            setName(productos.find(producto => producto._id === idProducto)!.name);
            setDescription(productos.find(producto => producto._id === idProducto)!.description);
            setCategory(productos.find(producto => producto._id === idProducto)!.category);
            setStock(productos.find(producto => producto._id === idProducto)!.stock);
            setPrice(productos.find(producto => producto._id === idProducto)!.price);
            setFileds(productos.find(producto => producto._id === idProducto)!.fields);
        }
        else{
            setName('');
            setDescription('');
            setCategory('');
            setStock(0);
            setPrice(0);
            setFileds({});
        }

    }, [isVisible])

    const ChangeCategory = (value: Category) => {

        const tempDiccionario: {[clave: string]: string} = {};

        if (category !== tempCategory) {
            setFileds({});
            value.fields.map(field => {
                tempDiccionario[field] = '';
            });

            setFileds(tempDiccionario)
            
            tempCategory = category;
            setReRender(!reRender)
        }

    }

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (idProducto === '') {
            setProductos([...productos, {_id: (productos.length + 1).toString(), category, name, description, stock, price, fields, created: new Date(), updated: new Date()}]);
            console.log({_id: (productos.length + 1).toString(), category, name, description, stock, price, fields, created: new Date(), updated: new Date()})
        }
        else{
            const update = new Date();
            
            let temp = productos;
            
            temp[parseInt(idProducto)-1].name = name;
            temp[parseInt(idProducto)-1].description = description;
            temp[parseInt(idProducto)-1].category = category;
            temp[parseInt(idProducto)-1].stock = stock;
            temp[parseInt(idProducto)-1].price = price;
            temp[parseInt(idProducto)-1].fields = fields;
            temp[parseInt(idProducto)-1].updated = update;

            setProductos(temp);
        }

        setIsVisible(false);
        setIdProducto('');
    };

    return (
        <div className='flex justify-end rounded-lg shadow-2xl'>
            <Button className="border-2 rounded-lg border-green-600 text-green-600 hover:bg-green-600 hover:text-white" icon="pi pi-plus" onClick={() => {setIdProducto(''); setIsVisible(true)}} />
            <Dialog className="w-1/2 h-auto text-center" header="Nuevo Producto" visible={isVisible} onHide={() => setIsVisible(false)}>
                <form onSubmit={Submit} className='my-2'>
                    <div className="mb-4\">
                        <TextInput id='name' label='Name' value={name} setValue={setName}/>
                    </div>
                    <div className="mb-4">
                        <TextInput id='description' label='Description' value={description} setValue={setDescription} />
                    </div>
                    <div className="mb-4">
                        <Dropdown value={category} onChange={(e) => {setCategory(e.value); ChangeCategory(e.value)}} options={categorias} optionLabel="name" 
                                placeholder="Select a Category" className="w-full md:w-14rem border border-2 border-violet-800/30" />
                    </div>
                    <div className="mb-4">
                        <FloatLabel>
                            <InputNumber id='stock' value={stock} onValueChange={(e) => setStock(e.value ? e.value : 0)} min={0} className="w-full md:w-14rem border border-2 border-violet-800/30"/>
                            <label htmlFor='stock'>Stock</label>
                        </FloatLabel>
                    </div>
                    <div className="mb-4">
                        <FloatLabel>
                            <InputNumber id='price' value={price} onValueChange={(e) => setPrice(e.value ? e.value : 0)} min={1} prefix='$' className="w-full md:w-14rem border border-2 border-violet-800/30"/>
                            <label htmlFor='price'>Price</label>
                        </FloatLabel>
                    </div>
                    {Object.keys(fields).map((key, index) => (
                        <div className="mb-4" key={index}>
                            <FloatLabel>
                                <InputText id={key} value={fields[key]} onChange={(e) => setFileds({...fields, [key]: e.target.value})} className="w-full md:w-14rem border border-2 border-violet-800/30"/>
                                <label htmlFor={key}>{key}</label>
                            </FloatLabel>
                        </div>
                    ))}
                    <button type="submit" className="w-1/2 py-2 px-4 border border-blue-500 rounded-md shadow-sm text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{idProducto !== '' ? 'Guardar' : 'Añadir Producto'}</button>
                </form>
            </Dialog>
        </div>
    );

};

export default ModalProduct;