import CheckoutForm from "@pages/cart/components/CheckoutForm";
import PageTemplate from "@assets/page/PageTemplate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";




const { post, delet} = useAPI();

const addItemToCart = async (userId, itemId, quantity, token) => {
    const endpoint = '/cart';
    const body = JSON.stringify({ user_id: userId, item_id: itemId, quantity: quantity });
    return await post(endpoint, token, body);
}


const fetchCart = async (userId, token) => {
    const endpoint = '/get-cart';
    const body = JSON.stringify({ user_id: userId });
    return await post(endpoint, token, body);
}


const { delet } = useAPI();  // Note: Consider renaming 'delet' to 'delete' in your hook for better readability.

const deleteCart = async (userId, token) => {
    const endpoint = '/cart';
    const body = JSON.stringify({ user_id: userId });
    return await delet(endpoint, token, body);
}



const Pay = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    // TODO: get amount from cart
    const amount = 1

    return (
        <PageTemplate>
            <Elements stripe={stripePromise} options={{
                mode: 'payment',
                amount: amount * 100,
                currency: 'usd',
                locale: 'en',
            }}
            >
                <CheckoutForm amount={amount} products={[
                    {
                        id: "1",
                        name: "Product 1",
                        price: 100,
                    },
                    {
                        id: "2",
                        name: "Product 2",
                        price: 200,
                    }
                ]} />
            </Elements>
        </PageTemplate>
    );
}

export default Pay;