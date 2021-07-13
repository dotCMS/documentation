import React from 'react';
import Link from 'next/link';

export const Footer = (): JSX.Element => {
    return (
        <footer className="border-b border-secondary border-t px-4 text-sm md:px-8">
            <div className="flex flex-col h-14 items-center justify-center md:flex-row md:justify-between">
                <div>
                    <Link href="https://dotcms.com/blog/post/intranet-security-best-practices">
                        <a className="mr-5">Privacy</a>
                    </Link>
                    <Link href="https://dotcms.com/contact-us/">
                        <a>Contanct Us</a>
                    </Link>
                </div>
                <span>Copyright 2011-2021 dotCMS LLC. All rights reserved</span>
            </div>
        </footer>
    );
};
