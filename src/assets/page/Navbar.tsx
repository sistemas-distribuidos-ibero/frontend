import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { HomeIcon, TagIcon, UserPlusIcon, UserIcon, UserCircleIcon, ShoppingCartIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ButtonLink from '@assets/ButtonLink';
import { useMemo } from 'react';

const NavBar = () => {
    // TODO bool to user verification
    const notUser = true


    const items: MenuItem[] = useMemo(() => {
        const temp = [
            {
                label: 'Home',
                icon: <HomeIcon className='w-7 pe-1' />,
                url: '/',
            },
            {
                label: 'Products',
                icon: <TagIcon className='w-7 pe-1' />,
                url: '/products',
            },
        ]

        if (!notUser) {
            temp.push({
                label: 'My Orders',
                icon: <ArchiveBoxIcon className='w-7 pe-1' />,
                url: '/orders',
            })
        }

        return temp
    }, [notUser])


    {/* start={start} end={end} */ }
    return (
        <Menubar className='p-3 sm:px-8 bg-gradient-to-b from-violet-800/50'
            start={
                <hgroup id='top' className='me-3 md:me-8 inline-flex gap-2' >
                    <img src='/logo.svg' className='w-10' />
                    <Link to='/' className='text-lg md:text-2xl'>E-Commerce</Link>
                </hgroup>
            }

            model={items}

            end={
                <section className='flex gap-2'>
                    {notUser ? (
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