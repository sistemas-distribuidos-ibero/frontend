import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
    children: React.ReactNode,
}

const PageTemplate = ({ children }: Props) => {
    return (
        <>
            <Navbar />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}

export default PageTemplate;