import React from 'react';
import Link from 'next/link';

const Footer = (): JSX.Element => {
    return (
        <footer className="border-b border-secondary border-t flex flex-col h-14 items-center justify-center px-4 text-sm md:flex-row md:justify-between md:px-8">
            <div>
                <Link href="/">
                    <a className="mr-5">Privacy</a>
                </Link>
                <Link href="/">
                    <a>Contanct Us</a>
                </Link>
            </div>
            <span>Copyright 2011-2021 dotCMS LLC. All rights reserved</span>
        </footer>
    );
};

export default Footer;
