import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { HomeIcon, TagIcon } from '@heroicons/react/24/outline';

const NavBar = () => {

    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: <HomeIcon className='w-7 pe-1' />,
            url: '/',
        },
        {
            label: 'Products',
            icon: <TagIcon className='w-7 pe-1' />,
            url: '/products',
        }
    ]

    {/* start={start} end={end} */ }
    return (
        <Menubar model={items}
        // start={
        //     <hgroup>
        //         {/* TODO Logo */}
        //         <h2 className='text-lg md:text-2xl'>E-Commerce</h2>
        //     </hgroup>
        // }
        // end={
        //     <></>
        // }
        />
    );
}

export default NavBar;