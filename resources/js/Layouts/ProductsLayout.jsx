import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import '/resources/css/authenticatedLayout/styles.css';
import AuthenticatedLayout from './AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ProductsLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    
    const paths = [
        {
            'id': '0',
            'name': 'Products',
            'route': 'products'
        },
        {
            'id': '1',
            'name': 'Create Product',
            'route': 'create-product'
        },
        // {
        //     'id': '2',
        //     'name': 'Users',
        //     'route': 'users'
        // },
        // {
        //     'id': '3',
        //     'name': 'Products',
        //     'route': 'products'
        // },
        // {
        //     'id': '4',
        //     'name': 'Tools',
        //     'route': 'tools'
        // }
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex w-1/2 p-4 justify-between">
                                {paths?.map((path, i) => (
                                    <div>
                                        <ResponsiveNavLink 
                                            subNavLinks={true} 
                                            href={route(`${path.route}`)}
                                            active={route().current(`${path.route}`)}
                                        >
                                            {path.name}
                                        </ResponsiveNavLink>
                                    </div>
                                    
                                ))}
                            </div>
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
