import PageTemplate from "@assets/page/PageTemplate";
import { FormEvent, useState } from "react";

import { Card } from 'primereact/card';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";

const Signup = () => {

    const [loginCorrect, setLogin] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorType, setErrorType] = useState(1)

    const errors: any = {
        1: 'Empty First Name input!',
        2: 'Empty Last Name input!',
        3: 'Add an email!',
        4: 'Empty Username input!',
        5: 'Empty Password!',
        6: 'Review the inputs or change Username!'
    }

    const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        if (firstName === ''){
            setLogin(false)
        }
        else if (lastName === ''){
            setErrorType(2)
            setLogin(false)
        }
        else if (email === ''){
            setErrorType(3)
            setLogin(false)
        }
        else if (username === ''){
            setErrorType(4)
            setLogin(false)
        }
        else if (password === ''){
            setErrorType(5)
            setLogin(false)
        }
        // else {
        //     const res = await session.signup(firstName, lastName, email, username, password, new Date(), new Date(), false);
        //     console.log(res)
        //     if (res === true){
        //         goHome('/learn')
        //     }
        //     else {
        //         setErrorType(6)
        //         setLogin(false)
        //     }
        // }
    }

    return (
        <PageTemplate>

            <form onSubmit={OnSubmit}>

                <Link to="/" className=" self-start">
                    Back
                </Link>

                <Card title="Signup" className="w-1/2 mx-auto mt-10 p-5 shadow mb-5 text-center bg-blue-100 rounded text-black">
                    {/* First Name */}
                    <FloatLabel>
                        <InputText id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <label htmlFor="firstName">Firstname</label>
                    </FloatLabel>

                    {/* Last Name */}
                    <FloatLabel>
                        <InputText id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <label htmlFor="lastName">Lastname</label>
                    </FloatLabel>

                    {/* Email */}
                    <FloatLabel>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </FloatLabel>

                    {/* Username */}
                    <FloatLabel>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>

                    {/* Password */}
                    <FloatLabel>
                        <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </FloatLabel>

                    <Button label="Signup" />

                    <Link to="/login" className="text-[#76ABAE]">
                        If you already have an account, click me!
                    </Link>

                    {loginCorrect === false && (
                        <h2 className="text-red-600 font-semibold text-lg">{errors[errorType]}</h2>
                    )}

                </Card>

            </form>

        </PageTemplate>
    );


}

export default Signup;