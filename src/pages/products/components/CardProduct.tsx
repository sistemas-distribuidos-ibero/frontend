import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useAPI } from "@hooks/useAPI";
import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type params = {
    producto: Product
    className?: string
};

const CardProduct = ({ producto, className }: params) => {
    const { get } = useAPI()
    const [categorie, setCategory] = useState<Category>()

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await get(`categories/${producto.id_category}`, '');
            if (response) {
                setCategory(response);
            }
        }

        fetchProduct();
    }, [])

    return (
        <Link to={`/products/${producto._id}`} className="self-start inline-flex items-center gap-2">
            <Card className={"mx-3 my-2 h-52 w-64 hover:shadow-lg" + (className ? " " + className : "")}
                title={
                    <div className="flex flex-row justify-between">
                        <h3>{producto.name}</h3>
                        <ShoppingCartIcon className="border-2 border-green-600 h-10 w-10  p-1 text-green-600 hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white rounded-lg" />
                    </div>
                }
                subTitle={
                    <div>
                        <h4>{categorie?.name}</h4>
                        <p>${producto.price} &mdash; Stock: <em className="text-sm bg-slate-200 p-1 pe-2 text-center rounded-md">{producto.stock}</em> </p>
                    </div>
                }
            >
                <div className="text-700">{producto.description}</div>
                {/* <Button label="Add to Cart" icon="pi pi-shopping-cart" /> */}
            </Card>
        </Link>
    );
}

export default CardProduct