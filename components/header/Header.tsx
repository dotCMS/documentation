import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

// Compoments
import DotcmsLogo from './components/DotcmsLogo';
import HamburgerButton from './components/HamburgerButton';
import HeaderNav from './components/HeaderNav';
import HeaderSelect from './components/HeaderSelect';
import Search from './components/Search';

export const Header = (): JSX.Element => {
    const buttonIconClasses = [
        'border-secondary',
        'border',
        'flex',
        'focus:outline-none',
        'items-center',
        'justify-center',
        'md:hidden'
    ];
    return (
        <header className="md:h-32">
            <div className="bg-purple border-gray-100 content-center flex flex-col justify-between md:flex-row md:h-full md:items-start md:justify-center md:pt-6 md:px-6">
                <div className="flex h-20 justify-between md:h-full md:p-0 md:w-2/12 pt-6 px-6 w-full">
                    <DotcmsLogo />
                    <HamburgerButton />
                </div>
                <div className="bg-white flex h-12 justify-center lg:justify-start lg:px-0 md:bg-transparent md:flex md:flex-col md:h-full md:px-6 md:w-7/12 w-full">
                    <button className={classNames('border-r-0 w-1/12', buttonIconClasses)}>
                        <i className="-rotate-45 border border-b-2 border-gray-50 border-l-0 border-r-2 border-t-0 inline-block p-1 transform" />
                    </button>
                    <Search />
                    <button className={classNames('border-l-0 w-1/12', buttonIconClasses)}>
                        <svg
                            className="m-auto"
                            fill="none"
                            height="20"
                            viewBox="0 0 18 18"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.2087 4.59973H5.80297C5.18128 4.59973 4.67725 5.04711 4.67725 5.68914C4.67725 6.33116 5.18116 6.77854 5.80297 6.77854H14.2087C14.8304 6.77854 15.3344 6.33116 15.3344 5.68914C15.3344 5.04711 14.8304 4.59973 14.2087 4.59973Z"
                                fill="#5B6175"
                            />
                            <path
                                d="M1.62108 6.85592C2.2428 6.85592 2.7468 6.3355 2.7468 5.69352C2.7468 5.05155 2.2428 4.53113 1.62108 4.53113C0.999363 4.53113 0.495361 5.05155 0.495361 5.69352C0.495361 6.3355 0.999363 6.85592 1.62108 6.85592Z"
                                fill="#5B6175"
                            />
                            <path
                                d="M14.2087 9.07843H5.80297C5.18128 9.07843 4.67725 9.58646 4.67725 10.2284C4.67725 10.8703 5.18116 11.3783 5.80297 11.3783H14.2087C14.8304 11.3783 15.3344 10.8703 15.3344 10.2284C15.3344 9.58646 14.8304 9.07843 14.2087 9.07843Z"
                                fill="#5B6175"
                            />
                            <path
                                d="M1.62108 11.4279C2.2428 11.4279 2.7468 10.9075 2.7468 10.2655C2.7468 9.62357 2.2428 9.10315 1.62108 9.10315C0.999363 9.10315 0.495361 9.62357 0.495361 10.2655C0.495361 10.9075 0.999363 11.4279 1.62108 11.4279Z"
                                fill="#5B6175"
                            />
                            <path
                                d="M14.2087 13.6782H5.80297C5.18128 13.6782 4.67725 14.1862 4.67725 14.8281C4.67725 15.47 5.18116 15.978 5.80297 15.978H14.2087C14.8304 15.978 15.3344 15.47 15.3344 14.8281C15.3344 14.1862 14.8304 13.6782 14.2087 13.6782Z"
                                fill="#5B6175"
                            />
                            <path
                                d="M1.62108 16C2.2428 16 2.7468 15.4796 2.7468 14.8376C2.7468 14.1957 2.2428 13.6752 1.62108 13.6752C0.999363 13.6752 0.495361 14.1957 0.495361 14.8376C0.495361 15.4796 0.999363 16 1.62108 16Z"
                                fill="#5B6175"
                            />
                            <path
                                d="M14.2086 0H1.12572C0.504032 0 0 0.507906 0 1.14993C0 1.79195 0.503911 2.29986 1.12572 2.29986H14.2088C14.8304 2.29986 15.3345 1.79195 15.3345 1.14993C15.3343 0.507906 14.8303 0 14.2086 0Z"
                                fill="#5B6175"
                            />
                        </svg>
                    </button>
                    <nav className="hidden md:inline-blockhidden md:inline-block">
                        <HeaderNav />
                    </nav>
                </div>
                <div className="flex-col h-full hidden items-end justify-end md:flex w-3/12">
                    <HeaderSelect />
                    <Link href="#">
                        <a className="no-underline py-2 text-white">Customer Support</a>
                    </Link>
                </div>
            </div>
        </header>
    );
};
