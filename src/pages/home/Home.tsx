import { LegacyRef, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Stepper, StepperRefAttributes } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';

import {
    BookOpenIcon, PencilIcon,
    CameraIcon, TruckIcon,
    DevicePhoneMobileIcon, GiftIcon,
    ShoppingBagIcon, CreditCardIcon,
} from "@heroicons/react/24/outline";

import PageTemplate from "@assets/PageTemplate";
import FloatingItem from "@assets/components/FloatingItem";

import "@styles/floatingItem.css";

const Home = () => {
    const logos = [
        <BookOpenIcon />,
        <CameraIcon />,
        <DevicePhoneMobileIcon />,
        <GiftIcon />,
        <PencilIcon />,
    ]

    const stepperRef = useRef<StepperRefAttributes | undefined>(undefined);

    return (
        <PageTemplate needBack2Top>
            <section className="py-24 lg:py-32 flex flex-col items-center">
                <h1 className="text-5xl text-center pb-2">Welcome to E-Commerce</h1>
                <p className="text-center text-xl italic text-violet-900">The <strong className="font-medium">best store</strong> online!</p>
                <Link to="/products" className="mt-4 border-4 rounded-lg border-violet-800 w-32 p-2 text-violet-900 hover:bg-violet-800 hover:text-white focus:bg-violet-800 focus:text-white text-center font-semibold tracking-wider">Go shop now</Link>
            </section>

            <hr />

            <section className="lg:grid lg:grid-cols-2 py-3 lg:py-12 lg:gap-8 lg:items-center">
                <div>
                    <h2 className="text-2xl mb-2">What is E-Commerce?</h2>
                    <p className="mb-4 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, in. Aspernatur temporibus tempora eveniet assumenda magni animi voluptatum error? Aliquam optio odit modi! Dolores nesciunt ad fuga recusandae, aliquid quas animi iusto soluta! Ipsum, illo? Amet cumque odio repudiandae eveniet aliquid accusamus pariatur exercitationem ratione! Hic laborum molestiae fugit magni!</p>

                    <Stepper ref={stepperRef as LegacyRef<StepperRefAttributes>} orientation={window.innerWidth < 768 ? "horizontal" : "vertical"}>
                        <StepperPanel header="Choose">
                            <div className="border-2 border-dashed rounded-xl flex flex-col justify-center items-center py-5 my-1">
                                <ShoppingBagIcon className="w-12 text-violet-800" />
                                <p className="text-center mt-2">We the best products and offers for you to choose from</p>
                            </div>
                            <footer className="flex pt-4 justify-center gap-4">
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                            </footer>
                        </StepperPanel>
                        <StepperPanel header="Pay">
                            <div className="border-2 border-dashed rounded-xl flex flex-col justify-center items-center py-5 my-1">
                                <CreditCardIcon className="w-12 text-violet-800" />
                                <p className="text-center mt-2">We have prepare for you all possible pay methods for you to choose</p>
                            </div>
                            <footer className="flex pt-4 justify-center gap-4">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                                <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current?.nextCallback()} />
                            </footer>
                        </StepperPanel>
                        <StepperPanel header="Receive">
                            <div className="border-2 border-dashed rounded-xl flex flex-col justify-center items-center py-5 my-1">
                                <TruckIcon className="w-12 text-violet-800" />
                                <p className="text-center mt-2">Relax and wait for your order to arrive</p>
                            </div>
                            <footer className="flex pt-4 justify-center gap-4">
                                <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current?.prevCallback()} />
                            </footer>
                        </StepperPanel>
                    </Stepper>
                </div>

                <figure className="relative shopping-svg mt-12">
                    <img src="/images/shopping.svg" alt="Web Shopping" className="w-9/12 lg:w-full xl:w-9/12 mx-auto" />

                    {logos.map((logo, index) => <FloatingItem logo={logo} key={index} />)}

                    <figcaption className="hidden">An illustration of shopping</figcaption>
                </figure>
            </section>

            <hr />

            <section>
                {/* 
                    Fresh items
                    Products 
                    Go buy Now
                */}

            </section>
            {/* 
                Fresh items
                Products 
                Go buy Now
            */}

            {/* 
                Explore our categories
                Categories
                Go buy Now
            */}

            {/* 
                Products carrousel
            */}
        </PageTemplate >
    );
}
export default Home;