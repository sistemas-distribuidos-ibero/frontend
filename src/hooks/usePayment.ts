import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useAPI } from './useAPI';
import { useSessionContext } from './useSessionContext';

export const usePayment = (amount: number) => {
    const stripe = useStripe()
    const elements = useElements()
    const { post } = useAPI()

    const [clientSecret, setClientSecret] = useState("");
    const [message, setMessage] = useState("");

    const context = useSessionContext()


    const getClientSecret = async () => {
        const data = await post('create-payment-intent', '', JSON.stringify(
            {
                amount: amount,
                customer: "Carlos Castro"
            }
        ))

        if (data) {
            setClientSecret(data["clientSecret"])
        }
    }

    const confirmPayment = async () => {
        if (stripe && clientSecret && elements) {
            elements.submit()

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: "http://localhost:5173/cart/success/" + context.user?.id
                }
            })

            if (error.message) {
                setMessage(error.message)
            }
        }

        setMessage("Something went wrong")
    }


    return { getClientSecret, confirmPayment, message }
}