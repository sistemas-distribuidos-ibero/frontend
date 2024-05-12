type Product = {
<<<<<<< HEAD
    [k: string]: string | number

    _id: string;
    id_category: string;
=======
    _id: string;
    category: string;
>>>>>>> juanpablo
    name: string;
    description: string;
    stock: number;
    price: number;
    fields: {[clave: string]: string};
    created: Date;
    updated: Date;
};

type Category = {
    _id: string;
    name: string;
    description: string;
    fields: string[];
    created: Date;
    updated: Date;
};