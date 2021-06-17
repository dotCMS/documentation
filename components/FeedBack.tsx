import React, { ReactNode } from 'react';

const FeedBack = (): JSX.Element => {
    return (
        <div className="flex items-center justify-end py-4 px-8">
            <span className="font-bold text-sm">Did this help you?</span>
            <FeedBackButton>
                <LikeSvgIcon />
            </FeedBackButton>
            <FeedBackButton>
                <DislikeSvgIcon />
            </FeedBackButton>
        </div>
    );
};

const FeedBackButton = ({ children }: { children: ReactNode }): JSX.Element => {
    return <button className="focus:outline-none">{children}</button>;
};

const LikeSvgIcon = (): JSX.Element => {
    return (
        <svg
            fill="none"
            height="40"
            viewBox="0 0 40 40"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d)">
                <circle cx="20" cy="18" fill="white" r="15" />
                <circle cx="20" cy="18" r="15" stroke="#7856FF" />
            </g>
            <path
                clipRule="evenodd"
                d="M29.4258 16.8535C30.4389 15.8272 30.1259 13.7513 28.371 13.7513L23.7536 13.7545C23.929 12.7595 24.183 11.1102 24.1729 10.9545C24.076 9.47971 23.1521 7.6848 23.1121 7.61133C22.9436 7.29202 22.0928 6.8591 21.2365 7.0446C20.1295 7.28573 20.0165 8.00424 20.021 8.20234C20.021 8.20234 20.0687 10.1679 20.0733 10.6924C19.5441 11.8752 17.7192 14.9836 17.1661 15.2231C17.0338 15.1416 16.8837 15.0978 16.7276 15.0978H10.894C10.3985 15.0978 10 15.5056 10 16.0073L10.0008 24.2109C10.0355 24.6531 10.4047 25 10.8409 25H16.0806C16.5453 25 16.923 24.6156 16.923 24.1428V23.8705C16.923 23.8705 17.1177 23.8556 17.2062 23.9135L17.2201 23.9225C17.5545 24.1386 17.9668 24.4051 18.5024 24.4051H26.3217C29.245 24.4051 28.9312 21.7648 28.6642 21.4047C29.1581 20.8575 29.4636 19.8923 29.0466 19.1299C29.3666 18.7847 29.9298 17.836 29.4258 16.8535ZM15.9006 24.1412H10.8393V15.9541H15.9006V24.1412ZM28.0141 16.9857L28.0618 16.7831C29.3312 16.5804 29.5897 14.6124 28.235 14.6109H22.7213C22.9329 13.7513 23.3268 11.0116 23.3268 11.0116C23.2375 9.68161 22.3629 8.01277 22.3629 8.01277C21.3236 7.56739 20.8581 8.17793 20.8581 8.17793C20.8581 8.17793 20.9105 10.2914 20.9105 10.7799C20.9105 11.2685 18.5363 15.1721 17.9563 15.6754C17.6493 15.9408 17.097 16.3087 16.6476 16.592V22.894H17.0081C17.1989 22.894 17.4106 23.0329 17.6385 23.1823C17.9043 23.3565 18.1921 23.5453 18.4944 23.5453L26.4476 23.5421C28.0456 23.5421 28.301 21.7105 27.2462 21.5343L27.2939 21.3324C28.3057 21.2213 28.9218 19.5947 27.6302 19.2604L27.6779 19.0577C28.6442 18.9553 29.3612 17.3755 28.0141 16.9857Z"
                fill="#7856FF"
                fillRule="evenodd"
            />
            <defs>
                <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="39"
                    id="filter0_d"
                    width="39"
                    x="0.5"
                    y="0.5"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199629 0"
                    />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        mode="normal"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

const DislikeSvgIcon = (): JSX.Element => {
    return (
        <svg
            fill="none"
            height="40"
            viewBox="0 0 40 40"
            width="40"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d)">
                <circle cx="20" cy="18" fill="white" r="15" />
                <circle cx="20" cy="18" r="15" stroke="#7856FF" />
            </g>
            <path
                clipRule="evenodd"
                d="M10.5742 19.2288C9.56107 20.2655 9.87411 22.3624 11.629 22.3624L16.2464 22.3592C16.071 23.3642 15.817 25.0301 15.8271 25.1874C15.924 26.6771 16.8479 28.4902 16.8879 28.5644C17.0564 28.8869 17.9072 29.3242 18.7635 29.1368C19.8705 28.8933 19.9835 28.1675 19.979 27.9674C19.979 27.9674 19.9313 25.982 19.9267 25.4522C20.4559 24.2574 22.2808 21.1177 22.8339 20.8757C22.9662 20.958 23.1163 21.0023 23.2724 21.0023H29.106C29.6015 21.0023 30 20.5904 30 20.0836L29.9992 11.7971C29.9645 11.3504 29.5953 11.0001 29.1591 11.0001H23.9194C23.4547 11.0001 23.077 11.3883 23.077 11.8659V12.141C23.077 12.141 22.8823 12.156 22.7938 12.0975L22.7799 12.0884C22.4455 11.8701 22.0332 11.601 21.4976 11.601H13.6783C10.755 11.601 11.0688 14.268 11.3358 14.6317C10.8419 15.1844 10.5364 16.1593 10.9534 16.9295C10.6334 17.2781 10.0702 18.2365 10.5742 19.2288ZM24.0994 11.8675H29.1607V20.1374H24.0994V11.8675ZM11.9859 19.0953L11.9382 19.3C10.6688 19.5047 10.4103 21.4926 11.765 21.4942H17.2787C17.0671 22.3624 16.6732 25.1298 16.6732 25.1298C16.7625 26.4732 17.6371 28.1589 17.6371 28.1589C18.6764 28.6088 19.1419 27.9921 19.1419 27.9921C19.1419 27.9921 19.0895 25.8573 19.0895 25.3638C19.0895 24.8703 21.4637 20.9273 22.0437 20.4188C22.3507 20.1507 22.903 19.7792 23.3524 19.4929V13.1273H22.9919C22.8011 13.1273 22.5894 12.9871 22.3615 12.8361C22.0957 12.6601 21.8079 12.4695 21.5056 12.4695L13.5524 12.4727C11.9544 12.4727 11.699 14.3228 12.7538 14.5008L12.7061 14.7047C11.6943 14.817 11.0782 16.46 12.3698 16.7976L12.3221 17.0024C11.3558 17.1059 10.6388 18.7016 11.9859 19.0953Z"
                fill="#7856FF"
                fillRule="evenodd"
            />
            <defs>
                <filter
                    colorInterpolationFilters="sRGB"
                    filterUnits="userSpaceOnUse"
                    height="39"
                    id="filter0_d"
                    width="39"
                    x="0.5"
                    y="0.5"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.199629 0"
                    />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
                    <feBlend
                        in="SourceGraphic"
                        in2="effect1_dropShadow"
                        mode="normal"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default FeedBack;
