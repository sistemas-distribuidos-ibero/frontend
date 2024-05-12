export type Product = {
    id: string;
    category: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    created: Date;
    updated: Date;
};

export type Category = {
    id: string;
    name: string;
    description: string;
    fields: string[];
    created: Date;
    updated: Date;
};