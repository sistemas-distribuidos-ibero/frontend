import PageTemplate from "@assets/page/PageTemplate";
import { FormEvent, useState } from "react";

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import TextInput from "@assets/components/TextInput";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

const Signup = () => {

    const [loginCorrect, setLogin] = useState(true)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorType, setErrorType] = useState(1)

    const errors = {
        1: 'Empty First Name input!',
        2: 'Empty Last Name input!',
        3: 'Add an email!',
        4: 'Empty Username input!',
        5: 'Empty Password!',
        6: 'Review the inputs or change Username!'
    }

    const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (firstName === '') {
            setLogin(false)
        }
        else if (lastName === '') {
            setErrorType(2)
            setLogin(false)
        }
        else if (email === '') {
            setErrorType(3)
            setLogin(false)
        }
        else if (password === '') {
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
            <Link to="/" className="self-start inline-flex items-center gap-2">
                <ArrowLeftIcon className="w-6" />
                Back
            </Link>

            <form onSubmit={OnSubmit}>
                <Card title="Signup" className="bg-transparent lg:w-1/2 xl:w-1/3 mx-auto text-center rounded-xl px-4">
                    {/* First Name */}
                    <TextInput
                        logo={<EnvelopeIcon className="w-7" />}
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        setValue={setFirstName}
                    />

                    {/* Last Name */}
                    <TextInput
                        logo={<EnvelopeIcon className="w-7" />}
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        setValue={setLastName}
                    />

                    {/* Email */}
                    <TextInput
                        logo={<EnvelopeIcon className="w-7" />}
                        id="email"
                        label="Email"
                        value={email}
                        setValue={setEmail}
                    />

                    {/* Password */}
                    <TextInput
                        logo={<EnvelopeIcon className="w-7" />}
                        id="password"
                        label="Password"
                        value={password}
                        setValue={setPassword}
                    />

                    {loginCorrect === false && (
                        <p className="text-red-600 font-light text-sm text-center">{errors[errorType]}</p>
                    )}

                    <div className="flex justify-center">
                        <Button label="Sign Up" className="border-2 border-violet-800 text-violet-800 hover:bg-violet-800 focus:bg-violet-800 hover:text-white focus:text-white my-3 py-1 px-4" />
                    </div>

                    <p>
                        Already have an account?
                        <Link to="/login" className="text-violet-800 ms-1 border-b-2 border-violet-800/80">
                            Login here!
                        </Link>
                    </p>
                </Card>
            </form>
        </PageTemplate>
    );


}

export default Signup;