import { Head, Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Gallery from '@/Pages/Gallery/Page';
import HowToOrder from '@/Pages/Footer/HowToOrder';

export default function PublicLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <>
            <Head title="JOJO BRAGAIS" />
            <nav className="nav_container flex flex-1 justify-end">
                <Link className="absolute items-center justify-center flex w-full h-24" href="/">
                    <ApplicationLogo src="/assets/jojobragaiswhite.png" className="block h-16 w-auto fill-current text-gray-800" />
                </Link>
                {user ? (
                    <Link
                        href={route('dashboard')}
                        className="z-50 rounded-md px-8 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <div className="hidden">
                        {/* <Link
                            href={route('login')}
                            className="z-50 rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Log in
                        </Link>
                        <Link
                            href={route('registers')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Register
                        </Link> */}
                    </div>
                )}
            </nav>

            <div className="w-full overflow-hidden bg-white shadow-md">
                {children}
            </div>

            <div className="p-4 flex bg-white w-full justify-center items-center text-[#020E29] shadow-xl shadow-slate-600/50 z-10">
                <h1 className="text-xl font-bold">How to Order</h1>
            </div>

            <div className="footer_container p-16 bg-white text-black">
                <HowToOrder /> 
            </div>
        </>
    );
}
