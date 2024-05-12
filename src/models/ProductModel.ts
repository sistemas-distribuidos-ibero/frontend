export type Product = {
    id: number;
    category: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    created: Date;
    updated: Date;
    image: string;
    rating: number;
};

export type Category = {
    id: number;
    name: string;
    description: string;
    created: Date;
    updated: Date;
};