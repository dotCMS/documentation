import React from 'react';
import Link from 'next/link';

const Footer = (): JSX.Element => {
    return (
        <footer className="border-b border-t border-secondary flex justify-between items-center h-14 px-8 text-sm">
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
