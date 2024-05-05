import { BookOpenIcon, CameraIcon, DevicePhoneMobileIcon, GiftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useState, useEffect, useRef } from 'react';

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

    const handleResize = () => {
        if (imageRef.current) {
            const image = imageRef.current
            // 1007
            // 1260
            let heightFactor = 2.8
            let widthFactor = 1.8

            if (window.innerWidth > 1007 && window.innerWidth < 1280) {
                heightFactor = 3
                widthFactor = 2.5
            }

            setStyle({
                'top': image.height / heightFactor,
                'left': image.width / widthFactor,
                'offsetPath': `path('M 0 0 A 10 16 0 0 1 ${image.width / 3.95} ${image.height / 2.1}')`
            })
        }
    }

    useEffect(() => {
        if (imageRef.current) {
            handleResize()
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (

        <figure className="relative shopping-svg mt-12">
            <img ref={imageRef} src="/images/shopping.svg" alt="Web Shopping" className="w-9/12 lg:w-full xl:w-9/12 mx-auto" />

            {logos.map((logo, index) =>
                <div key={index} className="floating absolute w-10 p-1 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm text-violet-800" style={style}>
                    {logo}
                </div>
            )}

            <figcaption className="hidden">An illustration of shopping</figcaption>
        </figure >
    );
}

export default ShoppingIllustration;