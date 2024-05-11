import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { HomeIcon, TagIcon, UserPlusIcon, UserIcon, UserCircleIcon, ShoppingCartIcon, ArchiveBoxIcon, QueueListIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import ButtonLink from '@assets/ButtonLink';
import { useMemo } from 'react';

type props = {
    isAdmin?: boolean
}

const tempU = [
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

const tempA = [
    {
        label: 'Products',
        icon: <QueueListIcon className='w-7 pe-1' />,
        url: '/admin/products',
    },
    {
        label: 'Categories',
        icon: <TagIcon className='w-7 pe-1' />,
        url: '/admin/categories',
    },
]

const NavBar = ( { isAdmin }: props ) => {
    // TODO bool to user verification
    const notUser = true


    const items: MenuItem[] = useMemo(() => {
        let temp: MenuItem[] = []
        if (isAdmin) {
            temp = tempA
        }
        else{
            temp = tempU
        }

        if (!notUser) {
            temp.push({
                label: 'My Orders',
                icon: <ArchiveBoxIcon className='w-7 pe-1' />,
                url: '/orders',
            })
        }

        return temp
    }, [notUser, isAdmin])


    {/* start={start} end={end} */ }
    return (
        <Menubar id='top' className='p-3 sm:px-8 border-b-2 border-violet-800/80'
            start={
                <hgroup className='me-3 md:me-8 inline-flex gap-2' >
                    {/* <img src='/logo.svg' className='w-10' /> */}
                    <Link to='/' className='text-lg md:text-2xl font-semibold' > E - Commerce</Link>
                </hgroup >
            }

            model={items}

            end={
                <section className='flex gap-2' >
                    {
                        notUser ? (
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
                </section >
            }
        />
    );
}

export default NavBar;