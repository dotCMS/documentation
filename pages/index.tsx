import React from 'react';
import { GetStaticPropsResult } from 'next';
import classNames from 'classnames';
import Head from 'next/head';

// Components
import { Footer } from '@components/Footer';

// Graphql
import { NAVIGATION_MENU_QUERY } from '@graphql/queries';

// Models
import { Documentation } from '@models/Documentation.model';

// Utils
import { client } from '@utils/graphql-client';

export default function Home(): JSX.Element {
    const sectionClasses = [
        'flex flex-wrap',
        'justify-start',
        'md:justify-between',
        'items-center',
        'my-10',
        '-mx-4'
    ];
    const divElementClasses = ['w-80', 'mb-4', 'mx-4'];
    const titleElementClasses = ['text-purple', 'mt-5', 'mb-2'];
    const imageContainerClasses = ['bg-purple', 'rounded', 'pl-4'];
    return (
        <div className="overflow-auto flex flex-col">
            <Head>
                <title>Documentation</title>
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <main className="container mx-auto px-16 flex-grow">
                <h1>dotCMS Documentation</h1>
                <p>
                    Welcome to the dotCMS documentation site. This site contains the documentation
                    for the latest dotCMS release; if you would like documentation on a previous
                    dotCMS release, please see the links in the What&apos;s New section below, or
                    see the Older Versions documentation.
                </p>
                <div className="bg-blue-100 border-blue-200 border px-4 py-3 rounded my-10">
                    <span className="font-bold text-sm">
                        What’s New: dotCMS 21.4.2.1 was released on April 5 to learn more please
                        checkout the &nbsp;
                        <a className="text-purple" href="#">
                            release notes
                        </a>
                        .
                    </span>
                </div>
                <div className={classNames(sectionClasses)}>
                    <div className={classNames(divElementClasses)}>
                        <SvgQuickIcon />
                        <h4 className={classNames(titleElementClasses)}>
                            <a className="no-underline" href="#">
                                Quick Start
                            </a>
                        </h4>
                        <p className="text-sm leading-5">
                            Welcome to the dotCMS documentation site. This site contains the
                            documentation for the latest dotCMS release
                        </p>
                    </div>
                    <div className={classNames(divElementClasses)}>
                        <SvgModelIcon />
                        <h4 className={classNames(titleElementClasses)}>
                            <a className="no-underline" href="#">
                                Data Model
                            </a>
                        </h4>
                        <p className="text-sm leading-5">
                            Welcome to the dotCMS documentation site. This site contains the
                            documentation for the latest dotCMS release
                        </p>
                    </div>
                    <div className={classNames(divElementClasses)}>
                        <SvgApiIcon />
                        <h4 className={classNames(titleElementClasses)}>
                            <a className="no-underline" href="#">
                                APIs
                            </a>
                        </h4>
                        <p className="text-sm leading-5">
                            Welcome to the dotCMS documentation site. This site contains the
                            documentation for the latest dotCMS release
                        </p>
                    </div>
                </div>
                <hr />
                <h4>Workflows</h4>
                <div className={classNames(sectionClasses)}>
                    <div className={classNames(divElementClasses)}>
                        <div className={classNames(imageContainerClasses)}>
                            <img className="rounded" src="/img/schemas.png" title="Schema" />
                        </div>
                        <h4 className={classNames(titleElementClasses)}>
                            <a className="no-underline" href="#">
                                Schema
                            </a>
                        </h4>
                        <p className="text-sm">
                            Welcome to the dotCMS documentation site. This site contains the
                            documentation for the latest dotCMS release
                        </p>
                    </div>
                    <div className={classNames(divElementClasses)}>
                        <div className={classNames(imageContainerClasses)}>
                            <img className="rounded" src="/img/steps.png" title="steps" />
                        </div>
                        <h4 className={classNames(titleElementClasses)}>
                            <a className="no-underline" href="#">
                                Steps
                            </a>
                        </h4>
                        <p className="text-sm">
                            Welcome to the dotCMS documentation site. This site contains the
                            documentation for the latest dotCMS release
                        </p>
                    </div>
                    <div className={classNames(divElementClasses)}>
                        <div className={classNames(imageContainerClasses)}>
                            <img className="rounded" src="/img/actions.png" title="actions" />
                        </div>
                        <h4 className={classNames(titleElementClasses)}>
                            <a className="no-underline" href="#">
                                Actions
                            </a>
                        </h4>
                        <p className="text-sm">
                            Welcome to the dotCMS documentation site. This site contains the
                            documentation for the latest dotCMS release
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

const SvgQuickIcon = (): JSX.Element => {
    return (
        <svg
            fill="none"
            height="33"
            viewBox="0 0 47 33"
            width="47"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M42.6869 28.1707H44.2683V33H4.82927V30.0821H6.41066V31.3563H42.6869V28.1707ZM6.41066 7.71203H4.82927V0H44.2683V17.7073H42.6869V6.40038H6.41066V7.71203ZM6.43902 4.82927H42.6585V1.60976H6.43902V4.82927ZM26.2466 25.1037C26.1945 25.1568 26.132 25.1985 26.063 25.2262L22.5366 26.561L23.8712 23.0342C23.8959 22.9665 23.9333 22.9042 23.9814 22.8506L36.2259 10.6049L37.5238 9.31915C37.8195 9.01599 38.2268 8.84774 38.6503 8.85382C39.0732 8.85058 39.4794 9.0184 39.7767 9.31915C40.0758 9.61777 40.2439 10.0231 40.2439 10.4457C40.2439 10.8684 40.0758 11.2737 39.7767 11.5723L38.8584 12.4908L26.2466 25.1037ZM37.0244 11.2275L37.87 12.0732L38.4565 11.473C38.5748 11.3649 38.6396 11.2103 38.6338 11.0502C38.6266 10.7293 38.3682 10.4709 38.0473 10.4636C37.8901 10.4593 37.7378 10.5183 37.6245 10.6273L37.0244 11.2275ZM24.9512 23.4278L25.6718 24.1463L37.0244 12.8388L36.292 12.0732L24.9512 23.4278ZM24.3677 24.7259L24.7299 24.5971L24.5045 24.3717L24.3677 24.7259ZM19.3171 28.9756H0V9.65854H19.2932L19.3171 28.9756ZM17.6956 11.2683H1.60976V27.3659H17.7073L17.6956 11.2683ZM10.4634 22.2958L10.5762 22.5366H12.0732L11.2324 20.9268L10.4634 22.2958ZM13.2803 16.1499C13.133 16.15 13.0005 16.2391 12.9449 16.3754C12.8894 16.5118 12.9219 16.6682 13.0271 16.7711C13.1324 16.874 13.2895 16.903 13.4245 16.8444C13.5596 16.7858 13.6457 16.6513 13.6425 16.5041C13.6469 16.4038 13.6097 16.3062 13.5395 16.2345C13.4693 16.1628 13.3725 16.1234 13.2722 16.1258L13.2803 16.1499ZM6.43902 21.7317H9.65854L8.04266 19.3171L6.43902 21.7317ZM16.9024 24.9512H3.21951V12.878H16.9024V24.9512ZM15.2925 22.939C15.2925 22.7029 15.106 22.5115 14.8759 22.5115H13.9693L12.3153 19.8832C12.2355 19.762 12.1024 19.6895 11.96 19.6895C11.8175 19.6895 11.6844 19.762 11.6046 19.8832L10.551 21.5054L8.89694 18.7136C8.81824 18.584 8.67812 18.5073 8.52938 18.5124C8.38497 18.5118 8.25052 18.5879 8.17407 18.7136L5.9197 22.4863H5.24584C5.01577 22.4863 4.82927 22.6778 4.82927 22.9139C4.82927 23.15 5.01577 23.3415 5.24584 23.3415H14.8759C14.9886 23.3415 15.0964 23.2947 15.1749 23.2118C15.2534 23.1289 15.2958 23.0169 15.2925 22.9013V22.939ZM14.4876 16.521C14.4961 16.0318 14.2085 15.5859 13.7594 15.3918C13.3104 15.1977 12.7885 15.2938 12.4381 15.6352C12.0876 15.9766 11.9779 16.4957 12.1601 16.9498C12.3424 17.4038 12.7806 17.7029 13.2698 17.7073C13.9326 17.7131 14.4761 17.1836 14.4876 16.521ZM43.3016 24.1463L44.1345 23.2753C44.2201 23.1863 44.2683 23.0653 44.2683 22.939C44.2683 22.8128 44.2201 22.6917 44.1345 22.6027L43.3016 21.7317L42.6585 22.4043L43.1751 22.9335L42.6585 23.4738L43.3016 24.1463ZM38.7874 24.1463L39.439 23.4799L38.9263 22.9445L39.439 22.42L38.8088 21.7317L37.9648 22.5949C37.8781 22.683 37.8293 22.803 37.8293 22.9281C37.8293 23.0532 37.8781 23.1731 37.9648 23.2613L38.7874 24.1463ZM41.8537 21.2451L41.0287 20.9268L40.2439 23.8036L41.0689 24.1463L41.8537 21.2451ZM46.6829 18.5122V26.561H34.6098V18.5122H46.6829ZM45.0732 20.122H36.2195V24.9512H45.0732V20.122Z"
                fill="#2A0753"
                fillRule="evenodd"
            />
        </svg>
    );
};

const SvgModelIcon = (): JSX.Element => {
    return (
        <svg
            fill="none"
            height="39"
            viewBox="0 0 33 39"
            width="33"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M32.9333 10.7812L16.4854 0L0 10.7812L16.4854 21.5745L32.9333 10.7812ZM16.9 2.48936L30.3333 11.196L16.9 19.9149L3.46667 11.196L16.9 2.48936ZM16.9062 26.0265L25.8371 19.9522L26.8667 21.4552L16.9434 28.2128L6.93333 21.418L7.96287 19.9149L16.9062 26.0265ZM29.4667 16.6865L30.9326 15.766L32.0667 17.3348L30.6145 18.2553L29.4667 16.6865ZM26.8667 19.1711L28.3188 18.2553L29.4667 19.8289L28.0145 20.7447L26.8667 19.1711ZM3.46667 18.9862L4.6381 17.4255L6.06667 18.3542L4.89524 19.9149L3.46667 18.9862ZM0.866667 17.3266L2.00071 15.766L3.46667 16.6946L2.31879 18.2553L0.866667 17.3266ZM31.0535 22.4043L32.0667 23.8762L16.9062 34.0213L1.73333 23.8883L2.7465 22.4164L16.9062 31.8682L31.0535 22.4043ZM31.0535 27.383L32.0667 28.8549L16.9062 39L1.73333 28.867L2.7465 27.3951L16.9062 36.8469L31.0535 27.383ZM16.4728 16.5957L8.66667 11.1959L16.4728 5.80851L24.2667 11.1959L16.4728 16.5957Z"
                fill="#2A0753"
                fillRule="evenodd"
            />
        </svg>
    );
};

const SvgApiIcon = (): JSX.Element => {
    return (
        <svg
            fill="none"
            height="39"
            viewBox="0 0 39 39"
            width="39"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                clipRule="evenodd"
                d="M35.9425 20.1626C35.0863 20.1613 34.2724 20.5368 33.7157 21.1903L33.6314 21.2991H33.5111L25.4944 18.7118C25.6333 18.109 25.706 17.4927 25.7111 16.874C25.7077 14.7568 24.878 12.7253 23.4 11.2157L25.2296 9.05157H25.362C25.8764 9.31638 26.4452 9.45712 27.0231 9.46265C28.5724 9.46754 29.9718 8.53391 30.5681 7.09763C31.1644 5.66135 30.8398 4.00568 29.7461 2.90359C28.6523 1.8015 27.005 1.47033 25.5731 2.06471C24.1413 2.65909 23.2074 4.06177 23.2074 5.61792C23.195 6.49454 23.4841 7.34862 24.0259 8.03598L24.1222 8.15689L24.0259 8.27779L22.2926 10.2848C19.3082 8.1474 15.2615 8.31158 12.4584 10.6838L8.60654 6.81486L8.6908 6.68187C9.71432 5.16538 9.66334 3.16273 8.56402 1.70075C7.4647 0.238769 5.56087 -0.358261 3.82869 0.215776C2.09651 0.789813 0.920187 2.40759 0.902872 4.23962C0.879466 5.8284 1.73428 7.29944 3.12307 8.06032C4.51185 8.8212 6.20599 8.74666 7.52321 7.86672L7.65562 7.78209L11.4593 11.6389C9.35027 14.161 8.98316 17.7191 10.5325 20.622L5.29637 24.7932L5.18804 24.7207C4.65268 24.3757 4.03055 24.1912 3.39453 24.1887C2.02539 24.1838 0.78836 25.0084 0.261035 26.2775C-0.26629 27.5467 0.0201144 29.0099 0.986518 29.9841C1.95292 30.9582 3.40869 31.2511 4.67408 30.726C5.93947 30.2008 6.76488 28.9613 6.76488 27.5861C6.7635 27.0319 6.62272 26.4871 6.35563 26.0022L6.28341 25.8571L11.351 21.8432C13.1385 24.1268 16.019 25.2563 18.8741 24.7932L20.7158 30.8384L20.5833 30.9109C18.6722 31.9234 17.8143 34.2095 18.5844 36.2371C19.3546 38.2648 21.5105 39.396 23.6074 38.8727C25.7043 38.3493 27.0823 36.3361 26.8179 34.1822C26.5536 32.0282 24.7301 30.4114 22.5695 30.4152H22.0639L20.2343 24.37C22.3969 23.6367 24.1473 22.0148 25.0491 19.9087L33.1259 22.5928V22.7499C33.1195 22.8667 33.1195 22.9838 33.1259 23.1005C33.121 24.2959 33.8348 25.3761 34.9334 25.8358C36.032 26.2955 37.2981 26.0439 38.1397 25.1986C38.9812 24.3533 39.2317 23.0816 38.774 21.9781C38.3164 20.8747 37.241 20.1577 36.0509 20.1626H35.9425ZM27.3831 3.35621C28.7579 3.35621 29.8723 4.46244 29.8723 5.82704C29.8723 7.19164 28.7579 8.29787 27.3831 8.29787C26.0084 8.29787 24.8939 7.19164 24.8939 5.82704C24.8839 5.16534 25.1417 4.52731 25.6096 4.05589C26.0775 3.58448 26.7164 3.31907 27.3831 3.31915V3.35621ZM5.3933 7.46809C3.79568 7.46786 2.49821 6.17738 2.48941 4.57983C2.48061 2.98228 3.76378 1.67758 5.3613 1.65976C6.95882 1.64193 8.27079 2.91768 8.29764 4.51502C8.30741 5.29273 8.00613 6.04212 7.46075 6.59664C6.91537 7.15117 6.17108 7.46489 5.3933 7.46809ZM3.74655 29.8722C2.90527 29.8773 2.14424 29.3737 1.81994 28.5975C1.49565 27.8212 1.67233 26.9259 2.26721 26.331C2.86209 25.7362 3.75736 25.5595 4.53363 25.8838C5.3099 26.2081 5.81344 26.9691 5.80835 27.8104C5.81517 28.3593 5.60014 28.8877 5.21199 29.2758C4.82383 29.664 4.29543 29.879 3.74655 29.8722ZM22.8072 31.592C23.9839 31.5872 25.0473 32.2857 25.4999 33.3607C25.9525 34.4358 25.7049 35.675 24.8728 36.4985C24.0406 37.3221 22.7886 37.5672 21.7024 37.1193C20.6161 36.6713 19.9104 35.6188 19.9153 34.4542C19.9023 33.6857 20.2008 32.9441 20.7442 32.395C21.2876 31.8458 22.0306 31.535 22.8072 31.5319V31.592ZM17.8404 23.234C14.4033 23.234 11.617 20.4477 11.617 17.0106C11.617 13.5735 14.4033 10.7872 17.8404 10.7872C21.2775 10.7872 24.0638 13.5735 24.0638 17.0106C24.0314 20.4246 21.2546 23.1752 17.8404 23.175V23.234ZM35.6678 24.8936C34.753 24.8864 34.0165 24.1402 34.0213 23.2254C34.0261 22.3105 34.7703 21.5721 35.6852 21.5745C36.6 21.5769 37.3404 22.3192 37.3404 23.234C37.312 24.1331 36.5672 24.843 35.6678 24.8283V24.8936ZM20.7447 16.5957C20.7447 18.4289 19.2586 19.9149 17.4255 19.9149C15.5924 19.9149 14.1064 18.4289 14.1064 16.5957C14.1064 14.7626 15.5924 13.2766 17.4255 13.2766C19.2586 13.2766 20.7447 14.7626 20.7447 16.5957ZM21.5745 34.4362C21.5745 33.7488 22.1317 33.1915 22.8191 33.1915C23.5066 33.1915 24.0638 33.7488 24.0638 34.4362C24.0638 35.1236 23.5066 35.6809 22.8191 35.6809C22.1317 35.6809 21.5745 35.1236 21.5745 34.4362Z"
                fill="#2A0753"
                fillRule="evenodd"
            />
        </svg>
    );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<{ navDot: Documentation }>> {
    try {
        const { DotcmsDocumentationCollection } = await client.request(NAVIGATION_MENU_QUERY);
        return {
            props: {
                navDot: DotcmsDocumentationCollection
            }
        };
    } catch (e) {
        throw new Error(e);
    }
}
