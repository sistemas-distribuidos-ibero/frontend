type Product = {
    [k: string]: string | number

    _id: string;
    id_category: string;
    name: string;
    description: string;
    stock: number;
    price: number;
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