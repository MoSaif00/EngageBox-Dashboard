import React from 'react';
import Link from 'next/link';

const CheckoutSuccess: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen p-5">
            <h1 className="text-4xl text-primary mb-5">Checkout Successful!</h1>
            <p className="text-lg text-muted-foreground mb-10 text-center">
                Thank you for your purchase. Your transaction has been completed successfully.
            </p>
            <Link href="/dashboard" className="px-5 py-2 text-lg text-primary  bg-secondary rounded ">
                Return to Dashboard
            </Link>
        </div>
    );
};

export default CheckoutSuccess;
