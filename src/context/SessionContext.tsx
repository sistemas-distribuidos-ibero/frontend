import React, { useEffect, useState } from "react";
import { useAPI } from "hooks/useAPI";

export const SessionContext = React.createContext<SessionContextModel>({
    login: () => Promise.resolve(false),
    signup: () => Promise.resolve(false),
    logout: () => { },
    cart: undefined, // Adding cart to the context
})

type Props = {
    children: React.ReactNode
}

const SessionContextProvider = ({ children }: Props) => {

    const { post } = useAPI()

    const [user, setUser] = React.useState<User>()
    const [cart, setCart] = useState<Cart>(); // State to store the cart

    useEffect(() => {
        if (user) {
            const fetchCart = async () => {
                const response = await post('get_cart', '', JSON.stringify({ user_id: user.id }));
                if (response && response.cart) {
                    setCart(response.cart);
                }
            };
            fetchCart();
        } else {
            setCart(undefined); // Clear cart if no user is logged in
        }
    }, [user]); // Fetch cart whenever the user changes

    const login = async (email: string, password: string) => {
        const response = await post('login', '', JSON.stringify({ email: email, password: password }))
        
        console.log(response);

        if (response) {
            setUser(response.user)
            return true
        }
        else {
            return false
        }
    }

    const signup = async (name: string, lastname: string, email: string, password: string) => {
        const response = await post('register', '', JSON.stringify(
            {
                name: name,
                lastname: lastname,
                email: email,
                password: password
            }
        ))

        console.log(response)

        if (response) {
            setUser(response.user)
            return true
        }
        else {
            return false
        }
    }

    const logout = () => {
        setUser(undefined);
        setCart(undefined);
    }

    const sessionContext: SessionContextModel = {
        user,
        login,
        signup,
        logout,
        cart
    }

    return (
        <SessionContext.Provider value={sessionContext}>
            {children}
        </SessionContext.Provider>
    );
}

export default SessionContextProvider;