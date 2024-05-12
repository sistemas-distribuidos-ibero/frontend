import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { HomeIcon, TagIcon, UserPlusIcon, UserIcon, UserCircleIcon, ShoppingCartIcon, ArchiveBoxIcon, QueueListIcon, UserMinusIcon } from '@heroicons/react/24/outline';
import { SplitButton } from 'primereact/splitbutton';

import ButtonLink from '@assets/ButtonLink';
import { useSessionContext } from '@hooks/useSessionContext';

const NavBar = () => {
    const context = useSessionContext()
    const navigator = useNavigate()

    const isAdmin = false

    const items: MenuItem[] = useMemo(() => {
        if (isAdmin) {
            return [
                {
                    label: 'Products',
                    icon: <QueueListIcon className='w-7 pe-1' />,
                    command: () => navigator('/admin/products')
                },
                {
                    label: 'Categories',
                    icon: <TagIcon className='w-7 pe-1' />,
                    command: () => navigator('/admin/categories')
                },
            ]
        }
        else {
            const temp = [
                {
                    label: 'Home',
                    icon: <HomeIcon className='w-7 pe-1' />,
                    command: () => navigator('/')
                },
                {
                    label: 'Products',
                    icon: <TagIcon className='w-7 pe-1' />,
                    command: () => navigator('/products')
                },
            ]

            if (context.user) {
                temp.push({
                    label: 'My Orders',
                    icon: <ArchiveBoxIcon className='w-7 pe-1' />,
                    command: () => navigator('/orders')
                })
            }

            return temp
        }
    }, [context.user, navigator])


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
                <section className='flex md:gap-2' >
                    {
                        context.user ? (
                            <>
                                <ButtonLink to='/cart'>
                                    <ShoppingCartIcon className='w-7 pe-1' />
                                    Cart
                                </ButtonLink>

                                <SplitButton
                                    label={`Hello, ${context.user.name}`}
                                    icon={<UserCircleIcon className='w-7 pe-1' />}
                                    onClick={() => navigator('/me')}
                                    model={[{
                                        label: 'Logout',
                                        icon: <UserMinusIcon className='w-8 pe-2' />,
                                        command: () => {
                                            context.logout()
                                            navigator('/')
                                        }
                                    }]}
                                />
                            </>
                        ) : (
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
                        )}
                </section >
            }
        />
    );
}

export default NavBar;