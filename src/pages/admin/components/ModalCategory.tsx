import TextInput from '@assets/components/TextInput';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useEffect, useState } from 'react';

type props = {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    idCategoria: string;
    setIdCategoria: React.Dispatch<React.SetStateAction<string>>;
    categorias: Category[];
    setCategorias: React.Dispatch<React.SetStateAction<Category[]>>;
}

const ModalCategory = ( { isVisible, setIsVisible, idCategoria, setIdCategoria, categorias, setCategorias }: props) => {

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [fields, setFields] = useState<string>('');

    useEffect(() => {

        if (idCategoria !== '') {
            setName(categorias.find(categoria => categoria._id === idCategoria)!.name);
            setDescription(categorias.find(categoria => categoria._id === idCategoria)!.description);
            setFields(categorias.find(categoria => categoria._id === idCategoria)!.fields.join(', '));
        }
        else{
            setName('');
            setDescription('');
            setFields('');
        }

    }, [isVisible])

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (idCategoria === '') {
            setCategorias([...categorias, {_id: (categorias.length + 1).toString(), name, description, fields: fields.split(', '), created: new Date(), updated: new Date()}]);
        }
        else{
            const update = new Date();
            
            let temp = categorias;
            
            temp[parseInt(idCategoria)-1].name = name;
            temp[parseInt(idCategoria)-1].description = description;
            temp[parseInt(idCategoria)-1].fields = fields.split(', ');
            temp[parseInt(idCategoria)-1].updated = update;

            setCategorias(temp);
        }

        setIsVisible(false);
        setIdCategoria('');
    };

    return (
        <div className='flex justify-end rounded-lg shadow-2xl'>
            <Button className="border-2 rounded-lg border-green-600 text-green-600 hover:bg-green-600 hover:text-white" icon="pi pi-plus" onClick={() => {setIdCategoria(''); setIsVisible(true)}} />
            <Dialog className="w-1/2 h-auto text-center" header="Nuevo Categoria" visible={isVisible} onHide={() => setIsVisible(false)}>
                <form onSubmit={Submit} className='my-2'>
                    <div className="mb-4">
                        <TextInput id='name' label='Name' value={name} setValue={setName}/>
                    </div>
                    <div className="mb-4">
                        <TextInput id='description' label='Description' value={description} setValue={setDescription}/>
                    </div>
                    <div className="mb-4">
                        <TextInput id='fields' label='Fields' value={fields} setValue={setFields}/>
                    </div>
                    <button type="submit" className="w-1/2 py-2 px-4 border border-blue-500 rounded-md shadow-sm text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{idCategoria !== '' ? 'Guardar' : 'Añadir Categoria'}</button>
                </form>
            </Dialog>
        </div>
    );

};

export default ModalCategory;