import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from './AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function ToolsLayout({ header, children }) {
    
    const paths = [
        {
            'id': '0',
            'name': 'Tools',
            'route': 'tools'
        },
        {
            'id': '1',
            'name': 'Colors',
            'route': 'create-colors'
        },
        {
            'id': '2',
            'name': 'Sizes',
            'route': 'create-sizes'
        },
        {
            'id': '3',
            'name': 'Heel Heights',
            'route': 'create-heel-heights'
        },
        {
            'id': '4',
            'name': 'Categories',
            'route': 'create-categories'
        },
        {
            'id': '5',
            'name': 'Order Types',
            'route': 'create-order-types'
        },
        {
            'id': '6',
            'name': 'Page Sections',
            'route': 'page_sections'
        }
        
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tools
                </h2>
            }
        >
            <Head title="Tools" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex w-full p-4 justify-between">
                                {paths.map((path, i) => (
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
