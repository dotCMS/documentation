import React from 'react';

const HamburgerButton = (): JSX.Element => {
    return (
        <button className="flex md:hidden focus:outline-none ">
            <svg height="30" viewBox="0 0 100 80" width="40">
                <rect fill="#fff" height="10" width="80" />
                <rect fill="#fff" height="10" width="80" y="30" />
                <rect fill="#fff" height="10" width="80" y="60" />
            </svg>
        </button>
    );
};

export default HamburgerButton;
