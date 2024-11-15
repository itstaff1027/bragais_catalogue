import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    subNavLinks = Boolean,
    ...props
}) {
    return (
        <>
            {subNavLinks ? 
                (
                    <Link
                        {...props}
                        className={`inline-flex w-full items-center border-b-2 px-1 p-2 text-lg font-medium leading-5 transition duration-150 ease-in-out focus:outline-none  ${
                            active
                                ? 'border-indigo-400 text-gray-900 focus:border-indigo-700'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700'
                        } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
                    >
                        {children}
                    </Link>
                ) : ( 
                    <Link
                        {...props}
                        className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                            active
                                ? 'border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800'
                                : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800'
                        } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
                    >
                        {children}
                    </Link> 
                )

            }
        </>
        
    );
}
