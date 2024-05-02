import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { HomeIcon, TagIcon, UserPlusIcon, UserIcon, UserCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ButtonLink from '@assets/ButtonLink';

const NavBar = () => {

    const bool = true

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
        <Menubar className='p-3 sm:px-8 bg-gradient-to-b from-violet-800/50'
            start={
                <hgroup id='top' className='me-3 md:me-8' >
                    {/* TODO Logo */}
                    <Link to='/' className='text-lg md:text-2xl'>E-Commerce</Link>
                </hgroup>
            }

            model={items}

            end={
                <section className='flex gap-2'>
                    {bool ? (
                        <>
                            <ButtonLink to='/signup'>
                                <UserPlusIcon className='w-7 pe-1' />
                                Signup
                            </ButtonLink>
                            <ButtonLink to='/login'>
                                <UserIcon className='w-7 pe-1' />
                                Login
                            </ButtonLink>
                        </>
                    ) : (
                        <>
                            <ButtonLink to='/cart'>
                                <ShoppingCartIcon className='w-7 pe-1' />
                                Cart
                            </ButtonLink>
                            <ButtonLink to='/me'>
                                <UserCircleIcon className='w-7 pe-1' />
                                Profile
                            </ButtonLink>
                        </>
                    )}
                </section>
            }

        />
    );
}

export default NavBar;