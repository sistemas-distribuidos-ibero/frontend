import { BanknotesIcon } from "@heroicons/react/24/outline";
import { usePayment } from "@hooks/usePayment";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "primereact/button";
import { FormEvent } from "react";
import ProductCard from "./ProductCard";

interface Props {
    amount: number
    products: any[]
}

const CheckoutForm = ({ amount, products }: Props) => {
    const { getClientSecret, confirmPayment, message } = usePayment(amount)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await getClientSecret()
        await confirmPayment()
    }

    return (
        <>
            <h1 className="text-2xl font-semibold tracking-wide text-center">Payment</h1>
            <form className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full px-2 mt-8 gap-5" onSubmit={onSubmit}>
                <ul className="max-h-[75vh] overflow-y-auto py-5 lg:col-span-2 xl:col-span-3">
                    {products.map((product, i) => (
                        <ProductCard
                            product={product}
                            key={i}
                            quantity={1}
                            IncrementProduct={() => { }}
                            DecrementProduct={() => { }}
                        />
                    ))}
                    <li className="flex justify-end border-b-2 py-2 my-3">
                        <h3 className="text-xl font-semibold tracking-wide mb-1">Total: ${amount}</h3>
                    </li>
                </ul>
                <div className="flex flex-col items-center gap-5 border-t-2 mt-8 pt-4 sm:border-0 sm:mt-0 sm:pt-0">
                    <PaymentElement />
                    <Button
                        className="w-32 px-2 p-1 text-center border-2 border-violet-800 text-violet-800 hover:bg-violet-800 hover:text-white focus:bg-violet-800 focus:text-white"
                        label="Pay"
                        icon={<BanknotesIcon className="w-7 pe-1" />}
                    />

                    {message && <p className="text-red-600 font-light text-sm text-center">{message}</p>}
                </div>
            </form>
        </>
    );
}

export default CheckoutForm;