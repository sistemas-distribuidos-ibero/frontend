import CheckoutForm from "@pages/cart/components/CheckoutForm";
import PageTemplate from "@assets/page/PageTemplate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useAPI } from "@hooks/useAPI";
import { useSessionContext } from "@hooks/useSessionContext";

const Pay = () => {
    const context = useSessionContext()
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const [amount, setAmount] = useState(1)
    const [products, setProducts] = useState<Product[]>([])
    const { post, get } = useAPI()

    useEffect(() => {
        const getData = async () => {
            const response = await post('get_cart', '', JSON.stringify({ user_id: context.user?.id }))

            if (response) {
                const keys = Object.keys(response)

                for (const key of keys) {
                    const product = await get('products/' + key, '')

                    setAmount(amount + product.price * response[key])

                    product['quantity'] = response[key]

                    setProducts([...products, product])
                }
            }
        }

        getData()
    }, [])

    return (
        <PageTemplate>
            <Elements stripe={stripePromise} options={{
                mode: 'payment',
                amount: amount * 100,
                currency: 'usd',
                locale: 'en',
            }}
            >
                <CheckoutForm amount={amount} products={products} />
            </Elements>
        </PageTemplate>
    );
}

export default Pay;