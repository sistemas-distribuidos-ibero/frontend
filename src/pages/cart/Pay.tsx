import CheckoutForm from "@pages/cart/components/CheckoutForm";
import PageTemplate from "@assets/page/PageTemplate";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSessionContext } from '@hooks/useSessionContext';

const Pay = () => {
    const context = useSessionContext();
    
    const user_id =context?.user

    if (!user_id) {
        return <div>User not found, please log in.</div>;
    }
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    // TODO: get amount from cart
    const amount = 1

    return (
        
        <PageTemplate>
            <div>Hello, {context.user.name}</div>
            
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