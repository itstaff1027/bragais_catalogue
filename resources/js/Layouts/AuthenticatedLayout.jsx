import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import '/resources/css/authenticatedLayout/styles.css';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    
    const paths = [
        {
            'id': '0',
            'name': 'Dashboard',
            'route': 'dashboard'
        },
        {
            'id': '1',
            'name': 'Registers',
            'route': 'registers'
        },
        {
            'id': '2',
            'name': 'Users',
            'route': 'users'
        },
        {
            'id': '3',
            'name': 'Products',
            'route': 'products'
        },
        {
            'id': '4',
            'name': 'Tools',
            'route': 'tools'
        }
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex border-r border-gray-100 bg-white">
                {/* <div className="flex flex-col h-full items-center px-4 sm:px-6 lg:px-8">
                    <nav className="flex shrink-0 items-center p-2">
                        <Link className="hidden sm:flex border-b-2" href="/">
                            <ApplicationLogo src="/assets/jojoBragaisWW.png" className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                        <Link className="flex sm:hidden border-b-2" href="/">
                            <ApplicationLogo src="/assets/BB3.png" className="block h-[52px] w-[70px] fill-current text-gray-800" />
                        </Link>
                    </nav>
                    <div className="hidden sm:flex sm:flex-col sm:h-full sm:items-center ">
                        <div className="hidden sm:-my-px sm:ms-10 sm:flex sm:flex-col sm:w-full">
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                            >
                                Dashboard
                            </NavLink>
                        </div>
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            {user.name}
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    
                    <div className="flex flex-col h-full items-center justify-between">

                        <div className="-me-2 flex h-full items-center justify-between">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div> */}
                <button
                    onClick={() =>
                        setShowingNavigationDropdown(
                            (previousState) => !previousState,
                        )
                    }
                    className="flex rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            className={
                                !showingNavigationDropdown
                                    ? 'inline-flex'
                                    : 'hidden'
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            className={
                                showingNavigationDropdown
                                    ? 'inline-flex'
                                    : 'hidden'
                            }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' '
                    }
                >
                    <nav className="flex shrink-0 items-center justify-center p-2">
                        <Link className="hidden items-center justify-center sm:flex border-b-2" href="/">
                            <ApplicationLogo src="/assets/jojoBragaisWW.png" className="block h-8 w-auto fill-current text-gray-800" />
                        </Link>
                        <Link className="flex items-center justify-center sm:hidden border-b-2" href="/">
                            <ApplicationLogo src="/assets/BB3.png" className="block h-[35px] w-[35px] fill-current text-gray-800" />
                        </Link>
                    </nav>
                    <div className="space-y-1 pb-3 pt-2">
                        {paths.map((path, i) => (
                            <ResponsiveNavLink
                                href={route(`${path.route}`)}
                                active={route().current(`${path.route}`)}
                                key={i}
                                subNavLinks={false}
                            >
                                {path.name}
                            </ResponsiveNavLink>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} subNavLinks={false}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                subNavLinks={false}
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
            
        </div>
    );
}
