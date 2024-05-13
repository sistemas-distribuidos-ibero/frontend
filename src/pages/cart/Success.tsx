import PageTemplate from "@assets/page/PageTemplate";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useAPI } from "@hooks/useAPI";
import { useSessionContext } from "@hooks/useSessionContext";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Success = () => {
    const { id } = useParams()
    const context = useSessionContext()
    const { get, post, delet } = useAPI()

    useEffect(() => {
        const getData = async () => {
            const response = await get('users/' + id, '')

            if (response) {
                context.setUser(response.user)
            }

            const buy = await post('buy/' + id, '', JSON.stringify({ index_url: '' }))


            const mail = await post('sendOrderConfirmation', '', JSON.stringify({ email: response.user.email, nombreUsuario: response.user.name + ' ' + response.user.lastname, index_url: '', order_id: buy.order_id }))

            console.log(mail);

            const delete_cart = await delet('cart/' + id, '')

            console.log(delete_cart);
        }

        getData()
    }, [])

    return (
        <PageTemplate>
            <Link to="/" className="self-start inline-flex items-center gap-2 mb-5">
                <ArrowLeftIcon className="w-6" />
                Back
            </Link>
            <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="text-3xl text-green-600">Purchase successful</h1>
                <p className="text-center">An email has been sent to your inbox with the details</p>
                <p className="text-lg">Thank you for your purchase!</p>

                <img className="w-3/4 mt-5" src="/images/purchase.svg" alt="Purchase Successful" />
            </div>
        </PageTemplate>
    );
}

export default Success;