import { BookOpenIcon, CameraIcon, DevicePhoneMobileIcon, GiftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useState, useRef } from 'react';
import { useResizeHandler } from 'hooks/useResizeHandler';

const ShoppingIllustration = () => {
    const logos = [
        <BookOpenIcon />,
        <CameraIcon />,
        <DevicePhoneMobileIcon />,
        <GiftIcon />,
        <PencilIcon />,
    ]

    const imageRef = useRef<HTMLImageElement>(null)
    const [style, setStyle] = useState({})

    useResizeHandler({ use: 'animation', setStyle, imageRef })

    return (

        <figure className="relative shopping-svg mt-12">
            <img ref={imageRef} src="/images/shopping.svg" alt="Web Shopping" className="w-9/12 lg:w-full xl:w-9/12 mx-auto" />

            {logos.map((logo, index) =>
                <div key={index} className="floating absolute w-7 sm:w-10 p-1 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm text-violet-800" style={style}>
                    {logo}
                </div>
            )}

            <figcaption className="hidden">An illustration of shopping</figcaption>
        </figure >
    );
}

export default ShoppingIllustration;