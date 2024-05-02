import PageTemplate from "@assets/page/PageTemplate";
import { FormEvent, useState } from "react";

import { Card } from 'primereact/card';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
        


const Login = () => {
 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginCorrect, setLogin] = useState(true)

    const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // const res = await context.login(username, password);

        // console.log(res)
        // if (res == true){
        //     goHome('/learn')
        // }
        // else{
        //     setLogin(false)
        // }
    }

    return (
        <PageTemplate>

            <form onSubmit={OnSubmit}>

                <Link to="/" className=" self-start">
                    Back
                </Link>

                <Card title="Login" className="w-1/2 mx-auto mt-10 p-5 shadow mb-5 text-center bg-blue-100 rounded text-black">
                    
                    <FloatLabel>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>

                    <FloatLabel>
                        <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </FloatLabel>

                    <Button label="Login" />

                    <Link to="/signup" className="text-[#76ABAE]">
                        If you don't have an account yet, click me!
                    </Link>
                    {loginCorrect === false && (
                        <h2 className="text-red-600 font-semibold text-lg">Incorrect user or password</h2>
                    )}

                </Card>

            </form>

        </PageTemplate>
    );

}

export default Login;