import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "primereact/button";

interface Props {
    product: Product
    quantity: number
    IncrementProduct: (product_id: string) => void
    DecrementProduct: (product_id: string) => void
}

const ProductCard = ({ product, quantity, IncrementProduct, DecrementProduct }: Props) => {
    return (
        <li className="flex justify-between border-b-2 py-2 my-3">
            <header className="flex-grow">
                <h3 className="text-xl font-semibold tracking-wide mb-1">{product.name}</h3>
                <p className="text-lg text-slate-500">${product.price}</p>
            </header>
            <div className="flex gap-3 items-center">
                <Button type="button" className="border-2 border-red-600 py-1 text-red-600 hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white" icon={<MinusIcon className="w-7" />} onClick={() => DecrementProduct(product._id)} />
                <p className="bg-slate-100 px-2 py-1 rounded">{quantity}</p>
                <Button type="button" className="border-2 border-green-600 py-1 text-green-600 hover:bg-green-600 hover:text-white focus:bg-green-600 focus:text-white" icon={<PlusIcon className="w-7" />} onClick={() => IncrementProduct(product._id)} />
            </div>
        </li>
    );
}

export default ProductCard;