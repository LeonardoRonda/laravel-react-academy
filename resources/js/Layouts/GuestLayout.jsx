import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950">
            <Navbar />

            <main className="flex-1 w-full">
                <div className="w-full px-4 py-8">
                    <div className="mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
