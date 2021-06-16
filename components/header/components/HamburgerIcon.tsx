import React from 'react';

const HamburgerIcon = (): JSX.Element => {
    return (
        <svg
            fill="none"
            height="21"
            viewBox="0 0 26 21"
            width="26"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect fill="white" height="3" rx="1.5" width="26" />
            <rect fill="white" height="3" rx="1.5" width="26" y="9" />
            <rect fill="white" height="3" rx="1.5" width="26" y="18" />
        </svg>
    );
};

export default HamburgerIcon;
